import { Link } from "react-router-dom";

export default function LoginRegisterComponent() {
  return (
    <>
      <Link to={"/login"}>로그인</Link> | <Link to={"/register"}>회원가입</Link>
    </>
  );
}
