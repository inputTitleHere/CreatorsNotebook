import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import RegisterPasswordComponent from "@src/pages/common/registerComponents/RegisterPasswordComponent";
import { fetchByForm } from "@src/utils/fetch";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangePassword() {
  const userData = useSelector((state) => state.user.user);
  const formRef = useRef(null);
  const [newPasswordUsable, setNewPasswordUsable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  /**
   * 비밀번호를 변경하는 기능을 수행하는 메소드
   * @param {object} event 비밀번호 변경 클릭시 넘어오는 이벤트 객체
   */
  const handleChangePassword = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append("email", userData.email);

    const response = await fetchByForm(
      "/user/changePassword",
      "POST",
      formData
    );
    console.log(response);
    if (response.data) {
      formRef.current.reset();
      alert("비밀번호가 변경되었습니다.");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <Box>
      <form onSubmit={handleChangePassword} ref={formRef}>
        <Stack spacing={2}>
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

          <FormControl fullWidth>
            <FormLabel htmlFor="originalPassword">
              <Typography variant="h4">기존 비밀번호</Typography>
            </FormLabel>
            <OutlinedInput
              name="originalPassword"
              id="originalPassword"
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              placeholder="기존 비밀번호를 입력해주세요!"
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
          <Typography variant="h3">신규 비밀번호 </Typography>
          <RegisterPasswordComponent setState={setNewPasswordUsable} />
          <Box
            sx={{
              display: "flex",
              justifyContent:"flex-end"
            }}
          >
            <Button
              type="submit"
              variant="outlined"
              disabled={!newPasswordUsable}
            >
              <Typography variant="h6">변경하기</Typography>
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
