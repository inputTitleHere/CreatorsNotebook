
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
      <Container
        sx={{
          WebkitUserSelect: "none",
          userSelect: "none",
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          sx={{
            marginTop: "48px",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3">창작자의 노트북</Typography>
            <Box
              onClick={() => navigate("/dashboard")}
              sx={{
                width: "200px",
                height: "50px",
                border: "5px solid",
                borderColor: "primary.main",
                borderRadius: "25px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: "-10px",
                right: "0px",
              }}
            >
              <Typography>{">>"} 대쉬보드 바로가기</Typography>
            </Box>
          </Box>
          <MainDivider />
          <SiteExplanation />
        </Stack>

        <MainDivider />
        <CurrentServices />
      </Container>
    </Box>
  );
}
