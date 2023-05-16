import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/index/index";
import Register from "../pages/user/register/Register";
import Login from "../pages/user/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import indexLoader from "../pages/index/indexLoader";
import loginLoader from "../pages/user/login/loginLoader";
import GlobalSettings from "../pages/common/global/GlobalSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalSettings />,
    children: [
      {
        path: "/",
        element: <Index/>,
        loader: indexLoader,
        index: true,
      },
      {
        path: "/user",
        children: [
          {
            path: "/user/login",
            element: <Login />,
            loader: loginLoader, // TODO-> User으로 빼내기
          },
          {
            path: "/user/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
    ],
  },
]);
