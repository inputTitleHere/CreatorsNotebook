import { Box, Typography } from "@mui/material";
import { string } from "prop-types";

ItemMultiline.propTypes = {
  name: string,
  value: string,
};
export default function ItemMultiline({ name, value }) {
  return (
    <Box
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
        {name} :{" "}
      </Typography>
      <Typography
        sx={{
          whiteSpace: "pre-line",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
