import { useNavigate } from "react-router-dom";
import Header from "../common/header/Header";
import { Box, Container, Typography, Stack } from "@mui/material";
import SiteExplanation from "./components/SiteExplanation";
import MainDivider from "./components/MainDivider";
import CurrentServices from "./components/CurrentServices";

/**
 * 웹사이트 제일 첫 랜딩페이지를 구성한다.
 */
export default function Index() {
  const navigate = useNavigate();

  return (
    <Box>
      <Header showLoginOption={true} />
      <Container>
        <Stack
          direction="column"
          alignItems="center"
          sx={{
            marginTop: "48px",
          }}
        >
          <Typography variant="h3">창작자의 노트북</Typography>
          <MainDivider />
          <SiteExplanation />
        </Stack>
        <Box
          onClick={() => navigate("/dashboard")}
          sx={{
            width: "200px",
            height: "200px",
            border: "2px solid",
            borderColor: "primary.main",
            margin: "24px auto",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>{">>"} 대쉬보드 바로가기</Typography>
        </Box>
        <MainDivider />
        <CurrentServices/>
      </Container>
    </Box>
  );
}
