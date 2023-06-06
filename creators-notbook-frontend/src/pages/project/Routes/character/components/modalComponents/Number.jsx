import { Box } from "@mui/material";
import { object } from "prop-types";


Number.propTypes={
  data:object
}
export default function Number({data}){
  return(
    <Box>
      일단 숫자
    </Box>
  )
}