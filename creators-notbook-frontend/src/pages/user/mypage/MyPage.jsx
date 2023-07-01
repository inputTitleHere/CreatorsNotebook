import { Link, Outlet } from "react-router-dom";
import Header from "../../common/header/Header";
import {
  Container,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";

/**
 * 마이페이지 총괄 컴포넌트
 */
export default function MyPage() {
  const [tabValue, setTabValue] = useState("/user/mypage");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Header />
      <Container
        sx={{
          width: "80vw",
          minWidth: "600px",
        }}
      >
        <Stack
          direction="row"
          spacing={5}
          sx={{
            marginTop: "24px",
            minHeight: "85vh",
          }}
        >
          <Paper
            sx={{
              minWidth: "150px",
            }}
          >
            <Tab
              label={
                <Typography variant="body1">대쉬보드로 돌아가기</Typography>
              }
              to="/dashboard"
              LinkComponent={Link}
            />
            <Divider />
            <Tabs
              orientation="vertical"
              value={tabValue}
              onChange={handleTabChange}
            >
              <Tab
                label={
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.7em",
                    }}
                  >
                    계정정보 수정
                  </Typography>
                }
                value="/user/mypage"
                to="/user/mypage"
                LinkComponent={Link}
              />
              <Tab
                label={
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.7em",
                    }}
                  >
                    비밀번호 변경
                  </Typography>
                }
                value="/user/mypage/password"
                to="/user/mypage/password"
                LinkComponent={Link}
              />
            </Tabs>
          </Paper>
          <Paper
            sx={{
              width: "70vw",
              padding: "24px",
              minWidth: "400px",
            }}
          >
            <Outlet />
          </Paper>
        </Stack>
      </Container>
    </>
  );
}
