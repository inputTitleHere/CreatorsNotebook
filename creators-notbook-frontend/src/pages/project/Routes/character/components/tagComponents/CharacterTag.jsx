import {
  Add,
  Close,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { checkAuthority } from "../../../../../../utils/projectUtils";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./colorPickerStyle.scss";
import { fetchByJson } from "../../../../../../utils/fetch";

export default function CharacterTag() {
  const { project } = useSelector((state) => state.project);
  const [isTagModalOpen, setTagModalOpen] = useState(false);
  const [tagName, setTagName] = useState("");
  const [isNewTagMode, setNewTagMode] = useState(false);
  const [hexColor, setHexColor] = useState("#6bd16b");
  const [textColor, setTextColor] = useState("#111111");
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
    const toSend = {
      tagName,
      hexColor,
      textColor,
    };
    const newTag = await fetchByJson("/tag/create", "POST", toSend);
    console.log(newTag);
    setTagName("");
    setNewTagMode(false);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: "1",
        }}
      >
        일단 태그창 왜 없어요
      </Box>
      {checkAuthority(project, 3) && (
        <Tooltip title="태그 추가">
          <IconButton onClick={handleAddTagOpen}>
            <Add fontSize="large" />
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
              width: "350px",
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
                    margin:"10px 0px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5">태그 추가하기</Typography>
                  <Button
                    startIcon={<KeyboardDoubleArrowRight />}
                    variant="outlined"
                    onClick={() => setNewTagMode(true)}
                  >
                    신규 태그 생성
                  </Button>
                </Box>
                <Divider/>
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
                    onChange={(event) => setTagName(event.target.value)}
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
