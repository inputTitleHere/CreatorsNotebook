import {
  Add,
  Close,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import {
  Box,
  Button,
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

export default function CharacterTag() {
  const { project } = useSelector((state) => state.project);
  const [isTagModalOpen, setTagModalOpen] = useState(false);
  const [tagName, setTagName] = useState("");
  const [isNewTagMode, setNewTagMode] = useState(false);
  const [color, setColor] = useState("#6bd16b");
  /**
   * 태그 추가버튼 클릭시 태그추가 모달을 연다.
   */
  const handleAddTagOpen = () => setTagModalOpen(true);
  const handleAddTagClose = () => setTagModalOpen(false);

  /* FUNCTIONS */

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
              alignItems: "center",
              justifyContent: "space-around",
              width: "210%",
            }}
            className={"sliding-box " + (isNewTagMode ? "move-left" : "")}
          >
            {/* 기존 태그 선택창 */}
            <Box
              sx={{
                width: "95%",
              }}
            >
              <Button
                startIcon={<KeyboardDoubleArrowRight />}
                variant="outlined"
                onClick={() => setNewTagMode(true)}
              >
                신규 태그 생성
              </Button>
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
              <TextField
                label="10글자 이하 신규 태그명"
                variant="outlined"
                sx={{
                  marginBottom: "10px",
                }}
                value={tagName}
                onChange={(event) => setTagName(event.target.value)}
              />
              <Box className="responsive">
                <HexColorPicker color={color} onChange={setColor} />
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
                    color={color}
                    onChange={setColor}
                    placeholder="Hex색상값"
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
    </>
  );
}
