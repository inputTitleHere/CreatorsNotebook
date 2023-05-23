import { Link, useNavigate } from "react-router-dom";
import { removeJwtFromStorage } from "../../../../utils/userUtil";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux-store/slices/userSlice";
import { object } from "prop-types";

UserInfoComponent.propTypes={
  data:object
}

export default function UserInfoComponent({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /**
   * 이메일 정보에서 LocalParts를 추출합니다.
   * @param {string} email
   * @returns 추출된 LocalPart 문자열
   */
  const getEmailLocal = (email) => {
    return email.substring(0, email.indexOf("@"));
  };

  /**
   * 사용자를 로그아웃 처리하고 JWT 삭제 및 slice에서 정보를 지운 이후 메인페이지로 이동.
   */
  const logoutUser=()=>{
    removeJwtFromStorage();
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className="user-info-component">
       <Link to={"/user/mypage"} >
        <div className="icon"> TEMP </div>
        <div className="user-info">
          <div className="user-name">{data.nickname}</div>
          <div className="user-email">{getEmailLocal(data.email)}</div>
        </div>
      </Link>
      <div className="logout">
        <a href="#" onClick={logoutUser}>로그아웃</a>
      </div>
    </div>
  );
}
