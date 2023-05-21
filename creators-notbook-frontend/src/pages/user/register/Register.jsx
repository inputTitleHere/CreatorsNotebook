import { useRef, useState } from "react";
import Header from "../../common/header/Header";
import EmailComponent from "./components/RegisterEmailComponent";
import PasswordComponent from "./components/RegisterPasswordComponent";
import UserNicknameComponent from "./components/RegisterUserNicknameComponent";
import "./Register.scss";
import { fetchByForm } from "../../../utils/fetch";
import { useNavigate } from "react-router-dom";
import { setJwtToStorage } from "../../../utils/userUtil";
import { useDispatch } from "react-redux";
import { login } from "../../../redux-store/slices/userSlice";
/**
 * 회원가입 페이지를 표시하는 컴포넌트.
 */
export default function Register() {
  const [idCheck, setIdCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [userNicknameCheck, setUserNicknameCheck] = useState(false);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * 회원가입 기능을 수행하며 성공시 내부적으로 로그인API를 한번 더 실행시킨 이후 대쉬보드로 이동시킨다.
   * @param {Event} event 회원가입 form의 submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetchByForm("/user/register", "POST", formRef.current);
    if (response.data) {
      const loginResponse = await fetchByForm("/user/login","POST",formRef.current);
      dispatch(login(loginResponse.user));
      setJwtToStorage(loginResponse.jwt);
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Header showLoginOption={false} />
      <section>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} ref={formRef}>
            <EmailComponent setState={setIdCheck} />
            <PasswordComponent setState={setPasswordCheck} />
            <UserNicknameComponent setState={setUserNicknameCheck} />
            <button disabled={!(idCheck && passwordCheck && userNicknameCheck)}>회원가입</button>
          </form>
        </div>
      </section>
    </>
  );
}
