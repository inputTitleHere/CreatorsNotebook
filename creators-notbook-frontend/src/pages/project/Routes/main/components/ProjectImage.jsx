import { Box, Button, Grid, Paper } from "@mui/material";
import { IMAGE_DIRECTORY } from "../../../../../utils/imageUtils";
import { checkAuthority } from "../../../../../utils/projectUtils";
import noImage from "../../../../../assets/images/noimage.png";
import { Photo } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import ProjectCropModal from "../../../../DASHBOARD/project-create/components/ProjectCropModal";
import { fetchByForm } from "../../../../../utils/fetch";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../../../../../redux-store/slices/projectSlice";

/**
 * 메인 챕터에서 프로젝트 대표 이미지를 표출하는 컴포넌트
 * 지정된 이미지가 없으면 기본 이미지를, 있으면 해당 이미지를 표시.
 * 권한이 3등급(member)이상이면 이미지 수정 권한을 부여한다.
 */
export default function ProjectImage() {
  const formRef = useRef(null);
  const imageRef = useRef(null);
  const projectData = useSelector((state) => state.project.project);
  const [imageCropModalState, setImageCropModalState] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);
  const dispatch = useDispatch();

  /* FUNCTION */
  const handleUploadButton = () => {
    imageInputRef.current.click();
  };
  /**
   * 신규 이미지가 등록이 되었고 null이 아닐 경우 서버로 전송한다.
   */
  useEffect(() => {
    console.log(projectData);
    if (imagePreview !== null) {
      (async () => {
        setImagePreview(null);
        const formData = new FormData(formRef.current);
        console.log("Project code = " + projectData.uuid); 
        console.log("Project image = " +projectData.image);
        formData.append("image", projectData.image);
        formData.append("uuid", projectData.uuid);
        const result = await fetchByForm(
          "/project/changeImage",
          "PUT",
          formData
        );
        if (result?.data) {
          // imageRef.current.src = imagePreview;
          const newProject = { ...projectData, image: result.data };
          // console.log("image change uuid = "+projectData.uuid);
          dispatch(updateProject(newProject));
        } else {
          alert("이미지 수정 실패");
        }
      })();
    }
  }, [imagePreview, dispatch, projectData]);
  /**
   * 사진을 브라우저에 업로드하는 경우 이미지 Crop modal을 연다.
   */
  const handleFileInput = (event) => {
    setImagePreview(null);
    const reader = new FileReader();
    if (event.target.files[0]) {
      if (event.target.files[0].size > 1024 * 1024 * 5) {
        alert("이미지 크기는 5MB 이하만 가능합니다!");
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
    <Grid item container md={6} spacing={3} flexDirection="column">
      <Grid item>
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "15px",
            width: "100%",
            height: "fit-content",
          }}
        >
          {projectData?.image ? (
            <img
              src={IMAGE_DIRECTORY + projectData.image}
              alt="프로젝트 대표 이미지"
              width="100%"
              ref={imageRef}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "600px",
              }}
            >
              <img
                src={noImage}
                alt="noimage"
                className="image_nonexist"
                style={{ width: "100px" }}
                ref={imageRef}
              />
              <h3>등록된 이미지가 없습니다</h3>
            </Box>
          )}
        </Paper>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checkAuthority(projectData, 3) && (
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Photo />}
            onClick={handleUploadButton}
            sx={{
              fontSize: "1.2rem",
            }}
          >
            이미지 변경하기
          </Button>
        )}
        <form
          ref={formRef}
          style={{
            display: "none",
          }}
        >
          <input
            type="file"
            name="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileInput}
            ref={imageInputRef}
          />
        </form>
      </Grid>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
        }}
      >
        <ProjectCropModal
          modalState={imageCropModalState}
          setModalState={setImageCropModalState}
          imageData={image}
          imageRef={imageInputRef}
          imageDimensions={imageDimensions}
          setImagePreview={setImagePreview}
        />
      </Box>
    </Grid>
  );
}
