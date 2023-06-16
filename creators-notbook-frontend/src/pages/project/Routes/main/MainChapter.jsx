import { Box, Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import ProjectTitle from "./components/ProjectTitle";
import ProjectDescription from "./components/ProjectDescription";
import ProjectImage from "./components/ProjectImage";

export default function MainChapter() {
  /* STATES */
  const projectData = useSelector((state) => state.project.project);
  return (
    <Box
      sx={{
        overflowY: "scroll",
        height: "calc(100vh - 3.5rem)",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          padding: "30px 0px",
        }}
      >
        <Grid container spacing={2} columns={{ md: 1 }}>
          <ProjectImage projectData={projectData} />
          <Grid
            item
            container
            md={6}
            direction="column"
            spacing={3}
            zeroMinWidth
          >
            <ProjectTitle projectData={projectData ?? {}} />
            <ProjectDescription projectData={projectData} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
