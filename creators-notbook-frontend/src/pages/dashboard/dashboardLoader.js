import { redirect } from "react-router-dom";
import store from "../../redux-store/configureStore";

export default function dashboardLoader(){
  const {user} = store.getState().user;
  console.log(user);
  if(!user){
    return redirect("/user/login");
  }
  return null;
}