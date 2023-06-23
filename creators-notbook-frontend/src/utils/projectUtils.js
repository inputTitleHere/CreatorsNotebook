import { fetchByUrl } from "./fetch";

/**
 * 프로젝트의 정보를 로드해온다.
 * @param {string} uuid 프로젝트 고유 번호
 * @returns
 */
export async function loadProject(uuid) {
  const projectData = await fetchByUrl("/project/" + uuid, "GET");
  return projectData;
}

/**
 * 캐릭터 템플릿 목록을 서버에서 로드해온다.
 * @param {string} uuid 프로젝트 uuid
 * @returns
 */
export async function loadCharacterTemplates(uuid) {
  const params = { projectUuid: uuid };
  const characterTemplates = await fetchByUrl(
    "/characterTemplate/loadTemplate",
    "GET",
    params
  );
  return characterTemplates;
}

/**
 * 현재 프로젝트에 대한 권한을 검증하여 접근가능성에 대한 boolean값을 반환한다.
 * true면 해당 기능에 대해 접근이 가능함을 명시하며 false이면 접근(표시)하지 않도록 한다.
 * 1(CREATOR만 허용), 2(ADMIN까지 허용), 3(MEMBER까지 허용), 4(VIEWER 까지 허용) 순서로 진행.
 * @param {object} projectData 프로젝트 데이터(authority가 포함된 slilce의 데이터 사용)
 * @param {number} checkLevel 확인 레벨 1(CREATOR), 2(ADMIN), 3(MEMBER), 4(VIEWER)
 */
export function checkAuthority(projectData, checkLevel) {
  const auth = projectData?.authority;
  switch (checkLevel) {
    case 4:
      return auth === "CREATOR";
    case 3:
      return auth === "CREATOR" || auth === "ADMIN";
    case 2:
      return auth === "CREATOR" || auth === "ADMIN" || auth === "MEMBER";
    case 1:
      return (
        auth === "CREATOR" ||
        auth === "ADMIN" ||
        auth === "MEMBER" ||
        auth === "VIEWER"
      );
    default:
      return false;
  }
}

/**
 *
 * @param {{mode:string, direction:string}} options 정렬 옵션 -> {sortMode:string, direction:string}
 * @param {Array} projectList 정렬할 프로젝트 배열
 * @return 옵션에 따라 정렬된 배열
 */
export function sortWithOptions(options, projectList) {
  if (!options) {
    return [];
  }
  const { sortBy, direction } = options;
  if (sortBy === "createDate") {
    if (direction === "asc") {
      return projectList.sort(sortByCreateDateAsc);
    } else {
      return projectList.sort(sortByCreateDateDesc);
    }
  }
  if (sortBy === "editDate") {
    if (direction === "asc") {
      return projectList.sort(sortByEditDateAsc);
    } else {
      return projectList.sort(sortByEditDateDesc);
    }
  }
  return projectList;
}

function sortByCreateDateAsc(left, right) {
  return new Date(left.createDate) - new Date(right.createDate);
}
function sortByCreateDateDesc(left, right) {
  return new Date(right.createDate) - new Date(left.createDate);
}

function sortByEditDateAsc(left, right) {
  return new Date(left.editDate) - new Date(right.editDate);
}

function sortByEditDateDesc(left, right) {
  return new Date(right.editDate) - new Date(left.editDate);
}
