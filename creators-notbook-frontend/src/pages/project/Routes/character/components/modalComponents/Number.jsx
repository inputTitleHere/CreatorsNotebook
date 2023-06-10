import {
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { number, object } from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeEditTag,
  updateChracterAttr,
} from "../../../../../../redux-store/slices/characterSlice";
import { checkAuthority } from "../../../../../../utils/projectUtils";
import { fetchByJson } from "../../../../../../utils/fetch";
import {
  CancelRounded,
  CheckCircle,
} from "@mui/icons-material";
import AttributeHandle from "./AttributeHandle";

NumberComponent.propTypes = {
  data: object,
  characterIndex: number,
};
export default function NumberComponent({ data, characterIndex }) {
  /* STATES */
  const [isEditMode, setIsEditMode] = useState(false);
  const [numberValue, setNumberValue] = useState(data ? data.value : 0);

  const projectData = useSelector((state) => state.project.project);
  const character = useSelector((state) => state.character.characters)[
    characterIndex
  ];
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

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      handleEditSave();
    }
  };

  /**
   * 수정 데이터를 저장한다.
   * 동시에 서버로 전송한다.
   */
  const handleEditSave = async () => {
    console.log("저장시도");
    dispatch(
      updateChracterAttr({
        characterIndex,
        name: data.name,
        value: Number(numberValue),
      })
    );
    const dataToSend = {
      characterUuid: character.uuid,
      name: data.name,
      data: { ...data, value: Number(numberValue) },
    };
    await fetchByJson("/character/updateText", "POST", dataToSend);
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
      {checkAuthority(projectData, 3) ? (
        <AttributeHandle
          characterUuid={character.uuid}
          characterIndex={characterIndex}
          name={data.name}
          type={data.type}
          value={data.value}
        />
      ) : (
        ""
      )}
      <Typography variant="h6">{data.name}</Typography>
      {isEditMode ? (
        <>
          <TextField
            onChange={(event) => setNumberValue(event.target.value)}
            onKeyDown={handleEnterKey}
            autoFocus
            type="number"
            autoComplete="off"
            defaultValue={numberValue}
          />
          <Box>
            <IconButton
              onClick={handleEditSave}
              sx={{ minHeight: 0, minWidth: 0, padding: 0 }}
            >
              <CheckCircle color="primary" fontSize="large" />
            </IconButton>
            <IconButton
              onClick={handleEditCancel}
              sx={{ minHeight: 0, minWidth: 0, padding: 0 }}
            >
              <CancelRounded color="warning" fontSize="large" />
            </IconButton>
          </Box>
        </>
      ) : (
        <Typography variant="body1">{data.value}</Typography>
      )}
    </Box>
  );
}
