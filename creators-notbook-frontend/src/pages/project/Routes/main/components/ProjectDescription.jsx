import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { object } from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchByJson } from "@src/utils/fetch";
import { updateProject } from "@src/redux-store/slices/projectSlice";
import { checkAuthority } from "@src/utils/projectUtils";
import { CancelRounded, CheckCircle, Create } from "@mui/icons-material";

ProjectDescription.propTypes = {
  projectData: object,
};

export default function ProjectDescription({ projectData }) {
  const [descriptionInput, setDescriptionInput] = useState(undefined);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  /**
   * 초기 로딩 및 state 세팅
   */
  useEffect(() => {
    setDescriptionInput(projectData?.description);
  }, [projectData, setDescriptionInput]);

  /**
   * 프로젝트 제목 변경 토글
   */
  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  /**
   * 프로젝트 제목변경 처리
   */
  const handleProjectDescriptionChange = (event) => {
    setDescriptionInput(event.target.value);
  };
  /**
   * 프로젝트 제목 변경 서버 전송
   */
  const handleProjectDescriptionSubmit = async () => {
    const option = {
      uuid: projectData.uuid,
      authority: projectData.authority,
      description: descriptionInput,
    };
    const result = await fetchByJson(
      "/project/changeDescription",
      "PUT",
      option
    );
    console.log(result);
    if (result.data) {
      const newProjectData = { ...projectData, description: descriptionInput };
      dispatch(updateProject(newProjectData));
    } else {
      alert("설명 변경에 실패했습니다.");
    }
    handleEditMode();
  };

  return (
    <Grid item xs>
      <Paper
        elevation={5}
        sx={{
          padding: "15px",
          borderRadius: "15px",
          minHeight: "85%",
          display:"flex",
          flexDirection:"column"
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">설명</Typography>
            {checkAuthority(projectData, 2) &&
              (editMode ? (
                <Box>
                  <IconButton onClick={handleProjectDescriptionSubmit}>
                    <CheckCircle color="primary" fontSize="large" />
                  </IconButton>
                  <IconButton onClick={handleEditMode}>
                    <CancelRounded color="warning" fontSize="large" />
                  </IconButton>
                </Box>
              ) : (
                <IconButton onClick={handleEditMode}>
                  <Create fontSize="large" />
                </IconButton>
              ))}
          </Box>
          <Divider />
        </Box>
        <Box flexGrow="1">
          {editMode ? (
            <TextField
              variant="standard"
              onChange={handleProjectDescriptionChange}
              value={descriptionInput}
              multiline
              minRows={19}
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-line",
              }}
            >
              {projectData?.description}
            </Typography>
          )}
        </Box>
      </Paper>
    </Grid>
  );
}
