import { useSelector } from "react-redux";
import { Outlet, useLoaderData } from "react-router-dom";

/**
 * 전역 Style설정 등 웹 페이지 전체에 대한 설정이 필요할 경우 이 컴포넌트에 배치한다.
 */
export default function GlobalSettings() {
  // const style = useLoaderData();
  const style = useSelector((state)=>state.style.style);
  console.log(style);


  return (
    <div className={style}> 
      <Outlet />
    </div>
  );
}
