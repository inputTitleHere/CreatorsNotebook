import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

RegisterPasswordComponent.propTypes = {
  setState: PropTypes.func,
};

/**
 * 비밀번호 영역(비밀번호 입력 및 확인)에 대한 컴포넌트 입니다.
 * 비밀번호 조건(영문, 숫자, 특수문자 포함 8자 이상)과 비밀번호와 확인입력이 동일한지 체크합니다.
 * 비밀번호 보기 토글 버튼
 * @param {setState:func} param0
 * @returns
 */
export default function RegisterPasswordComponent({ setState }) {
  const [passwordCheck, setPasswordCheck] = useState(undefined);
  const [passwordMatch, setPasswordMatch] = useState(undefined);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordForCheck, setPasswordForCheck] = useState("");
  /**
   * 비밀번호가 사용가능하고
   * 확인 비밀번호와 일치하는 경우
   * 상급 컴포넌트의 비밀번호 가능 상태를 토글한다.
   */
  useEffect(() => {
    if (passwordCheck && passwordMatch) {
      setState(true);
    } else {
      setState(false);
    }
  }, [passwordCheck, passwordMatch, setState]);

  /**
   * 현재 입력된 비밀번호가 사용가능한 비밀번호 조합인지 확인한다.
   */
  const validatePassword = (event) => {
    const password = event.target.value;
    setPassword(password);

    if (password.length > 0) {
      if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*\-=^_#+?~&])[A-Za-z\d$@$_!\-=^+=~%*#?&]{8,}$/.test(
          password
        )
      ) {
        setPasswordMessage(undefined);
        setPasswordCheck(true);
      } else {
        setPasswordCheck(false);
        setPasswordMessage(
          "비밀번호는 영문, 숫자, 특수문자를 포함해 8글자 이상이 되어야 합니다."
        );
      }
      if (passwordForCheck.length > 0) {
        if (passwordForCheck !== password) {
          setPasswordMatch(false);
        } else {
          setPasswordMatch(true);
        }
      }
    }
    if (password.length === 0 && passwordForCheck.length === 0) {
      setPasswordMatch(undefined);
    }else{
      setPasswordMatch(password===passwordForCheck);
    }
  };

  /**
   * 확인 비밀번호와 현재 비밀번호가 일치하는지 확인한다.
   */
  const checkPasswordMatch = (event) => {
    const passwordCheck = event.target.value;
    setPasswordForCheck(passwordCheck);
    if (passwordCheck.length === 0) {
      setPasswordMatch(undefined);
      return;
    }
    if (passwordCheck === password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <>
      <FormControl fullWidth>
        <FormLabel htmlFor="password">
          <Typography variant="h4">비밀번호</Typography>
        </FormLabel>
        <OutlinedInput
          name="password"
          id="password"
          fullWidth
          required
          value={password}
          error={passwordCheck === false}
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요!"
          onChange={validatePassword}
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="warning.main">{passwordMessage}&nbsp;</Typography>
        </Box>
      </FormControl>
      <FormControl fullWidth>
        <FormLabel htmlFor="password-check">
          <Typography variant="h4">비밀번호 확인</Typography>
        </FormLabel>
        <OutlinedInput
          id="password-check"
          fullWidth
          required
          type="password"
          error={passwordMatch === false}
          placeholder="비밀번호를 다시 한번 입력해주세요!"
          onChange={checkPasswordMatch}
          value={passwordForCheck}
          sx={{
            marginTop: "12px",
            "& fieldset": {
              borderRadius: "25px",
            },
            borderRadius: "25px",
            overflow: "hidden",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {passwordMatch === false ? (
            <Typography color="warning.main">
              위의 비밀번호와 동일하게 입력해주세요.
            </Typography>
          ) : (
            <Typography>&nbsp;</Typography>
          )}
        </Box>
      </FormControl>
    </>
  );
}
