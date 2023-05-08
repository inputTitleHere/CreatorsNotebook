import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/index/index";
import Register from "../pages/user/register/Register";
import Login from "../pages/user/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index></Index>,
  },
  {
    path:"/user",
    children:[
      {path:"/user/login",element:<Login/>},
      {path:"/user/register",element:<Register/>}
    ]
  },
]);
