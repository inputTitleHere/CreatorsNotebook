import { Box, Typography } from "@mui/material";
import { string } from "prop-types";
import { IMAGE_DIRECTORY } from "../../../../../../utils/imageUtils";
import noImage from "../../../../../../assets/images/noimage.png";

ItemImage.propTypes = {
  name: string,
  value: string,
};
export default function ItemImage({ name, value }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          borderBottom: "1px solid",
          borderBottomColor: "primary.main",
          width: "100%",
        }}
      >
        {name} :
      </Typography>
      <Box
        sx={{
          width: "100%",
        }}
      >
        {value ? (
          <img
            src={IMAGE_DIRECTORY + "\\" + value}
            alt={name}
            style={{ width: "100%" }}
          />
        ) : (
          <img src={noImage} alt="이미지 없음" style={{ width: "100%" }} />
        )}
      </Box>
    </Box>
  );
}
