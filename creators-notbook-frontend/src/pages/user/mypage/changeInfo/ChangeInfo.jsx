import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchByForm } from "@src/utils/fetch";
import { update } from "@src/redux-store/slices/userSlice";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import SecondaryDivider from "../../../COMMON/simpleComponents/SecondaryDivider";
import RegisterUserNicknameComponent from "../../../COMMON/registerComponents/RegisterUserNicknameComponent";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangeInfo() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const [showPassword, setShowPassword] = useState(false);
  const [nicknameState, setNicknameState] = useState(undefined);

  /**
   * 닉네임을 변경 요청을 서버로 전송한다.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("email", userData.email);
    const response = await fetchByForm(
      "/user/changeUserInfo",
      "POST",
      formData
    );
    if (response.data) {
      alert("계정 정보가 수정되었습니다.");
      sessionStorage.setItem("user",JSON.stringify(response.data));
      dispatch(update(response.data));
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <Box>
      <Typography variant="h3">계정 정보 변경</Typography>
      <SecondaryDivider />
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* 이메일 기본 입력 */}
          <FormControl fullWidth>
            <FormLabel htmlFor="email">
              <Typography variant="h4">이메일</Typography>
            </FormLabel>
            <OutlinedInput
              name="email"
              id="email"
              fullWidth
              disabled
              value={userData.email}
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
          {/* 닉네임 설정 */}
          <RegisterUserNicknameComponent
            setState={setNicknameState}
            initialValue={userData.nickname}
          />
          {/* 비밀번호 입력 */}
          <FormControl fullWidth>
            <FormLabel htmlFor="password">
              <Typography variant="h4">비밀번호 확인</Typography>
            </FormLabel>
            <OutlinedInput
              name="password"
              id="password"
              fullWidth
              type={showPassword ? "text" : "password"}
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
          </FormControl>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="outlined" type="submit" disabled={!nicknameState}>
              <Typography variant="h6">변경하기</Typography>
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
