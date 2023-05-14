/**
 * 입력받은 JWT문자열을 LocalStorage에 token이라는 키로 저장한다.
 * @param {string} jwt : json web token 문자열을 받는다.
 */
export function setJwtToLocalStorage(jwt){
    localStorage.setItem("token",jwt);
}

/**
 * localStorage에서 JWT를 찾아 반환한다.
 * @returns localStorage에서 회수한 JWT을 반환한다.
 */
export function getJwtFromLocalStorage(){
    return localStorage.getItem("token");
}