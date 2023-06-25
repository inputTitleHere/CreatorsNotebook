import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ReturnToMainLink() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        marginRight: "15px",
      }}
    >
      <Typography
        variant="h6"
        onClick={() => navigate("/")}
        sx={{
          cursor: "pointer",
        }}
      >
        돌아가기
      </Typography>
    </Box>
  );
}
