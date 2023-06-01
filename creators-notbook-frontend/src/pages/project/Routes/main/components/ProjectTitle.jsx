import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchByJson } from "../../../../../utils/fetch";
import { object } from "prop-types";
import { checkAuthority } from "../../../../../utils/projectUtils";
import { CancelRounded, CheckCircle, Create } from "@mui/icons-material";
import { updateProject } from "../../../../../redux-store/slices/projectSlice";

ProjectTitle.propTypes = {
  projectData: object,
};
export default function ProjectTitle({ projectData }) {
  const TITLE_LIMIT = useRef(30);
  const [titleInput, setTitleInput] = useState(undefined);
  const [projectTitleEditMode, setProjectTitleEditMode] = useState(false);
  const dispatch = useDispatch();

  /**
   * 초기 로딩 및 state 세팅
   */
  useEffect(() => {
    setTitleInput(projectData?.title);
  }, [projectData, setTitleInput]);

  /**
   * 프로젝트 제목 변경 토글
   */
  const handleEditProjectTitle = () => {
    setProjectTitleEditMode(!projectTitleEditMode);
  };
  /**
   * 프로젝트 제목변경 처리
   */
  const handleProjectTitleChange = (event) => {
    const titleStr = event.target.value;
    if (titleStr.length > TITLE_LIMIT.current) {
      alert(`제목은 최대 ${TITLE_LIMIT.current}글자까지만 가능합니다.`);
      setTitleInput(titleInput.substring(0, TITLE_LIMIT.current));
    } else {
      setTitleInput(titleStr);
    }
  };
  /**
   * 프로젝트 제목 변경 서버 전송
   */
  const handleProjectTitleSubmit = async () => {
    const newProjectTitle = titleInput;
    const option = {
      uuid: projectData.uuid,
      authority: projectData.authority,
      title: newProjectTitle,
    };
    const result = await fetchByJson("/project/changeTitle", "PUT", option);
    console.log(result);
    if (result.data) {
      const newProjectData = { ...projectData, title: newProjectTitle };
      dispatch(updateProject(newProjectData));
    } else {
      alert("제목 변경에 실패했습니다.");
    }
    handleEditProjectTitle();
  };

  return (
    <Grid item xs={1}>
      <Paper
        elevation={5}
        sx={{
          padding: "15px",
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">제목</Typography>
          {checkAuthority(projectData, 3) &&
            (projectTitleEditMode ? (
              <Box>
                <IconButton onClick={handleProjectTitleSubmit}>
                  <CheckCircle color="primary" fontSize="large" />
                </IconButton>
                <IconButton onClick={handleEditProjectTitle}>
                  <CancelRounded color="warning" fontSize="large" />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={handleEditProjectTitle}>
                <Create fontSize="large" />
              </IconButton>
            ))}
        </Box>
        <Divider />
        {projectTitleEditMode ? (
          <TextField
            variant="standard"
            onChange={handleProjectTitleChange}
            value={titleInput}
            sx={{
              width: "100%",
              fontSize:"1.2rem"
            }}
          />
        ) : (
          <Typography
            variant="h3"
            sx={{
              display: "block",
              marginTop: "0.3em",
              overflowWrap: "break-word",
              wordWrap: "break-word",
              wordBreak: "break-all",
            }}
          >
            {projectData?.title}
          </Typography>
        )}
      </Paper>
    </Grid>
  );
}
