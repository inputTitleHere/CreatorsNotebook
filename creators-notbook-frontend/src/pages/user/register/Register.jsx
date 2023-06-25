import { useRef, useState } from "react";
import RegisterEmailComponent from "../../COMMON/registerComponents/RegisterEmailComponent";
import RegisterPasswordComponent from "../../COMMON/registerComponents/RegisterPasswordComponent";
import RegisterUserNicknameComponent from "../../COMMON/registerComponents/RegisterUserNicknameComponent";
import { fetchByForm } from "../../../utils/fetch";
import { useNavigate } from "react-router-dom";
import { setJwtToStorage } from "../../../utils/userUtil";
import { useDispatch } from "react-redux";
import { login } from "../../../redux-store/slices/userSlice";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import SecondaryDivider from "../../COMMON/simpleComponents/SecondaryDivider";
import Header from "../../COMMON/header/Header";
/**
 * 회원가입 페이지를 표시하는 컴포넌트.
 */
export default function Register() {
  const [idCheck, setIdCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [userNicknameCheck, setUserNicknameCheck] = useState(false);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * 회원가입 기능을 수행하며 성공시 내부적으로 로그인API를 한번 더 실행시킨 이후 대쉬보드로 이동시킨다.
   * @param {Event} event 회원가입 form의 submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetchByForm(
      "/user/register",
      "POST",
      formRef.current
    );
    if (response.data) {
      const loginResponse = await fetchByForm(
        "/user/login",
        "POST",
        formRef.current
      );
      dispatch(login(loginResponse.user));
      setJwtToStorage(loginResponse.jwt);
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Header showLoginOption={false} />
      <Container
        sx={{
          width: "600px",
          marginTop: "48px",
        }}
      >
        <form onSubmit={handleSubmit} ref={formRef}>
          <Stack spacing={1}>
            <Box>
              <Typography variant="h3">회원 가입</Typography>
            </Box>
            <SecondaryDivider />
            <RegisterEmailComponent setState={setIdCheck} />
            <RegisterPasswordComponent setState={setPasswordCheck} />
            <RegisterUserNicknameComponent
              setState={setUserNicknameCheck}
              initialValue={""}
            />
          </Stack>
          <Divider
            sx={{
              marginBottom: "24px",
            }}
          />
          <Box>
            <Button
              disabled={!(idCheck && passwordCheck && userNicknameCheck)}
              variant="contained"
              fullWidth
              type="submit"
            >
              <Typography variant="h6">신규 회원 가입</Typography>
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
}
