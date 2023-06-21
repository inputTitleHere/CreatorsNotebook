import { Box, Typography } from "@mui/material";
import { any, string } from "prop-types";

/**
 *
 */
ItemSingleline.propTypes = {
  name: string,
  value: any,
};
export default function ItemSingleline({ name, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">{name} : </Typography>
      <Typography
      // sx={{
      //   whiteSpace: "pre-line",
      // }}
      >
        {value}
      </Typography>
    </Box>
  );
}
