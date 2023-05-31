import { Box, Button, Grid, Paper } from "@mui/material";
import { string } from "prop-types";
import { IMAGE_DIRECTORY } from "../../../../../utils/imageUtils";
import { checkAuthority } from "../../../../../utils/projectUtils";
import noImage from "../../../../../assets/images/noimage.png";
import { Photo } from "@mui/icons-material";

ProjectImage.propTypes = {
  projectData: string,
};

export default function ProjectImage({ projectData }) {
  return (
    <Grid item container md={6} spacing={3} flexDirection="column">
      <Grid item>
        <Paper
          elevation={5}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "15px",
            width: "100%",
            height: "fit-content",
          }}
        >
          {projectData?.image === "no_img" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "600px",
              }}
            >
              <img
                src={noImage}
                alt="noimage"
                className="image_nonexist"
                style={{ width: "100px" }}
              />
              <h3>등록된 이미지가 없습니다</h3>
            </Box>
          ) : (
            <img
              src={IMAGE_DIRECTORY + projectData?.image}
              alt="프로젝트 대표 이미지"
              width="100%"
            />
          )}
        </Paper>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checkAuthority(projectData, 3) && (
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Photo/>}
            sx={{
              fontSize: "1.2rem",
            }}
          >
            이미지 변경하기
          </Button>
        )}
        <form
          style={{
            display: "none",
          }}
        >
          <input type="file" name="image" id="image" />
        </form>
      </Grid>
    </Grid>
  );
}
