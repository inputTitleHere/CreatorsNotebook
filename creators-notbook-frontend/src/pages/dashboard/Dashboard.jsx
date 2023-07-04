import { Outlet } from "react-router-dom";
import Header from "@src/pages/common/header/Header";

export default function Dashboard() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
