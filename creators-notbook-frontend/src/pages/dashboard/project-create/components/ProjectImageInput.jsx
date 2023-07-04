import { useRef, useState } from "react";
import ProjectCropModal from "./ProjectCropModal";
import {
  Box,
  Button,
  Divider,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { IMAGE_LIMIT } from "@src/utils/imageUtils";

/**
 * 프로젝트 생성시 대표 이미지 설정에 관한 처리를 수행하는 컴포넌트
 */
export default function ProjectImageInput() {
  const [imageCropModalState, setImageCropModalState] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  /* FUNCTIONS */
  const handleUploadButton = () => {
    imageInputRef.current.click();
  };

  /**
   * 사진을 브라우저에 업로드하는 경우 이미지 Crop modal을 연다.
   */
  const handleFileInput = (event) => {
    setImagePreview(null);
    const reader = new FileReader();
    if (event.target.files[0]) {
      if (event.target.files[0].size > 1024 * 1024 * IMAGE_LIMIT) {
        alert(`이미지 크기는 ${IMAGE_LIMIT}MB 이하만 가능합니다!`);
        event.target.value = "";
        return;
      }
      if (!/\.(png|jpe?g)$/i.test(event.target.files[0].name)) {
        alert("이미지 형식(png, jpg, jpeg)만 가능합니다!");
        event.target.value = "";
        return;
      }
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          setImage(reader.result);
          setImageDimensions({ height: img.height, width: img.width });
          setImageCropModalState(true);
        };
      };
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          marginBottom: "12px",
        }}
      >
        <InputLabel>
          <Typography variant="h3">프로젝트 이미지</Typography>
        </InputLabel>
        <Button variant="outlined" onClick={handleUploadButton}>
          <Typography variant="h5">신규 이미지 업로드</Typography>
        </Button>
      </Stack>
      <Divider />
      <input
        type="file"
        name="file"
        id="image-input"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileInput}
        ref={imageInputRef}
        style={{ display: "none" }}
      />
      <ProjectCropModal
        modalState={imageCropModalState}
        setModalState={setImageCropModalState}
        imageData={image}
        imageRef={imageInputRef}
        imageDimensions={imageDimensions}
        setImagePreview={setImagePreview}
      />
      {imagePreview && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px 0px",
          }}
        >
          <img
            src={imagePreview}
            alt="프로젝트 이미지 대표"
            style={{
              maxHeight: "90vh",
              borderRadius: "10px",
            }}
          />
        </Box>
      )}
    </Box>
  );
}
