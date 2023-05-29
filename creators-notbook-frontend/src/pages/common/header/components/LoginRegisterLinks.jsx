import { Link } from "react-router-dom";

/**
 * 로그인, 회원가입 페이지로 이동하는 링크를 배치.
 * @returns
 */
export default function LoginRegisterLinks() {
  return (
    <div className="not-logged-in">
      <div className="login">
        <Link to={"/user/login"}>로그인</Link>
      </div>
      <div className="register">
        <Link to={"/user/register"}>회원가입</Link>
      </div>
    </div>
  );
}
