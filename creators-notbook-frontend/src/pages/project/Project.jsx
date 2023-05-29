import { Outlet, useNavigate, useParams } from "react-router-dom";
import ProjectHeader from "./components/ProjectHeader";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { loadProject } from "../../utils/projectUtils";
/**
 * 프로젝트에 대한 모든 데이터를 서버에서 로딩해온다.
 * 로딩중에는 Spinning을 둔다.
 */
export default function Project() {
  const [isLoading, setIsLoading] = useState(false);
  const { uuid } = useParams();
  const navigate = useNavigate();
  /**
   * 최초 진입시 모든 데이터를 로드한다.
   */
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const projectData = await loadProject(uuid);
      console.log(projectData);
      if(!projectData.data){
        alert("!접근 권한이 없습니다!");
        navigate("/dashboard");
      }
      // TODO -> ReduxStore에 데이터 넣기.
      setIsLoading(false);
    })();
  }, [uuid,navigate]);

  return (
    <>
      {isLoading ? <LoadingSpinner /> : ""}
      <ProjectHeader />
      <div className="project-main">
        hallo ima projecyto
        <Outlet />
      </div>
    </>
  );
}
