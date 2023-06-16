import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import RegisterPasswordComponent from "../../register/components/RegisterPasswordComponent";
import { fetchByForm } from "../../../../utils/fetch";


export default function ChangePassword() {
  const userData = useSelector((state) => state.user.user);
  const formRef = useRef(null);
  const [newPasswordUsable, setNewPasswordUsable] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [originalPassword, setOriginalPassword] = useState("");
  /**
   * 비밀번호를 변경하는 기능을 수행하는 메소드
   * @param {object} event 비밀번호 변경 클릭시 넘어오는 이벤트 객체
   */
  const handleChangePassword = async(event) => {
    event.preventDefault();
    const response = await fetchByForm("/user/changePassword", "POST", event.target);
    console.log(response);
    if(response.data){
      formRef.current.reset();
      alert("비밀번호가 변경되었습니다.");
    }else{
      alert("비밀번호가 틀렸습니다.");
    }
  }

  /**
   * 모든 비밀번호를 보이게 또는 보이지 않게 한다.
   */
  const handlePasswordView = () => {
    setShowPassword(!showPassword);
  }

  const handleOriginalPasswordChange = (event) => {
    setOriginalPassword(event.target.value);
  }

  return (
    <div className="change-password-wrapper">
      <form onSubmit={handleChangePassword} ref={formRef}>
        <label htmlFor="email">이메일</label>
        <input type="text" name="email" id="email" value={userData.email} readOnly />
        <label htmlFor="original-password">기존 비밀번호</label>
        <input
          type={showPassword ? "text" : "password"}
          name="originalPassword"
          id="original-password"
          onChange={handleOriginalPasswordChange}
        />
        <button type="button" onClick={handlePasswordView}>비밀번호 보기</button>
        <div className="new-password">
          <h2>신규 비밀번호</h2>
          <RegisterPasswordComponent setState={setNewPasswordUsable} />
        </div>
        <button disabled={!(newPasswordUsable && originalPassword.length > 0)}>변경하기</button>
      </form>
    </div>
  )
}