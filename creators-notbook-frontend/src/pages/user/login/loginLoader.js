import { redirect } from "react-router-dom";
import store from "../../../redux-store/configureStore";
import { fetchByUrl } from "../../../utils/fetch";
import { login } from "../../../redux-store/slices/userSlice";

/**
 * 로그인 버튼 클릭시 로컬에 저장된 사용자 토큰을 기반으로 로그인 여부를 설정.
 * @returns 
 */
export default async function loginLoader(){
  const token = localStorage.getItem("token");
  if(!token){
    return null;
  }
  try{
    const parsedToken = JSON.parse(atob(token.split(".")[1]));
    console.log(parsedToken);
    if(parsedToken.exp*1000<Date.now()){
      localStorage.removeItem("token");
      return null;
    }
    // 서버로부터 유저 정보를 받아와 redux에 저장한다.
    const userDto = await fetchByUrl("/user/fromToken","GET");
    store.dispatch(login(userDto));
    return redirect("/dashboard");
  }catch(e){
    localStorage.removeItem("token");
    localStorage.removeItem("rememberMe");
    return null;
  }
}