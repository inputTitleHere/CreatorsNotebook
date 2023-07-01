/**
 * 캐릭터 모달의 각기 새부 속성에 대한 css적인 wrapper를 적용해준다.
 */
import { Box } from "@mui/material";
import { object } from "prop-types";

AttributeWrapper.propTypes = {
  children: object,
};
export default function AttributeWrapper({ children }) {
  return (
    <Box
      sx={{
        margin: "5px",
        border: "1px solid",
        borderColor: "secondary.main",
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      {children}
    </Box>
  );
}
