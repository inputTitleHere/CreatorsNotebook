import {  Modal, Paper } from "@mui/material";
import { func, number } from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

CharacterModal.propTypes = {
  characterIndex: number,
  handleModalClose: func,
};
export default function CharacterModal({ characterIndex, handleModalClose }) {
  /* HOOKS */
  // const dispatch = useDispatch();
  /* STATES */
  const characterList = useSelector((state) => state.character.characterList);

  /* useEffects */
  useEffect(() => {}, [characterIndex]);

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
        }}
      >
        갸하하 근데 왜 없죠
      </Paper>
    </Modal>
  );
}
