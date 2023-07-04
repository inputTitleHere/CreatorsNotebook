import { Box, Button, Grid, Paper, Tooltip } from "@mui/material";
import { IMAGE_DIRECTORY, IMAGE_LIMIT } from "@src/utils/imageUtils";
import { checkAuthority } from "@src/utils/projectUtils";
import noImage from "@src/assets/images/noimage.png";
import { Photo } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import ProjectCropModal from "@src/pages/dashboard/project-create/components/ProjectCropModal";
import { fetchByForm } from "@src/utils/fetch";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "@src/redux-store/slices/projectSlice";

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

  const [imageDisplayHeight, setImageDisplayHeight] = useState(0);

  const imageInputRef = useRef(null);
  const dispatch = useDispatch();

  /* useEffect */
  /**
   * 이미지 크기 추적용 resize 리스너를 등록
   */
  useEffect(() => {
    window.addEventListener("resize", handleResizeEvent);
    // clean up
    return () => {
      window.removeEventListener("resize", handleResizeEvent);
    };
  }, []);

  /**
   * 신규 이미지가 등록이 되었고 null이 아닐 경우 서버로 전송한다.
   */
  useEffect(() => {
    if (imagePreview !== null) {
      (async () => {
        setImagePreview(null);
        const formData = new FormData(formRef.current);
        console.log("Project code = " + projectData.uuid);
        console.log("Project image = " + projectData.image);
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

  /* FUNCTION */
  const handleResizeEvent = () => {
    setImageDisplayHeight(imageRef.current.offsetHeight);
  };

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
    <Grid
      item
      container
      md={6}
      spacing={3}
      flexDirection="column"
      className="왜않ㅇ되요"
      sx={{
        position: "relative",
      }}
    >
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
            height: imageDisplayHeight,
          }}
        >
          {projectData?.image ? (
            <img
              src={IMAGE_DIRECTORY + projectData.image}
              alt="프로젝트 대표 이미지"
              style={{
                width: "100%",
              }}
              ref={imageRef}
              onLoad={()=>{
                setImageDisplayHeight(imageRef.current.offsetHeight)
              }}
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checkAuthority(projectData, 2) && (
          <Tooltip title="이미지 변경하기">
            <Button
              variant="contained"
              fullWidth
              onClick={handleUploadButton}
              sx={{
                borderRadius: "50px",
                position: "absolute",
                width: "1.2em",
                zIndex: "10",
                top: "50px",
                right: "10px",
              }}
            >
              <Photo />
            </Button>
          </Tooltip>
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
      </Box>
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
