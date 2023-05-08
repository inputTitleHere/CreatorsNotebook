import "./Header.scss";
import { useSelector } from "react-redux";
import LoginRegisterComponent from "./components/LoginRegisterComponent";
import UserInfoComponent from "./components/UserInfoComponent";
import { Link } from "react-router-dom";

/**
 * 웹사이트의 비 프로젝트 페이지의 상단부에 배치될 Header 컴포넌트.
 * 로그인 유무에 따라 표시되는
 * @returns <Header/>
 */
export default function Header({ showLoginOption }) {
  const user = useSelector((state) => state.user.value);

  return (
    <div id="header">
      <Link to={"/"} className="link-to-main"><h1>창작자의 노트북</h1></Link> 
      {showLoginOption && (
        <div className="user-section">
          {user ? <UserInfoComponent /> : <LoginRegisterComponent />}
        </div>
      )}
    </div>
  );
}