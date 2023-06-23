import { useRef, useState } from "react";
import Header from "../../common/header/Header";
import "./Login.scss";
import LoginRemeberMeCheckbox from "./components/LoginRememberMeCheckbox";
import { fetchByForm } from "../../../utils/fetch";
import { useDispatch } from "react-redux";
import { login } from "../../../redux-store/slices/userSlice";
import { setJwtToStorage } from "../../../utils/userUtil";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

/**
 * 로그인 페이지 최상단 컴포넌트.
 * 로그인 페이지를 표시.
 */
export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * 서버로 로그인 정보를 보내 로그인을 시도한다.
   * 성공시 Dashboard으로 이동. 실패시 메세지를 표시한다.
   * @param {Event} event : submit된 이벤트
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rememberMe) {
      localStorage.setItem("rememberMe", JSON.stringify(true));
    } else {
      localStorage.removeItem("rememberMe");
    }
    console.log(formRef.current);
    const response = await fetchByForm("/user/login", "POST", formRef.current);
    if (response) {
      dispatch(login(response.user));
      setJwtToStorage(response.jwt);
      navigate("/dashboard");
    } else {
      setWarningMessage("※ 이메일 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <>
      <Header showLoginOption={false} />
      <Container
        sx={{
          width: "600px",
          marginTop: "96px",
        }}
      >
        <form onSubmit={handleSubmit} ref={formRef}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h3">로그인</Typography>
            </Box>
            <Divider
              sx={{
                border: "1px solid",
                borderColor: "secondary.main",
                margin: "12px 0px",
              }}
            />
            <FormControl fullWidth>
              <FormLabel htmlFor="email">
                <Typography variant="h4">이메일</Typography>
              </FormLabel>
              <OutlinedInput
                name="email"
                id="email"
                fullWidth
                required
                placeholder="이메일을 입력해주세요!"
                sx={{
                  marginTop: "12px",
                  "& fieldset": {
                    borderRadius: "25px",
                  },
                  borderRadius: "25px",
                  overflow: "hidden",
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="password">
                <Typography variant="h4">비밀번호</Typography>
              </FormLabel>
              <OutlinedInput
                name="password"
                id="password"
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요!"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{
                  marginTop: "12px",
                  "& fieldset": {
                    borderRadius: "25px",
                  },
                  borderRadius: "25px",
                  overflow: "hidden",
                }}
              />
              <Typography color="warning.main">{warningMessage}</Typography>
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                margin: "10px 20px 0px",
              }}
            >
              <LoginRemeberMeCheckbox
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
              />
              <Link
                sx={{
                  cursor: "pointer",
                }}
              >
                비밀번호 재설정하기
              </Link>
            </Stack>
            <Box
              sx={{
                marginTop: "12px",
              }}
            >
              <Button variant="contained" fullWidth type="submit">
                <Typography variant="h5">로그인</Typography>
              </Button>
            </Box>
          </Stack>
        </form>
      </Container>
    </>
  );
}
