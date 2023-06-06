import { CancelRounded, CheckCircle, DensitySmall } from "@mui/icons-material";
import { Box, Icon, IconButton, TextField, Typography } from "@mui/material";
import { number, object } from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthority } from "../../../../../../utils/projectUtils";
import { removeEditTag } from "../../../../../../redux-store/slices/characterSlice";

Short.propTypes = {
  data: object,
  characterIndex: number,
};
export default function Short({ data, characterIndex }) {
  /* STATES */
  const [isEditMode, setIsEditMode] = useState(false);
  const [textValue, setTextValue] = useState(data ? data.value : "");

  const projectData = useSelector((state) => state.project.project);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.editMode) {
      setIsEditMode(true);
      dispatch(removeEditTag({ characterIndex, name: data.name }));
    }
  }, [data, characterIndex, setIsEditMode, dispatch]);

  /* FUNCTION */

  /**
   * 영역 더블클릭시 수정모드로 전환
   */
  const handleDoubleClick = () => {
    if (!checkAuthority(projectData, 3)) {
      return false;
    }
    setIsEditMode(!isEditMode);
  };

  const handleEnterKey=(event)=>{
    if(event.key==="Enter"){
      handleEditSave();
    }
  }

  /**
   * 수정저장
   */
  const handleEditSave = () => {
    console.log("저장시도");
    setIsEditMode(false);
  };

  /**
   * 수정 취소
   */
  const handleEditCancel = () => {
    setIsEditMode(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      onDoubleClick={handleDoubleClick}
    >
      <Icon>
        <DensitySmall />
      </Icon>
      <Typography variant="h6">{data.name}</Typography>
      {isEditMode ? (
        <>
          <TextField onChange={(event) => setTextValue(event.target.value)} onKeyDown={handleEnterKey} autoFocus  />
          <Box>
            <IconButton onClick={handleEditSave}>
              <CheckCircle color="primary" fontSize="large" />
            </IconButton>
            <IconButton onClick={handleEditCancel}>
              <CancelRounded color="warning" fontSize="large" />
            </IconButton>
          </Box>
        </>
      ) : (
        <Typography variant="body1">{textValue}</Typography>
      )}
    </Box>
  );
}
