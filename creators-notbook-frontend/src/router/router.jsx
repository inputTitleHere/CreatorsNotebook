import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/index/index";
import Register from "../pages/user/register/Register";
import Login from "../pages/user/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import indexLoader from "../pages/index/indexLoader";
import loginLoader from "../pages/user/login/loginLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index></Index>,
    loader: indexLoader,
  },
  {
    path: "/user",
    children: [
      {
        path: "/user/login",
        element: <Login />,
        loader: loginLoader,
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
]);
