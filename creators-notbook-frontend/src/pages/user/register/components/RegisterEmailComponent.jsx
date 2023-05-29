import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { fetchByUrl } from "../../../../utils/fetch";

RegisterEmailComponent.propTypes = {
  setState: PropTypes.func,
};

/**
 * 이메일 입력에 대한 컴포넌트.
 * 이메일 확인 버튼을 통해 서버와 통신, 사용가능한 이메일인지 확인
 * @param {setState:func} param0
 * @returns
 */
export default function RegisterEmailComponent({ setState }) {
  const [passState, setPassState] = useState(null);
  const emailInputRef = useRef(null);
  const [emailCheckButtonToggle, setEmailCheckButtonToggle] = useState(true);
  const checkIfEmailUsable = async () => {
    const emailData = {
      [emailInputRef.current.name]: emailInputRef.current.value,
    };
    const emailUsable = await fetchByUrl("/user/checkIfEmailUsable", "GET",emailData);
    if (emailUsable.data) {
      setState(true);
      setPassState(true);
    } else {
      setState(false);
      setPassState(false);
    }
  };

  const handleEmailChange = (event) => {
    setState(false);
    setPassState(null);
    if (event.target.value.includes("@")) {
      setEmailCheckButtonToggle(false);
    } else {
      setEmailCheckButtonToggle(true);
    }
  };

  return (
    <>
      <label className="major-input" htmlFor="email">
        이메일
      </label>
      <div className="input-wrapper">
        <input
          className="major-input"
          type="text"
          name="email"
          id="email"
          onChange={handleEmailChange}
          ref={emailInputRef}
        />
        <button type="button" onClick={checkIfEmailUsable} disabled={emailCheckButtonToggle}>
          중복확인
        </button>
      </div>
      <div className={"error-message " + (passState && "pass")}>
        {passState !== null && (passState ? "사용가능한 이메일입니다." : "중복된 이메일 입니다.")}
        &nbsp;
      </div>
    </>
  );
}
