import { Outlet, useNavigate, useParams } from "react-router-dom";
import ProjectHeader from "./components/ProjectHeader";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { loadProject } from "../../utils/projectUtils";
import { useDispatch } from "react-redux";
import { saveProjectToStore } from "../../redux-store/slices/projectSlice";
import { saveCharacterToStore } from "../../redux-store/slices/characterSlice";
/**
 * 프로젝트에 대한 모든 데이터를 서버에서 로딩해온다.
 * 로딩중에는 Spinning을 둔다.
 */
export default function Project() {
  const [isLoading, setIsLoading] = useState(false);
  const { uuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /**
   * 최초 진입시 모든 데이터를 로드한다.
   * 캐릭터 데이터도 로드한다.
   */
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const projectData = await loadProject(uuid);
      if (!projectData) {
        alert("!접근 권한이 없습니다!");
        navigate("/dashboard");
        return;
      }
      dispatch(saveProjectToStore(projectData));
      dispatch(saveCharacterToStore(projectData.characterDtoList))
      console.log("Finished Project Loading in Project.jsx::useEffect");
      console.log(projectData);
      setIsLoading(false);
    })();
  }, [uuid, navigate, dispatch]);

  return (
    <>
      {isLoading ? <LoadingSpinner /> : ""}
      <ProjectHeader />
      <Outlet />
    </>
  );
}
