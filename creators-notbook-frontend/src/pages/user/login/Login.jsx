import { useRef, useState } from "react";
import Header from "../../common/header/Header";
import "./Login.scss";
import LoginRemeberMeComponent from "./components/LoginRememberMeComponent";
import { fetchByForm } from "../../../utils/fetch";
import { useDispatch } from "react-redux";
import { login } from "../../../redux-store/slices/userSlice";
import { setJwtToStorage } from "../../../utils/userUtil";
import { useNavigate } from "react-router-dom";

/**
 * 로그인 페이지 최상단 컴포넌트.
 * 로그인 페이지를 표시.
 */
export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * 서버로 로그인 정보를 보내 로그인을 시도한다.
   * 성공시 Dashboard으로 이동. 실패시 메세지를 표시한다.
   * @param {Event} event : submit된 이벤트
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rememberMe) {
      localStorage.setItem("rememberMe", JSON.stringify(true));
    } else {
      localStorage.removeItem("rememberMe");
    }
    const response = await fetchByForm("/user/login", "POST", formRef.current);
    if (response) {
      dispatch(login(response.user));
      setJwtToStorage(response.jwt);
      navigate("/dashboard");
    } else {
      setWarningMessage("이메일 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <>
      <Header showLoginOption={false} />
      <section className="login-section">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} ref={formRef}>
            <label className="major-input" htmlFor="email">
              이메일
            </label>
            <input className="major-input" type="text" name="email" id="email" />
            <label className="major-input" htmlFor="password">
              비밀번호
            </label>
            <input className="major-input" type="password" name="password" id="password" />
            <div className="warning">{warningMessage}&nbsp;</div>
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
