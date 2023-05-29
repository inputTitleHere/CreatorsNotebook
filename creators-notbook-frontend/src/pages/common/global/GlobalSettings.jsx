import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

/**
 * 전역 Style설정 등 웹 페이지 전체에 대한 설정이 필요할 경우 이 컴포넌트에 배치한다.
 * 토큰이 존재하는 경우 자동으로 로그인을 수행한다.
 */
export default function GlobalSettings() {
  const style = useSelector((state) => state.style.style);
  return (
    <div className={style}>
      <Outlet />
    </div>
  );
}
