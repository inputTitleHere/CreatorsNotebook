import { CancelRounded, CheckCircle } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { object, string } from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthority } from "../../../../../../utils/projectUtils";
import {
  removeEditTag,
  updateCharacterAttr,
} from "../../../../../../redux-store/slices/characterSlice";
import { fetchByJson } from "../../../../../../utils/fetch";
import AttributeHandle from "./AttributeHandle";

Short.propTypes = {
  data: object,
  characterUuid: string,
  provided: object,
};
export default function Short({ data, characterUuid, provided }) {
  /* STATES */
  const [isEditMode, setIsEditMode] = useState(false);
  const [textValue, setTextValue] = useState(data ? data.value : "");

  const projectData = useSelector((state) => state.project.project);
  const character = useSelector((state) => state.character.characterData)[
    characterUuid
  ];
  const dispatch = useDispatch();

  /**
   * 만약 초기생성된 속성이라면 수정옵션을 키고 slice에서 editMode를 제거.
   */
  useEffect(() => {
    if (data.editMode) {
      setIsEditMode(true);
      dispatch(removeEditTag({ characterUuid, name: data.name }));
    }
  }, [data, characterUuid, setIsEditMode, dispatch]);

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
  /**
   * 입력중 엔터키 혹은 Esc에 따라 입력 종료 분기
   */
  const handleKeyboard = (event) => {
    if (event.key === "Enter") {
      handleEditSave();
      return;
    }
    if (event.key === "Escape") {
      event.stopPropagation();
      handleEditCancel();
      return;
    }
  };

  /**
   * 수정 데이터를 저장한다.
   * 동시에 서버로 전송한다.
   */
  const handleEditSave = async () => {
    console.log("저장시도");
    console.log({ characterUuid, name: data.name, value: textValue });
    dispatch(
      updateCharacterAttr({ characterUuid, name: data.name, value: textValue })
    );
    const dataToSend = {
      characterUuid: character.uuid,
      name: data.name,
      data: { ...data, value: textValue },
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
    <div ref={provided.innerRef} {...provided.draggableProps}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        onDoubleClick={handleDoubleClick}
      >
        {checkAuthority(projectData, 3) ? (
          <div {...provided.dragHandleProps}>
            <AttributeHandle
              characterUuid={character.uuid}
              name={data.name}
              type={data.type}
              value={data.value}
            />
          </div>
        ) : (
          ""
        )}
        <Typography variant="h6" marginRight="5px">
          {data.name} :{" "}
        </Typography>
        {isEditMode ? (
          <>
            <TextField
              onChange={(event) => setTextValue(event.target.value)}
              onKeyDown={handleKeyboard}
              autoFocus
              autoComplete="off"
              defaultValue={textValue}
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
    </div>
  );
}
