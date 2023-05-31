import { Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import ProjectTitle from "./components/ProjectTitle";
import ProjectDescription from "./components/ProjectDescription";
import ProjectImage from "./components/ProjectImage";

export default function MainChapter() {
  /* STATES */
  const projectData = useSelector((state) => state.project.project);

  /* HOOKS */

  /* useEffects */

  /* FUNCTIONS */

  return (
    <Container sx={{ minHeight: "100vh", marginTop: "30px" }}>
      <Grid container spacing={2} columns={{ md: 1 }}>
        <ProjectImage projectData={projectData} />
        <Grid item container md={6} direction="column" spacing={3} zeroMinWidth>
          <ProjectTitle projectData={projectData ?? {}} />
          <ProjectDescription projectData={projectData} />
        </Grid>
      </Grid>
    </Container>
  );
}
