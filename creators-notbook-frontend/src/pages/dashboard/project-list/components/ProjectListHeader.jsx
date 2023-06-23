import { Button, Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AddCircleOutline } from "@mui/icons-material";
import ProjectSortOption from "./ProjectSortOption";

export default function ProjectListHeader() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        margin: "10px 20px 0px",
      }}
    >
      <Typography variant="h3">프로젝트 목록</Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
        spacing={1}
      >
        <ProjectSortOption />
        <Divider flexItem orientation="vertical" sx={{
          borderColor:"outline.main"
        }}/>
        <Link to={"/dashboard/create-project"}>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutline />}
            sx={{
              textDecoration: "none",
              color: "primary",
              fontSize: "1.2em",
              borderRadius: "10px",
            }}
          >
            <Typography>신규 프로젝트</Typography>
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
}
