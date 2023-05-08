import {  useState } from "react";
import Header from "../../common/header/Header";
import EmailComponent from "./components/EmailComponent";
import PasswordComponent from "./components/PasswordComponent";

export default function Register() {
  const [idCheck, setIdCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

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
            <button disabled={!(idCheck&&passwordCheck)} >회원가입</button>
          </form>
        </div>
      </section>
    </>
  );
}
