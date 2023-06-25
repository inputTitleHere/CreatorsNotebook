import { useNavigate } from "react-router-dom";
import { removeJwtFromStorage } from "../../../../utils/userUtil";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux-store/slices/userSlice";
import { object } from "prop-types";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { IMAGE_DIRECTORY } from "../../../../utils/imageUtils";

UserInfoComponent.propTypes = {
  user: object,
};

export default function UserInfoComponent({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * 사용자를 로그아웃 처리하고 JWT 삭제 및 slice에서 정보를 지운 이후 메인페이지로 이동.
   */
  const logoutUser = () => {
    removeJwtFromStorage();
    localStorage.removeItem("rememberMe");
    sessionStorage.removeItem("user");
    navigate("/");
    dispatch(logout());
  };

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      sx={{
        cursor: "pointer",
        margin: "12px",
      }}
    >
      <Box
        onClick={() => navigate("/user/mypage")}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {user.image ? (
          <Avatar src={IMAGE_DIRECTORY + user.image} />
        ) : (
          <Avatar
            sx={{
              bgcolor: "primary.main",
            }}
          >
            <Typography>{user.nickname?.substring(0, 1)}</Typography>
          </Avatar>
        )}
        <Typography
          sx={{
            marginLeft: "12px",
          }}
        >
          {user.nickname}
        </Typography>
      </Box>
      <Divider
        flexItem
        orientation="vertical"
        sx={{
          borderColor: "outline.main",
          margin: "0px 12px",
        }}
      />
      <Typography
        variant="h6"
        onClick={logoutUser}
        sx={{
          cursor: "pointer",
        }}
      >
        로그아웃
      </Typography>
    </Stack>
  );
}
