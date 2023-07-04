import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Header from "@src/pages/common/header/Header";
import { useState } from "react";
import { fetchByForm, fetchByUrl } from "@src/utils/fetch";
import { ContentCopy, TaskAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/**
 * 비밀번호 초기화 기능을 수행하기 위한 페이지
 */
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailCheckButtonToggle, setEmailCheckButtonToggle] = useState(true);
  const [isAuthStrSent, setIsAuthStrSent] = useState(false);
  const [serverAuthStr, setServerAuthStr] = useState(undefined);
  const [isAuthPass, setIsAuthPass] = useState(false);
  const [resetKey, setResetKey] = useState("");
  const [newPassword, setNewPassword] = useState(undefined);
  const [copySuccess, setCopySuccess] = useState(false);

  const navigate = useNavigate();

  /**
   * 이메일 state를 업데이트한다.
   * 이메일 형식이 사용가능한 형식인지 판단한다.
   */
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (event.target.value.includes("@")) {
      setEmailCheckButtonToggle(false);
    } else {
      setEmailCheckButtonToggle(true);
    }
  };

  /**
   * 서버로 이메일 주소를 보내고 SMTP를 보낸다.
   * SMTP가 성공적으로 보내졌으면 인증번호 입력칸을 허용시킨다.
   */
  const sendAuthStr = async () => {
    console.log("send auth str smtp attempt");
    const formData = new FormData();
    formData.append("email", email);
    const { authString, key } = await fetchByUrl(
      "/user/authStr",
      "GET",
      formData
    );
    setEmailCheckButtonToggle(true);
    setIsAuthStrSent(true);
    setResetKey(key);
    setServerAuthStr(authString);
  };

  const handleAuthStrInput = (event) => {
    if (serverAuthStr === event.target.value) {
      setIsAuthPass(true);
    }
  };

  /**
   * 비밀번호 초기화 버튼 클릭시 서버로 초기화 요청을 보낸다.
   * 서버로부터 받아온 비밀번호를 state에 저장하여 표시한다.
   */
  const handleResetPasswordButton = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("key", resetKey);
    const { data: newPassword } = await fetchByForm(
      "/user/resetPassword",
      "PUT",
      formData
    );
    setNewPassword(newPassword);
  };

  const copyPasswordToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(newPassword);
      setCopySuccess(true);
    } catch (e) {
      alert("클립보드로 복사에 실패했습니다...");
    }
  };

  return (
    <Box>
      <Header showLoginOption={false} />
      <Container
        sx={{
          width: "600px",
          marginTop: "96px",
        }}
      >
        <Box>
          <Typography variant="h3">비밀번호 초기화</Typography>
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
            onChange={handleEmailChange}
            value={email}
            fullWidth
            disabled={isAuthPass}
            placeholder="이메일을 입력해주세요!"
            endAdornment={
              <Button
                variant="outlined"
                disabled={emailCheckButtonToggle}
                onClick={sendAuthStr}
                sx={{
                  width: "38%",
                  borderRadius: "25px",
                }}
              >
                <Typography variant="h6">인증번호 보내기</Typography>
              </Button>
            }
            sx={{
              marginTop: "12px",
              borderRadius: "35px",
              overflow: "hidden",
            }}
          />
        </FormControl>
        <Divider
          sx={{
            margin: "24px 0px 12px",
          }}
        />
        <FormControl fullWidth>
          <FormLabel htmlFor="authstr">
            <Typography variant="h4">인증 번호</Typography>
          </FormLabel>
          <OutlinedInput
            id="authstr"
            fullWidth
            disabled={!isAuthStrSent || isAuthPass}
            onChange={handleAuthStrInput}
            placeholder="인증 번호를 입력해주세요!"
            sx={{
              marginTop: "12px",
              borderRadius: "35px",
              overflow: "hidden",
            }}
          />
        </FormControl>
        <Box
          sx={{
            marginTop: "36px",
          }}
        >
          {newPassword ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "24px",
                border: "2px solid",
                borderColor: "secondary.main",
                borderRadius: "15px",
              }}
            >
              <Typography variant="body1">신규 임시 비밀번호</Typography>
              <Typography
                variant="h3"
                sx={{
                  position: "relative",
                }}
              >
                {newPassword}
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "3px",
                    right: "-60px",
                  }}
                  onClick={copyPasswordToClipBoard}
                >
                  {copySuccess ? (
                    <TaskAlt fontSize="large" color="success" />
                  ) : (
                    <ContentCopy fontSize="large" />
                  )}
                </IconButton>
              </Typography>
              <Typography color="warning.main">
                ※ 해당 비밀번호는 페이지 이동시 다시 표시되지 않습니다.{" "}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  marginTop: "12px",
                  width: "80%",
                }}
                onClick={()=>navigate("/user/login")}
              >
                <Typography
                  sx={{
                    fontSize: "2em",
                  }}
                >
                  로그인 페이지로 이동
                </Typography>
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={!isAuthPass}
              onClick={handleResetPasswordButton}
            >
              <Typography variant="h5">비밀번호 초기화 하기</Typography>
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}
