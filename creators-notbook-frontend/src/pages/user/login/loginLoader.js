import { redirect } from "react-router-dom";

export default function loginLoader(){
  const token = localStorage.getItem("token");
  if(!token){
    return null;
  }
  try{
    const parsedToken = JSON.parse(atob(token.split(".")[1]));
    if(parsedToken.exp*1000<Date.now()){
      localStorage.removeItem("token");
      return null;
    }
    return redirect("/dashboard");
  }catch(e){
    localStorage.removeItem("token");
    localStorage.removeItem("rememberMe");
    return null;
  }
}