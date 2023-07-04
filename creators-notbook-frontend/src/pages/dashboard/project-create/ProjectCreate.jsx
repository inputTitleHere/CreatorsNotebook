import { Box, Button, Divider, Typography } from "@mui/material";
import { fetchByForm } from "@src/utils/fetch";
import ProjectImageInput from "./components/ProjectImageInput";
import ProjectTextInput from "./components/ProjectTextInput";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateProject } from "@src/redux-store/slices/projectSlice";
/**
 * 신규 프로젝트를 생성하는 페이지이다.
 * 프로젝트 제목, 설명, 이미지를 Form으로 올린다.
 * 추가적으로 브릿지 생성을 위해 유저 번호를 같이 전달한다.
 * 프로젝트 생성과 동시에 유저-프로젝트 브릿지에 생성자를 등록한다.
 *
 */
export default function ProjectCreate() {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* FUNCTION */

  /**
   * 프로젝트 등록기능
   * 제목, 설명 존재 확인 및 없을 경우 등록취소
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.target.title.value) {
      alert("프로젝트 제목을 입력하셔야 합니다!");
      titleRef.current.focus();
      return false;
    }
    if (!event.target.description.value) {
      alert("프로젝트 설명을 입력해주세요!");
      descriptionRef.current.focus();
      return false;
    }
    const response = await fetchByForm("/project/new", "POST", event.target);
    console.log("PROJECT CREATE");
    console.log(response);
    dispatch(updateProject(response.projectDto));
    navigate("/project/" + response.projectDto.uuid);
  };

  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 78px)",
        width: "100vw",
        overflowY: "scroll",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          minWidth: "600px",
          width: "70vw",
          paddingBottom: "48px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "48px",
            marginBottom: "24px",
          }}
        >
          <Typography variant="h3">신규 프로젝트 생성하기</Typography>
          <Button
            variant="outlined"
            color="warning"
            sx={{
              fontSize: "1.2em",
            }}
            onClick={() => navigate("..")}
          >
            취소
          </Button>
        </Box>
        <Divider />
        <form
          onSubmit={handleSubmit}
          style={{
            paddingBottom: "48px",
          }}
        >
          <ProjectTextInput refs={{ titleRef, descriptionRef }} />
          <ProjectImageInput />
          <Button
            variant="outlined"
            sx={{
              width: "50%",
              display: "block",
              margin: "50px auto",
              fontSize: "1.2em",
            }}
            type="submit"
          >
            <Typography variant="h4">신규 프로젝트 생성</Typography>
          </Button>
        </form>
      </Box>
    </Box>
  );
}
