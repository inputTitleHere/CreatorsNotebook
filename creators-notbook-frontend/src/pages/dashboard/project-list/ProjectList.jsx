import { Link, useLoaderData } from "react-router-dom";
import "./projectList.scss";
import ProjectItemComponent from "./components/ProjectItemComponent";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function ProjectList() {
  const projectData = useLoaderData();

  return (
    <div className="project-list">
      <header>
        <div className="left">
          <h1>프로젝트 목록</h1>
        </div>
        <div className="right">
          <Link
            to={"/dashboard/create-project"}
          >
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                textDecoration: "none",
                color: "primary",
                fontSize:"1.2em",
                borderRadius:"10px",
                fontWeight:"Bold"
              }}
            >
              신규 프로젝트
            </Button>
          </Link>
        </div>
      </header>
      <div className="project-item-wrapper">
        {projectData.length>0 ? (
          projectData.map((item, index) => {
            return <ProjectItemComponent data={item} key={index} />;
          })
        ) : (
          <div>
            <h2>
              아직 프로젝트가 없네요! 우상단의 <span>신규 프로젝트 생성</span>을
              통해 새로운 세계를 펼쳐보아요!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
