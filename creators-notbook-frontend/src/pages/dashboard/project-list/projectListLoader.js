import { fetchByUrl } from "../../../utils/fetch";

export default async function projectListLoader() {
  const projectData = await fetchByUrl("/project/","GET");
  console.log(projectData);
  return projectData;
}
