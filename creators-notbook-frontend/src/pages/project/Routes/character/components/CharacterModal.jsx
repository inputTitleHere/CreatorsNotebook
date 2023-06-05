import { Box, Button, IconButton, Modal, Paper } from "@mui/material";
import { number, object } from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthority } from "../../../../../utils/projectUtils";
import { Delete } from "@mui/icons-material";

CharacterModal.propTypes = {
  characterIndex: number, // slice의 characters상 순서.
  handleFunctions: object,
};
export default function CharacterModal({ characterIndex, handleFunctions }) {
  /* STATES */
  const [characterState, setCharacterState] = useState({});
  /* HOOKS */
  const characters = useSelector((state) => state.character.characters);
  const projectData = useSelector((state) => state.project.project);
  const dispatch = useDispatch();
  const { handleModalClose, deleteCharacter } = handleFunctions;

  /* useEffects */
  useEffect(() => {
    if (characterIndex !== undefined) {
      console.log(characters[characterIndex]);
      setCharacterState(characters[characterIndex]);
    }
  }, [characterIndex, setCharacterState, characters]);

  /* FUNCTIONS */
  const handleDeleteCharacter = () => {
    if (confirm("삭제하시겠습니까? 삭제된 캐릭터는 복구가 불가능합니다.")) {
      deleteCharacter(characterState.uuid, characterIndex);
    }
  };

  return (
    <Modal open={true} onClose={handleModalClose}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflowY: "scroll",
          height: "95vh",
          minWidth: "600px",
          width: "60vw",
          outline: "none",
        }}
      >
        {checkAuthority(projectData, 2) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Delete />}
              color="warning"
              onClick={handleDeleteCharacter}
            >
              캐릭터 삭제
            </Button>
          </Box>
        )}
        <Box
          sx={{
            border: "2px dashed",
            borderColor: "primary.main",
            margin:"10px 20px"
          }}
        >
          얍
        </Box>
        {/* 신규 데이터 컬럼 생성하기 */}
      </Paper>
    </Modal>
  );
}
