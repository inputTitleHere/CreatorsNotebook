import { Button } from "@mui/material";
import { fetchByForm } from "../../../utils/fetch";
import ProjectImageInput from "./components/ProjectImageInput";
import ProjectTextInput from "./components/ProjectTextInput";
import "./projectCreate.scss";
import { Link } from "react-router-dom";
/**
 * 신규 프로젝트를 생성하는 페이지이다.
 * 프로젝트 제목, 설명, 이미지를 Form으로 올린다.
 * 추가적으로 브릿지 생성을 위해 유저 번호를 같이 전달한다.
 * 프로젝트 생성과 동시에 유저-프로젝트 브릿지에 생성자를 등록한다.
 *
 */
export default function ProjectCreate() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!event.target.title.value) {
      alert("프로젝트 제목을 입력하셔야 합니다!");
      return false;
    }
    if (!event.target.description.value) {
      alert("프로젝트 설명을 입력해주세요!");
      return false;
    }
    const response = await fetchByForm("/project/new", "POST", event.target);
    console.log(response);
    // TODO -> 해당 신규 프로젝트 화면으로 이동하기
  };

  return (
    <div className="create-project-wrapper">
      <Link to={".."}>
        <Button
          variant="outlined"
          color="warning"
          sx={{
            position: "absolute",
            right: "0px",
            fontSize:"1.2em"
          }}
        >
          취소
        </Button>
      </Link>
      <h1>신규 프로젝트 생성하기</h1>
      <div className="separate">
        <div className="liner">
          <div className="diagonal"></div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <ProjectTextInput />
          <ProjectImageInput />
        </div>
        <div className="submit-button">
          <button>신규 프로젝트 생성</button>
        </div>
      </form>
    </div>
  );
}
