import { useState } from "react";
import PropTypes from "prop-types";

RegisterUserNicknameComponent.propTypes = {
  setState: PropTypes.func,
};

export default function RegisterUserNicknameComponent({ setState }) {
  const [message, setMessage] = useState("");
  const handleNicknameChange = (event) => {
    const nickname = event.target.value;
    if (nickname.length === 0) {
      setState(false);
      setMessage("");
      return;
    }
    if (/^[0-9ㄱ-ㅎ가-힣a-zA-Z-_]+$/.test(nickname)) {
      setState(true);
      setMessage("");
    }else{
      setState(false);
      setMessage("닉네임은 한글, 숫자, 영어, 대쉬(-)와 언더스코어(_)를 제외하고 사용이 불가합니다.");
    }
  };

  return (
    <>
      <label className="major-input" htmlFor="nickname">
        닉네임
      </label>
      <input
        className="major-input"
        type="text"
        name="nickname"
        id="nickname"
        onChange={handleNicknameChange}
      />
      <div className="error-message">{message}&nbsp;</div>
    </>
  );
}
