import { Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * 로그인, 회원가입 페이지로 이동하는 링크를 배치.
 */
export default function LoginRegisterLinks() {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        marginRight: "15px",
      }}
    >
      <Typography
        variant="h5"
        onClick={() => navigate("/user/login")}
        sx={{
          cursor: "pointer",
        }}
      >
        로그인
      </Typography>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "outline.main",
        }}
      />
      <Typography
        variant="h5"
        onClick={() => navigate("/user/register")}
        sx={{
          cursor: "pointer",
        }}
      >
        회원가입
      </Typography>
    </Stack>
  );
}
