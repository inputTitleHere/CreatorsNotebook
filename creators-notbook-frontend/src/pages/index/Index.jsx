import { Link } from "react-router-dom";
import Header from "../common/header/Header";
import "./index.scss";

export default function Index() {
  return (
    <div className="index">
      <Header showLoginOption={true} />

      <div className="center-wrapper">
        <h1>창작자를 위한 정보관리 웹 서비스</h1>
        <Link to={"/dashboard"}>
          <div className="center-circle"></div>
        </Link>
      </div>
    </div>
  );
}
