import { object } from "prop-types";
import { IMAGE_DIRECTORY } from "../../../../utils/imageUtils";
import ProjectAuthComponent from "./ProjectAuthComponent";
import ProjectOptionButton from "./ProjectOptionButton";
import noImage from "../../../../assets/images/noimage.png";
import { useNavigate } from "react-router";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

/**
 * 프로젝트 페이지에서 개별 프로젝트 카드를 표시
 */
ProjectItemComponent.propTypes = {
  data: object,
};
export default function ProjectItemComponent({ data }) {
  const { projectSortOptions } = useSelector((state) => state.project);
  const navigate = useNavigate();

  /* FUNCTION */
  const handleProjectClick = () => {
    navigate("/project/" + data.uuid, { state: data });
  };

  const getEditDateString = () => {
    const editDate = new Date(data.editDate);
    return `${editDate.getFullYear()}/${
      editDate.getMonth() + 1
    }/${editDate.getDate()}`;
  };

  const getCreateDateString = () => {
    const createDate = new Date(data.createDate);
    return `${createDate.getFullYear()}/${
      createDate.getMonth() + 1
    }/${createDate.getDate()}`;
  };

  return (
    <Grid item xs={6} md={4} lg={3}>
      <Card
        onClick={handleProjectClick}
        sx={{
          maxWidth: "500px",
          cursor: "pointer",
        }}
      >
        {data?.image ? (
          <Box>
            <img
              src={IMAGE_DIRECTORY + data.image}
              alt="프로젝트이미지"
              style={{
                width: "100%",
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "340px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={noImage}
              alt="프로젝트이미지"
              style={{
                width: "100px",
              }}
            />
            <Typography variant="h6">등록된 이미지가 없습니다.</Typography>
          </Box>
        )}
        <CardContent
          sx={{
            padding: "8px",
          }}
        >
          <Typography variant="h5" flexWrap="wrap">
            {data.title}
          </Typography>
        </CardContent>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            padding: "5px",
          }}
        >
          <ProjectAuthComponent authority={data.authority} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {projectSortOptions.sortBy === "createDate" ? (
              <>
                <Typography>생성일 : {getCreateDateString()}</Typography>
                <ProjectOptionButton
                  authority={data.authority}
                  projectUuid={data.uuid}
                />
              </>
            ) : (
              <>
                <Typography>수정일 : {getEditDateString()}</Typography>
                <ProjectOptionButton
                  authority={data.authority}
                  projectUuid={data.uuid}
                />
              </>
            )}
          </Box>
        </Stack>
      </Card>
    </Grid>
  );
}
