import "./Header.scss";
import { useSelector } from "react-redux";
import LoginRegisterLinks from "./components/LoginRegisterLinks";
import UserInfoComponent from "./components/UserInfoComponent";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ReturnToMainLink from "./components/ReturnToMainLink";
import { Box, Typography } from "@mui/material";

Header.propTypes = {
  showLoginOption: PropTypes.bool,
};

/**
 * 웹사이트의 비 프로젝트 페이지의 상단부에 배치될 Header 컴포넌트.
 * 로그인 유무에 따라 로그인/회원가입 또는 회원정보를 표시한다.
 * @returns <Header/>
 */
export default function Header({ showLoginOption = true }) {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100vw",
        borderBottom: "1px solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height:"77px"
      }}
    >
      <Typography
        variant="h3"
        onClick={() => navigate("/")}
        sx={{
          cursor: "pointer",
          marginLeft: "12px",
        }}
      >
        창작자의 노트북
      </Typography>
      <Box>
        {showLoginOption ? (
          user ? (
            <UserInfoComponent user={user} />
          ) : (
            <LoginRegisterLinks />
          )
        ) : (
          <ReturnToMainLink />
        )}
      </Box>
    </Box>
  );
}
