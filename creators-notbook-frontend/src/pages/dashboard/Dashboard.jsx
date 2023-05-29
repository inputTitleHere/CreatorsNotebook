import { Navigate, Outlet } from "react-router-dom";
import Header from "../common/header/Header";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      {user ? "" : <Navigate to={"/user/login"} />}
      <Header />
      <Outlet />
    </>
  );
}
