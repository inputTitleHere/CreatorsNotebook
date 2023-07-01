/**
 * 입력받은 JWT문자열을 LocalStorage에 token이라는 키로 저장한다.
 * @param {string} jwt : json web token 문자열을 받는다.
 * @param {boolean} rememberMe - 기억여부 boolean -> 로컬 또는 세션으로 구분
 */
export function setJwtToStorage(jwt, rememberMe) {
  if (rememberMe) localStorage.setItem("token", jwt);
  else sessionStorage.setItem("token", jwt);
}

/**
 * localStorage, 또는 sessionStorage에서 JWT를 찾아 반환한다.
 * @returns localStorage에서 회수한 JWT을 반환한다.
 */
export function getJwtFromStorage() {
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }
  return token;
}

/**
 * local, session의 Storage에서 JWT를 삭제한다.
 */
export function removeJwtFromStorage() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
}

/* source = https://mui.com/material-ui/react-avatar/ */
/**
 * 사용자의 닉네임 이름을 바탕으로 특정한 색상을 생성해낸다.
 * 생성된 색상은 Hex문자열 6글자이다.
 * @param {string} string 사용자 닉네임
 * @returns Hex문자열
 */
export function stringToColor(string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
