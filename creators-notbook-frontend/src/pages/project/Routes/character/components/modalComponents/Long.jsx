import { Box } from "@mui/material";
import { object } from "prop-types";

Long.propTypes={
  data:object
}
export default function Long({data}){
  return(
    <Box>
      일단 장문
    </Box>
  )
}