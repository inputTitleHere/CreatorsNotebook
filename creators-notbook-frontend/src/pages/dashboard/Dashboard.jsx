import { Outlet } from "react-router-dom";
import Header from "../common/header/Header";

export default function Dashboard() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
