import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Header from "../../common/header/Header";
import { useState } from "react";
import { fetchByUrl } from "../../../utils/fetch";

/**
 * 비밀번호 초기화 기능을 수행하기 위한 페이지
 */
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailCheckButtonToggle, setEmailCheckButtonToggle] = useState(true);
  const [isAuthStrSent, setIsAuthStrSent] = useState(false);
  const [serverAuthStr, setServerAuthStr] = useState(undefined);
  const [isAuthPass, setIsAuthPass] = useState(false);
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
    formData.append("email",email);
    const {data} = await fetchByUrl("/user/authStr","GET",formData);
    console.log(data);
    setEmailCheckButtonToggle(true)
    setIsAuthStrSent(true);
    setServerAuthStr(data);
  };

  const handleAuthStrInput = (event) => {
    if(serverAuthStr===event.target.value){
      setIsAuthPass(true);
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
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={!isAuthPass}
          >
            <Typography variant="h5">비밀번호 초기화 하기</Typography>
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
