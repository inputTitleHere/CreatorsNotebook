import {  useRef, useState } from "react";
import Header from "../../common/header/Header";
import EmailComponent from "./components/RegisterEmailComponent";
import PasswordComponent from "./components/RegisterPasswordComponent";
import UserNicknameComponent from "./components/RegisterUserNicknameComponent";
import './Register.scss'
import { fetchByForm } from "../../../utils/fetch";
/**
 * 회원가입 페이지를 표시하는 컴포넌트.
 * 
 */
export default function Register() {
  const [idCheck, setIdCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [userNicknameCheck, setUserNicknameCheck] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchByForm("/user/register","POST",formRef.current)
    .then(response=>{
      console.log(response);
    })
  };

  return (
    <>
      <Header showLoginOption={false} />
      <section>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} ref={formRef}>
            <EmailComponent setState={setIdCheck}/>
            <PasswordComponent setState={setPasswordCheck}/>
            <UserNicknameComponent setState={setUserNicknameCheck}/>
            <button disabled={!(idCheck&&passwordCheck&&userNicknameCheck)} >회원가입</button>
          </form>
        </div>
      </section>
    </>
  );
}
