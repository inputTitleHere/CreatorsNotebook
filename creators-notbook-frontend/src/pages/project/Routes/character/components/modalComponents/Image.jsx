import { CancelRounded } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { object, string } from "prop-types";
import { checkAuthority } from "../../../../../../utils/projectUtils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  removeEditTag,
  updateCharacterAttr,
} from "../../../../../../redux-store/slices/characterSlice";
import { fetchByForm } from "../../../../../../utils/fetch";
import {
  IMAGE_DIRECTORY,
  IMAGE_LIMIT,
  centerImageToScreenOnClick,
} from "../../../../../../utils/imageUtils";
import noimage from "../../../../../../assets/images/noimage.png";
import AttributeHandle from "./AttributeHandle";
import AttributeWrapper from "./AttributeWrapper";

Image.propTypes = {
  data: object,
  characterUuid: string,
  provided: object,
};
export default function Image({ data, characterUuid, provided }) {
  /* STATES */
  const [isEditMode, setIsEditMode] = useState(false);
  const [imageState, setImageState] = useState(null);
  const imageInputRef = useRef(null);
  const projectData = useSelector((state) => state.project.project);
  const character = useSelector((state) => state.character.characterData)[
    characterUuid
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.editMode) {
      setIsEditMode(true);
      imageInputRef.current.click();
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
    if (!isEditMode) {
      imageInputRef.current.focus();
      imageInputRef.current.click();
    }
    setIsEditMode(!isEditMode);
  };

  /**
   * 이미지 변경시 로컬에 반영함과 동시에 서버에 전송한다.
   */
  const handleImageChange = async () => {
    if (imageInputRef.current.files[0].size > 1024 * 1024 * IMAGE_LIMIT) {
      alert(`이미지는 ${IMAGE_LIMIT}MB이하이여야 합니다!`);
      imageInputRef.current.value = "";
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(imageInputRef.current.files[0]);
    reader.onload = () => {
      setImageState(reader.result);
      imageInputRef.current.value = "";
    };
    const result = await sendImageToServer();
    handleEditClose();
    console.log(result);
    if (!result.data) {
      alert("서버에 이미지 저장 실패");
      return;
    } else {
      dispatch(
        updateCharacterAttr({
          characterUuid,
          name: data.name,
          value: result.data,
        })
      );
    }
  };

  /**
   * 신규 이미지를 서버에 전송한다.
   * @returns 신규 이미지 이름
   */
  const sendImageToServer = async () => {
    const prevData = character.data[data.name];

    const formData = new FormData();
    formData.append("previousData", JSON.stringify(prevData));
    formData.append("characterUuid", character.uuid);
    formData.append("image", imageInputRef.current.files[0]);
    return await fetchByForm("/character/saveImage", "POST", formData);
  };

  /**
   * 수정모드 해제
   */
  const handleEditClose = () => {
    setIsEditMode(false);
  };

  return (
    <div ref={provided.innerRef} {...provided.draggableProps}>
      <AttributeWrapper>
        <Box
          sx={{
            display: "flex",
          }}
          onDoubleClick={handleDoubleClick}
        >
          <Box>
            {checkAuthority(projectData, 3) ? (
              <div {...provided.dragHandleProps}>
                <AttributeHandle
                  characterUuid={characterUuid}
                  name={data.name}
                  type={data.type}
                  value={data.value}
                />
              </div>
            ) : (
              ""
            )}
          </Box>
          <Box display="flex" flexDirection="column" flexGrow="1">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">{data.name}</Typography>
              <Box display="none">
                <input
                  type="file"
                  name="image"
                  autoFocus
                  onChange={handleImageChange}
                  ref={imageInputRef}
                />
              </Box>
              {isEditMode && (
                <Box display="inline">
                  <IconButton
                    onClick={handleEditClose}
                    sx={{ minHeight: 0, minWidth: 0, padding: 0 }}
                  >
                    <CancelRounded color="warning" fontSize="large" />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Divider />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop="10px"
            >
              {imageState ? (
                <img
                  src={imageState}
                  alt="신규 이미지"
                  style={{
                    maxWidth: "97%",
                    maxHeight: "90vh",
                    borderRadius: "15px",
                  }}
                  onClick={centerImageToScreenOnClick}
                />
              ) : data?.value ? (
                <img
                  src={IMAGE_DIRECTORY + "\\" + data.value}
                  alt="사용자 이미지"
                  style={{
                    maxWidth: "97%",
                    maxHeight: "90vh",
                    borderRadius: "15px",
                  }}
                  onClick={centerImageToScreenOnClick}
                />
              ) : (
                <img
                  src={noimage}
                  alt="이미지 없음"
                  style={{
                    width: "100px",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </AttributeWrapper>
    </div>
  );
}
