import { NavLink, Outlet } from "react-router-dom";
import Header from "../../common/header/Header";

export default function MyPage() {

  return (
    <div className="mypage-wrapper">
      <Header />
      <aside className="nav">
        {/* TODO -> 회원 정보 통계 페이지 넣기? */}
        <NavLink to={"/user/mypage/change-info"}>계정정보 수정</NavLink>
        <NavLink to={"/user/mypage/change-password"}>비밀번호 변경</NavLink>
      </aside>
      <Outlet />
    </div>
  )

}