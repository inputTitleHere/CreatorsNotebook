import { bool, func, object, string } from "prop-types";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImage";
import { putImageIntoFile } from "../../../../utils/imageUtils";
import {
  Box,
  Button,
  Modal,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Save } from "@mui/icons-material";

ProjectCropModal.propTypes = {
  setModalState: func,
  modalState: bool,
  imageData: string,
  imageRef: object,
  imageDimensions: object,
  setImagePreview: func,
  optionalFunction: func,
};
export default function ProjectCropModal({
  modalState,
  setModalState,
  imageData,
  imageRef,
  imageDimensions,
  setImagePreview,
  optionalFunction,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const theme = useTheme();

  /* FUNCTION */
  /**
   * 취소 버튼 클릭시 이미지 input을 초기화시킨다.
   * 단 모달창 밖을 눌렀을 때에는 닫히지 않게 한다.
   */
  const handleCloseButton = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setModalState(false);
    // imageRef.current.value = "";
  };

  /**
   * 이미지 자르기 버튼 클릭시
   *
   */
  const handleCompleteButton = async () => {
    try {
      const extension = imageData.substring(
        imageData.indexOf(":") + 1,
        imageData.indexOf(";")
      );
      const { blobUrl: croppedImage, blob } = await getCroppedImg(
        imageData,
        croppedAreaPixels,
        extension
      );
      putImageIntoFile(blob, imageRef);
      setImagePreview(croppedImage);
      setModalState(false);
      if (optionalFunction) {
        optionalFunction();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <Modal
      open={modalState}
      onClose={handleCloseButton}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "fit-content",
          padding: "10px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h3">대표 이미지 설정</Typography>
          <Stack spacing={2} direction="row">
            <Button
              startIcon={<Save />}
              onClick={handleCompleteButton}
              variant="outlined"
            >
              <Typography>완료</Typography>
            </Button>
            <Button
              color="warning"
              onClick={handleCloseButton}
              variant="outlined"
            >
              <Typography>취소</Typography>
            </Button>
          </Stack>
        </Stack>
        <Box
          sx={{
            position: "relative",
            height: "calc(100vh / 4 * 3)",
            width: "calc(70vh / 4 * 3)",
            overflow: "hidden",
            marginTop: "10px",
          }}
        >
          <Cropper
            image={imageData}
            crop={crop}
            zoom={zoom}
            aspect={7 / 10}
            minZoom={1}
            maxZoom={5}
            restrictPosition={true}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            objectFit={
              imageDimensions.height / 10 > imageDimensions.width / 7
                ? "horizontal-cover"
                : "vertical-cover"
            }
            showGrid={false}
            style={{
              containerStyle: {
                border: "2px solid",
                borderColor: theme.palette.primary.main,
                borderRadius: "5px",
              },
            }}
          />
        </Box>
      </Paper>
    </Modal>
  );
}
