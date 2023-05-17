import { Link } from "react-router-dom";

export default function ProjectList(){
  return(
    <div className="project-list">
      <h1>TEMP : project List loads here</h1>
      <Link to={"/dashboard/create-project"}>신규 프로젝트</Link>
    </div>
  )
}