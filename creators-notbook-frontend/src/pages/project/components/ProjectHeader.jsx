import { Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
/**
 * 프로젝트 페이지의 상단 header를 구성하는 컴포넌트
 * [프로젝트 제목], [챕터 이동 링크], [옵션 및 유저정보]의 3가지 구성을 지님
 */
export default function ProjectHeader() {
  const projectData = useSelector((state) => state.project.project);

  
  const [localUrl, setLocalUrl] = useState(null);
  const navigate = useNavigate();

  const routeMatch = useRouteMatch([
    "/project/:uuid",
    "/project/:uuid/character",
  ]);
  const currentTab = routeMatch?.pattern?.path;

  /**
   * 초기 데이터 로드시 URL 경로 생성하기(project UUID에 따라서)
   */
  useEffect(() => {
    if (projectData) {
      setLocalUrl("/project/" + projectData.uuid);
    }
  }, [setLocalUrl, projectData]);

  /**
   * 대시보드로 이동시키기
   */
  const handleDashboardButton = () => {
    navigate("/dashboard");
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
          <Typography variant="h5" noWrap>
            {projectData?.title}
          </Typography>
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
