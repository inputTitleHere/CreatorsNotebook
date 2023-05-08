import PropTypes from "prop-types";
import { useState } from "react";

EmailComponent.propTypes = {
  setState: PropTypes.func,
};

/**
 * 이메일 입력에 대한 컴포넌트.
 * 이메일 확인 버튼을 통해 서버와 통신, 사용가능한 이메일인지 확인
 * @param {setState:func} param0 
 * @returns 
 */
export default function EmailComponent({ setState }) {
  const [message,setMessage] = useState("");
  const checkDuplcateEmail = () => {
    // TODO 
    // for now it returns true;
    const tempResult = true;
    if(tempResult){
      setState(true);
      setMessage("사용가능한 이메일입니다.")
    }else{
      setMessage("중복된 이메일 입니다.")
    }
  };

  const resetEmailCheckState=()=>{
    setState(false);
  }

  return (
    <>
      <label className="major-input" htmlFor="email">
        이메일
      </label>
      <div className="input-wrapper">
        <input className="major-input" type="text" name="email" id="email" onChange={resetEmailCheckState}/>
        <button type="button" onClick={checkDuplcateEmail}>
          중복확인
        </button>
      </div>
      <div className="error-message">
        {message}&nbsp;
      </div>
    </>
  );
}

