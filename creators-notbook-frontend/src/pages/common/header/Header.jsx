import "./Header.scss";
import { useSelector } from "react-redux";
import LoginRegisterLinks from "./components/LoginRegisterLinks";
import UserInfoComponent from "./components/UserInfoComponent";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import ReturnToMainLink from "./components/ReturnToMainLink";

Header.propTypes = {
  showLoginOption : PropTypes.bool
}

/**
 * 웹사이트의 비 프로젝트 페이지의 상단부에 배치될 Header 컴포넌트.
 * 로그인 유무에 따라 로그인/회원가입 또는 회원정보를 표시한다.
 * @returns <Header/>
 */
export default function Header({ showLoginOption=true }) {
  const user = useSelector((state) => state.user.user);
  return (
    <div id="header">
      <Link to={"/"} className="link-to-main"><h1>창작자의 노트북</h1></Link> 
      {showLoginOption ? (
        <div className="user-section">
          {user ? <UserInfoComponent data={user}/> : <LoginRegisterLinks />}
        </div>
      ) : <ReturnToMainLink/>}
    </div>
  );
}
