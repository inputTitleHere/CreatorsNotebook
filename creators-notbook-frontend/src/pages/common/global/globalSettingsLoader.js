import store from "../../../redux-store/configureStore";
import { fetchByUrl } from "../../../utils/fetch";
import { getJwtFromStorage } from "../../../utils/userUtil";

/**
 * JWT토큰은 있지만 브라우저로 처음 접속한 경우 서버에서 유저 정보를 로드해온다.
 * 단, 이전 로그인때 '로그인 유지하기'옵션이 켜진 경우로 한정한다.
 * @returns 성공적으로 유저 정보를 받아오면 해당 정보를 반환한다.(GlobalSettings.jsx에서 사용)
 */
export default async function autoLoginLoader() {
  const rememberMe = localStorage.getItem("rememberMe");
  if (rememberMe || sessionStorage.getItem("token")) {
    const token = getJwtFromStorage();
    const userStore = store.getState().user.payload;
    if (token && !userStore) {
      console.log("Token present. loading user data from server");
      return await fetchByUrl("/user/fromToken");
    }
  } else {
    localStorage.removeItem("token");
  }
  return null;
}
