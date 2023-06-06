import { Box } from "@mui/material";
import { object } from "prop-types";

Image.propTypes = {
  data: object,
};
export default function Image({ data }) {
  return(
    <Box>
      일단 이미지
    </Box>
  )
}
