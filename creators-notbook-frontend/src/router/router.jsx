import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/index/index";
import Register from "../pages/user/register/Register";
import Login from "../pages/user/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";

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
  {
    path:"/dashboard",
    element:<Dashboard></Dashboard>
  },
]);
