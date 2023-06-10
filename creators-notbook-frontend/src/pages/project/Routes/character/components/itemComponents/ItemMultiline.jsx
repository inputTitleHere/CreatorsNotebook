import { Box, Typography } from "@mui/material";
import { number, string } from "prop-types";

ItemMultiline.propTypes = {
  name: string,
  value: string | number,
  key: number | string,
};
export default function ItemMultiline({ name, value, key }) {
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
