import PropTypes from "prop-types";
import { useState } from "react";
import { fetchByUrl } from "@src/utils/fetch";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

RegisterEmailComponent.propTypes = {
  setState: PropTypes.func,
};

/**
 * 이메일 입력에 대한 컴포넌트.
 * 이메일 확인 버튼을 통해 서버와 통신, 사용가능한 이메일인지 확인
 * @param {setState:func} param0
 * @returns
 */
export default function RegisterEmailComponent({ setState }) {
  const [passState, setPassState] = useState(null);
  const [email, setEmail] = useState("");
  const [emailCheckButtonToggle, setEmailCheckButtonToggle] = useState(true);

  /**
   * 입력된 이메일이 사용가능한지 서버에 쿼리한다.
   */
  const checkIfEmailUsable = async () => {
    const emailData = {
      email: email,
    };
    console.log(emailData);
    const emailUsable = await fetchByUrl(
      "/user/checkIfEmailUsable",
      "GET",
      emailData
    );
    if (emailUsable.data) {
      setState(true);
      setPassState(true);
    } else {
      setState(false);
      setPassState(false);
    }
  };

  /**
   * 이메일 변경을 추적.
   * 변경시 중복확인을 true하며 사용가능 이메일을 false한다.
   */
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setState(false);
    setPassState(null);
    if (event.target.value.includes("@")) {
      setEmailCheckButtonToggle(false);
    } else {
      setEmailCheckButtonToggle(true);
    }
  };

  return (
    <FormControl>
      <FormLabel htmlFor="register-email">
        <Typography variant="h4">이메일</Typography>
      </FormLabel>
      <OutlinedInput
        name="email"
        id="register-email"
        onChange={handleEmailChange}
        value={email}
        error={passState===false}
        fullWidth
        required
        placeholder="회원용 이메일을 입력해주세요!"
        endAdornment={
          <Button
            variant="outlined"
            onClick={checkIfEmailUsable}
            disabled={emailCheckButtonToggle}
            sx={{
              width: "25%",
              borderRadius: "25px",
            }}
          >
            <Typography variant="h6">중복 확인</Typography>
          </Button>
        }
        sx={{
          marginTop: "12px",
          borderRadius: "35px",
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
        {passState !== null ? (
          passState ? (
            <Typography color="primary">사용가능한 이메일입니다.</Typography>
          ) : (
            <Typography color="warning.main">중복된 이메일 입니다.</Typography>
          )
        ) : (
          <Typography>&nbsp;</Typography>
        )}
      </Box>
    </FormControl>
  );
}
