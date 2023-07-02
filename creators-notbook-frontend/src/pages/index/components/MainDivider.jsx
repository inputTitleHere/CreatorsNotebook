import { Box, Divider } from "@mui/material";

/**
 * MUI Divider의 index 전용 개량형.
 */
export default function MainDivider() {
  return (
    <Divider
      flexItem
      sx={{
        marginTop: "24px",
      }}
    >
      <Box
        sx={{
          rotate: "45deg",
          border: "2px solid",
          borderColor: "tertiary.main",
          width: "20px",
          height: "20px",
        }}
      >
      </Box>
    </Divider>
  );
}
