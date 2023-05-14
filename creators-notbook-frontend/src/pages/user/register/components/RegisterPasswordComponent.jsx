import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

RegisterPasswordComponent.propTypes = {
  setState: PropTypes.func,
};

/**
 * 비밀번호 영역(비밀번호 입력 및 확인)에 대한 컴포넌트 입니다.
 * 비밀번호 조건(영문, 숫자, 특수문자 포함 8자 이상)과 비밀번호와 확인입력이 동일한지 체크합니다.
 * 비밀번호 보기 토글 버튼
 * @param {setState:func} param0 
 * @returns 
 */
export default function RegisterPasswordComponent({ setState }) {
  const passwordRef = useRef(null);
  const passwordMatchRef = useRef(null);
  const [passwordCheck, setPasswordCheck] = useState(undefined);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (passwordCheck && passwordMatch) {
      setState(true);
    } else {
      setState(false);
    }
  }, [passwordCheck, passwordMatch, setState]);

  const valdatePassword = (event) => {
    if(passwordMatchRef.current.value.length>0){
      setPasswordMatch(false);
    }
    const password = event.target.value;
    if (password.length > 0) {
      if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*\-=^_#+?~&])[A-Za-z\d$@$_!\-=^+=~%*#?&]{8,}$/.test(
          password
        )
      ) {
        setPasswordMessage("");
        setPasswordCheck(true);
      } else {
        setPasswordCheck(false);
        setPasswordMessage(
          "비밀번호는 영문, 숫자, 특수문자를 포함해 8글자 이상이 되어야 합니다."
        );
      }
    }
  };

  const checkPasswordMatch = (event) => {
    const passwordCheck = event.target.value;
    if(passwordCheck.length===0){
      setPasswordMatch(undefined);
      return;
    }
    if (passwordCheck === passwordRef.current.value) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const togglePasswordVisibility=()=>{
    setShowPassword(!showPassword);
  }

  return (
    <>
      <label className="major-input" htmlFor="password">
        비밀번호
      </label>
      <input
        className="major-input"
        type={showPassword?"text":"password"}
        name="password"
        id="password"
        onChange={valdatePassword}
        ref={passwordRef}
      />
      <button type="button" onClick={togglePasswordVisibility}> 비밀번호 보기 </button>
      <div className="error-message">{passwordMessage}&nbsp;</div>
      <label className="major-input" htmlFor="password-check">
        비밀번호 확인
      </label>
      <input
        className="major-input"
        type="password"
        id="password-check"
        onChange={checkPasswordMatch}
        ref={passwordMatchRef}
      />
      <div className="error-message">{passwordMatch===false && "위의 비밀번호와 동일하게 입력해주세요."}&nbsp;</div>
    </>
  );
}
