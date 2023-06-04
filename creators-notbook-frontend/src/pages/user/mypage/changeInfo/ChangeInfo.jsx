import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchByForm } from "../../../../utils/fetch";
import { update } from "../../../../redux-store/slices/userSlice";
import RegisterUserNicknameComponent from "../../register/components/RegisterUserNicknameComponent";

export default function ChangeInfo() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const [showPassword, setShowPassword] = useState(false)
  const [nicknameState, setNicknameState] = useState(false);
  /**
   * 비밀번호 가시성 토글 메소드
   */
  const handlePasswordView = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit=async(event)=>{
    event.preventDefault();
    const response = await fetchByForm("/user/changeUserInfo","POST",event.target);
    if(response.data){
      alert("계정 정보가 수정되었습니다.");
      dispatch(update(response.data));
    }else{
      alert("비밀번호가 틀렸습니다.");
    }
  }

  return (
    <div className="change-info-wrapper">
      히에에엑
      <h2>계정 정보 변경</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input type="text" name="email" id="email" value={userData.email} readOnly />
        <RegisterUserNicknameComponent setState={setNicknameState} defaultValue={userData.nickname}/>
        <label htmlFor="password">기존 비밀번호</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          required
        />
        <button type="button" onClick={handlePasswordView}>비밀번호 보기</button>
        <button disabled={!nicknameState}>변경하기</button>
      </form>
    </div>
  )
}