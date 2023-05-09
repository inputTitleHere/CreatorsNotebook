import { useState } from "react";
import Header from "../../common/header/Header";
import "./Login.scss";
import LoginRemeberMeComponent from "./components/LoginRememberMeComponent";

/**
 * 로그인 페이지 최상단 컴포넌트.
 * 로그인 페이지를 표시.
 */
export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit Login");
  };

  return (
    <>
      <Header showLoginOption={false} />
      <section className="login-section">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <label className="major-input" htmlFor="email">
              이메일
            </label>
            <input className="major-input" type="text" name="email" id="email" />
            <label className="major-input" htmlFor="password">
              비밀번호
            </label>
            <input className="major-input" type="password" name="password" id="password" />
            <div>
              <div className="input-wrapper">
                <LoginRemeberMeComponent rememberMe={rememberMe} setRememberMe={setRememberMe} />
              </div>
              <button>로그인</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
