import { useNavigate } from "react-router-dom";
import Header from "../common/header/Header";
import { Box, Container, Typography } from "@mui/material";

/**
 * 웹사이트 제일 첫 랜딩페이지를 구성한다.
 */
export default function Index() {
  const navigate = useNavigate();

  return (
    <Box>
      <Header showLoginOption={true} />
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "48px",
          }}
        >
          <Typography variant="h2">
            창작자를 위한 창작정보 관리 웹 서비스
          </Typography>
        </Box>
        <Box
          onClick={() => navigate("/dashboard")}
          sx={{
            width: "600px",
            height: "600px",
            border: "2px solid",
            borderColor: "primary.main",
            margin: "24px auto",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        ></Box>
      </Container>
    </Box>
  );
}
