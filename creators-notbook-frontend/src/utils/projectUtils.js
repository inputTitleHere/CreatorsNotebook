import { fetchByUrl } from "./fetch";


export const loadProject = async (uuid) => {
  const projectData = await fetchByUrl("/project/"+uuid,"GET");
  return projectData;
};