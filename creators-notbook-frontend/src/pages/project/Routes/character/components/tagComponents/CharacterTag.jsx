import {
  Close,
  Delete,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  LocalOffer,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { checkAuthority } from "../../../../../../utils/projectUtils";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import "./colorPickerStyle.scss";
import { fetchByJson } from "../../../../../../utils/fetch";
import TagChip from "./TagChip";
import { string } from "prop-types";
import { insertTagToStore } from "../../../../../../redux-store/slices/tagSlice";
import TagListDisplay from "./TagListDisplay";

CharacterTag.propTypes = {
  characterUuid: string,
};
export default function CharacterTag({ characterUuid }) {
  const { project } = useSelector((state) => state.project);
  const { tagMap } = useSelector((state) => state.tag);
  const tagList = useSelector((state) => state.character.characterData)[
    characterUuid
  ]?.tagList;
  const [isTagModalOpen, setTagModalOpen] = useState(false);
  const [isTagDeleteMode, setIsTagDeleteMode] = useState(false);
  const [tagName, setTagName] = useState("");
  const [isNewTagMode, setNewTagMode] = useState(false);
  const [hexColor, setHexColor] = useState("#6bd16b");
  const [textColor, setTextColor] = useState("#111111");
  const characterTagSet = new Set(
    useSelector((state) => state.character.characterData)[
      characterUuid
    ]?.tagList
  );
  const dispatch = useDispatch();

  /* useRef */
  const tagBoxRef = useRef();

  /**
   * 태그 추가버튼 클릭시 태그추가 모달을 연다.
   */
  const handleAddTagOpen = () => setTagModalOpen(true);
  const handleAddTagClose = () => setTagModalOpen(false);

  /* FUNCTIONS */

  /**
   * 선택된 색상을 적용 및 내부 텍스트의 밝기를 연산한다.
   * @param {string} hexColor  '#------'형식의 hex 문자열을 받는다.
   */
  const updateColor = (hexColor) => {
    setHexColor(hexColor);
    if (getBrightness(hexColor) > 120) setTextColor("#111111");
    else setTextColor("#eeeeee");
  };

  /**
   * 선택한 색상에 대한 밝기값을 구한다.
   * @param {string} color HEX 문자열의 색상
   * @returns HEX문자열의 밝기 계산 -> 공식은 CHATGPT에게서 가져옴
   */
  const getBrightness = (color) => {
    // Remove the "#" character from the color string
    color = color.slice(1);

    // Convert HEX to RGB
    const r = parseInt(color.substring(0, 2), 16) / 255;
    const g = parseInt(color.substring(2, 4), 16) / 255;
    const b = parseInt(color.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const brightness = (max + min) / 2;
    return brightness * 255;
  };
  /**
   * 신규 태그를 생성한다.
   */
  const createTag = async () => {
    if (tagName.length === 0) {
      alert("태그 이름을 입력해주세요!");
      return;
    }

    if (Object.keys(tagMap).length >= 30) {
      alert("태그는 최대 30개까지만 만들 수 있습니다!");
      return;
    }
    const toSend = {
      tagName,
      hexColor,
      textColor,
      projectUuid: project.uuid,
    };
    const newTag = await fetchByJson("/tag/create", "POST", toSend);
    dispatch(insertTagToStore({ tagNo: newTag.no, tagData: newTag }));
    console.log(newTag);
    setTagName("");
    setNewTagMode(false);
  };

  /**
   * 태그목록 overflow시 가로스크롤 적용
   */
  const handleTagWheel = (event) => {
    tagBoxRef.current.scrollLeft += event.deltaY;
  };

  /**
   * 
   */
  const handleNewTagNameInput=(event)=>{
    const tagName = event.target.value;
    if(tagName.length>10){
      alert("태그명은 10글자 이하로 해주세요!");
      return;
    }
    setTagName(event.target.value);
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: "1",
          overflow: "hidden",
          width: "99%",
        }}
        onWheel={handleTagWheel}
        ref={tagBoxRef}
      >
        <Stack
          direction="row"
          spacing={0.4}
          sx={{
            marginLeft: "10px",
          }}
        >
          {tagList?.map((tagNo, index) => {
            return <TagListDisplay tagData={tagMap[tagNo]} key={index} />;
          })}
        </Stack>
      </Box>
      {checkAuthority(project, 3) && (
        <Tooltip title="태그 추가">
          <IconButton onClick={handleAddTagOpen}>
            <LocalOffer fontSize="large" />
          </IconButton>
        </Tooltip>
      )}
      {isTagModalOpen ? (
        <Modal
          open={isTagModalOpen}
          onClose={handleAddTagClose}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              padding: "0px 10px 10px 10px",
              width: "450px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                // alignItems: "center",
                justifyContent: "space-around",
                width: "210%",
              }}
              className={"sliding-box " + (isNewTagMode ? "move-left" : "")}
            >
              {/* 기존 태그 선택창 */}
              <Box
                sx={{
                  width: "90%",
                  marginRight: "5%",
                }}
              >
                <Box
                  sx={{
                    margin: "10px 0px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5">태그 추가하기</Typography>
                  <Box>
                    <Button
                      startIcon={<Delete />}
                      color="warning"
                      variant="outlined"
                      onClick={() => setIsTagDeleteMode(!isTagDeleteMode)}
                      sx={{
                        marginRight: "5px",
                      }}
                    >
                      태그 삭제
                    </Button>
                    <Button
                      startIcon={<KeyboardDoubleArrowRight />}
                      variant="outlined"
                      onClick={() => setNewTagMode(true)}
                    >
                      태그 생성
                    </Button>
                    <IconButton
                      onClick={handleAddTagClose}
                      sx={{
                        padding: "0px",
                        paddingLeft: "10px",
                      }}
                    >
                      <Close fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>
                <Divider />
                <Stack
                  spacing={1.6}
                  direction="row"
                  useFlexGap
                  flexWrap="wrap"
                  sx={{
                    marginTop: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {Object.keys(tagMap).map((tagNo, index) => {
                    return (
                      <TagChip
                        key={index}
                        tagNo={tagNo}
                        characterUuid={characterUuid}
                        isTagDeleteMode={isTagDeleteMode}
                        tagSet={characterTagSet}
                      />
                    );
                  })}
                </Stack>
              </Box>
              {/* 신규 태그 생성창 */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "90%",
                }}
              >
                <Box>
                  <IconButton onClick={() => setNewTagMode(false)}>
                    <KeyboardDoubleArrowLeft />
                  </IconButton>
                  <IconButton onClick={handleAddTagClose}>
                    <Close fontSize="large" />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "space-between",
                    margin: "10px",
                  }}
                >
                  <TextField
                    label="10글자 이하 신규 태그명"
                    variant="outlined"
                    sx={{
                      width: "70%",
                    }}
                    value={tagName}
                    onChange={handleNewTagNameInput}
                  />
                  <Button
                    variant="contained"
                    disableRipple
                    disableFocusRipple
                    disableElevation
                    disableTouchRipple
                    sx={{
                      bgcolor: hexColor,
                      "&:hover": {
                        bgcolor: hexColor,
                      },
                    }}
                    onClick={createTag}
                  >
                    <Typography
                      sx={{
                        color: textColor,
                      }}
                    >
                      생성하기
                    </Typography>
                  </Button>
                </Box>
                <Box className="responsive">
                  <HexColorPicker color={hexColor} onChange={updateColor} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        marginRight: "10px",
                      }}
                    >
                      Hex색상값
                    </Typography>
                    <HexColorInput
                      color={hexColor}
                      onChange={setHexColor}
                      placeholder="Hex색상값"
                      prefixed
                      style={{
                        flexGrow: "1",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
