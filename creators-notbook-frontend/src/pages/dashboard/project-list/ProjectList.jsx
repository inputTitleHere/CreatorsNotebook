import { useLoaderData } from "react-router-dom";
import ProjectItemComponent from "./components/ProjectItemComponent";
import { Box, Container, Grid, Typography } from "@mui/material";
import ProjectListHeader from "./components/ProjectListHeader";
import { useSelector } from "react-redux";
import { sortWithOptions } from "@src/utils/projectUtils";
import emptyFolder from "@src/assets/icons/empty-folder.png";

export default function ProjectList() {
  const projectData = useLoaderData();
  const { projectSortOptions } = useSelector((state) => state.project);

  return (
    <Box
      sx={{
        minWidth: "600px",
        overflow: "hidden",
      }}
    >
      <ProjectListHeader />
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 137px)",
          overflowY: "scroll",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            padding: "10px 40px 40px",
          }}
        >
          {projectData.length > 0 ? (
            sortWithOptions(projectSortOptions, projectData).map(
              (item, index) => {
                return <ProjectItemComponent data={item} key={index} />;
              }
            )
          ) : (
            <Container
              sx={{
                margin: "20px auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  marginTop: "48px",
                  marginBottom: "24px",
                }}
              >
                <img src={emptyFolder} alt="프로젝트 없음" />
              </Box>
              <Typography variant="h5">
                아직 프로젝트가 없네요! 우상단의 신규 프로젝트 생성을 통해
                새로운 세계를 펼쳐보아요!
              </Typography>
            </Container>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
