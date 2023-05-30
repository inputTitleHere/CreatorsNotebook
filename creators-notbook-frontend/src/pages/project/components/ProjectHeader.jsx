import {
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import {
  Dashboard,
  Create,
  CheckCircle,
  CancelRounded,
} from "@mui/icons-material";
import { fetchByJson } from "../../../utils/fetch";
import { updateProject } from "../../../redux-store/slices/projectSlice";
/**
 * 프로젝트 페이지의 상단 header를 구성하는 컴포넌트
 * [프로젝트 제목], [챕터 이동 링크], [옵션 및 유저정보]의 3가지 구성을 지님
 */
export default function ProjectHeader() {
  const TITLE_LIMIT = useRef(30);
  const projectData = useSelector((state) => state.project.project);
  const [projectTitleEditMode, setProjectTitleEditMode] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [localUrl, setLocalUrl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routeMatch = useRouteMatch([
    "/project/:uuid",
    "/project/:uuid/character",
  ]);
  const currentTab = routeMatch?.pattern?.path;

  /**
   * 초기 데이터 로드시 내부 상태값 업데이트
   */
  useEffect(() => {
    if (projectData) {
      setLocalUrl("/project/" + projectData.uuid);
      setTitleInput(projectData.title);
      console.log(projectData);
    }
  }, [setLocalUrl, projectData, setTitleInput]);

  /**
   * 대시보드로 이동시키기
   */
  const handleDashboardButton = () => {
    navigate("/dashboard");
  };
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
  const handleProjectTitleChangeSubmit = async (event) => {
    event.preventDefault();
    const newProjectTitle = event.target.projectTitle.value;
    const option ={
      projectUuid:projectData.uuid,
      projectTitle:newProjectTitle,
    };
    const result = await fetchByJson("/project/changeTitle","PUT",option);
    console.log(result);
    if(result.data){
      const newProjectData = {...projectData,title:newProjectTitle}
      dispatch(updateProject(newProjectData));
    }else{
      alert("제목 변경에 실패했습니다.");
    }
    handleEditProjectTitle();
  };

  return (
    <header id="project-header">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        sx={{
          borderBottom: "1px solid var(--outline-color)",
        }}
      >
        <Grid
          item
          xs
          zeroMinWidth
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <IconButton
            onClick={handleDashboardButton}
            sx={{ marginLeft: "5px" }}
          >
            <Dashboard fontSize="large" />
          </IconButton>
          {projectTitleEditMode ? (
            <>
              <form
                style={{ display: "flex", width: "100%" }}
                onSubmit={handleProjectTitleChangeSubmit}
              >
                <TextField
                  id="projectTitle"
                  value={titleInput}
                  variant="standard"
                  fullWidth
                  sx={{
                    fontFamily: "HeaderBold",
                  }}
                  onChange={handleProjectTitleChange}
                />
                <IconButton color="primary" sx={{ p: 0 }} type="submit">
                  <CheckCircle fontSize="large" />
                </IconButton>
                <IconButton
                  color="warning"
                  sx={{ p: 0 }}
                  onClick={handleEditProjectTitle}
                >
                  <CancelRounded fontSize="large" />
                </IconButton>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5" noWrap>
                {projectData?.title}
              </Typography>
              {projectData?.authority === "CREATOR" ||
              projectData?.authority === "ADMIN" ? (
                <IconButton
                  onClick={handleEditProjectTitle}
                  sx={{ marginLeft: "5px" }}
                >
                  <Create fontSize="large" />
                </IconButton>
              ) : (
                ""
              )}
            </>
          )}
        </Grid>
        <Grid item xs={6}>
          <Tabs
            value={currentTab}
            sx={{
              "& a": {
                fontFamily: "HeaderBold",
                fontSize: "1.2em",
                zIndex: 99,
                "&.Mui-selected": {
                  color: "outline.main",
                },
              },
              "& span": {
                height: "100%",
                // borderRadius:"15px 15px 0px 0px"
              },
            }}
          >
            <Tab
              label="메인 챕터"
              value="/project/:uuid"
              to={localUrl}
              LinkComponent={Link}
            />
            <Tab
              label="캐릭터 챕터"
              value="/project/:uuid/character"
              to={localUrl + "/character"}
              LinkComponent={Link}
            />
          </Tabs>
        </Grid>
        <Grid item xs={2} display="flex" alignItems="center">
          put some Avatar ect.
        </Grid>
      </Grid>
    </header>
  );
}

/**
 * Material UI에 있는 코드 사용
 * url패턴 매칭을 확인하는 커스텀 훅
 * @param {string} patterns
 * @returns
 */
function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }
  return null;
}
