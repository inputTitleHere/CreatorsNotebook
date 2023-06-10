import { Box, Typography } from "@mui/material";
import { number, string } from "prop-types";
import { IMAGE_DIRECTORY } from "../../../../../../utils/imageUtils";
import noImage from "../../../../../../assets/images/noimage.png"

ItemImage.propTypes = {
  name: string,
  value: string | number,
  key: number | string,
};
export default function ItemImage({ name, value, key }) {
  return (
    <Box
      key={key}
      sx={{
        width:"100%",
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
      {value? <img src={IMAGE_DIRECTORY+"\\"+value} alt={name} /> : <img src={noImage} alt="" />  }
    </Box>
  );
}
