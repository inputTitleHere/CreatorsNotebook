import { useState } from "react";
import { func, string } from "prop-types";
import {
  Box,
  FormControl,
  FormLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

RegisterUserNicknameComponent.propTypes = {
  setState: func,
  defaultValue: string,
};

export default function RegisterUserNicknameComponent({ setState }) {
  const [message, setMessage] = useState(undefined);
  const [nickname, setNickname] = useState("");

  /**
   * 닉네임 사용여부를 확인하여 불가능시 메세지 설정.
   */
  const handleNicknameChange = (event) => {
    const nickname = event.target.value;
    setNickname(nickname);
    if (nickname.length === 0) {
      setState(false);
      setMessage("");
      return;
    }
    if (/^[0-9ㄱ-ㅎ가-힣a-zA-Z-_]+$/.test(nickname)) {
      setState(true);
      setMessage(undefined);
    } else {
      setState(false);
      setMessage(
        "닉네임은 한글, 숫자, 영어, 대쉬(-)와 언더스코어(_)를 제외하고 사용이 불가합니다."
      );
    }
  };

  return (
    <>
      <FormControl fullWidth>
        <FormLabel htmlFor="nickname">
          <Typography variant="h4">닉네임</Typography>
        </FormLabel>
        <OutlinedInput
          name="nickname"
          id="nickname"
          fullWidth
          required
          placeholder="닉네임을 입력해주세요!"
          value={nickname}
          onChange={handleNicknameChange}
          error={Boolean(message)}
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
          {message ? (
            <Typography color="warning.main">{message}</Typography>
          ) : (
            <Typography>&nbsp;</Typography>
          )}
        </Box>
      </FormControl>
    </>
  );
}
