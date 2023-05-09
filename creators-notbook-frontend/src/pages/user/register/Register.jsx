import {  useState } from "react";
import Header from "../../common/header/Header";
import EmailComponent from "./components/RegisterEmailComponent";
import PasswordComponent from "./components/RegisterPasswordComponent";
import UserNicknameComponent from "./components/RegisterUserNicknameComponent";
import './Register.scss'

export default function Register() {
  const [idCheck, setIdCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [userNicknameCheck, setUserNicknameCheck] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Header showLoginOption={false} />
      <section>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
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
