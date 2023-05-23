import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/index/index";
import Register from "../pages/user/register/Register";
import Login from "../pages/user/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import loginLoader from "../pages/user/login/loginLoader";
import GlobalSettings from "../pages/common/global/GlobalSettings";
import autoLoginLoader from "../pages/common/global/globalSettingsLoader";
import ProjectList from "../pages/dashboard/project-list/ProjectList";
import ProjectCreate from "../pages/dashboard/project-create/ProjectCreate";
import projectListLoader from "../pages/dashboard/project-list/projectListLoader";
import MyPage from "../pages/user/mypage/MyPage";
import ChangeInfo from "../pages/user/mypage/changeInfo/ChangeInfo";
import ChangePassword from "../pages/user/mypage/changePassword/ChangePassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalSettings />,
    loader: autoLoginLoader,
    children: [
      {
        path: "/",
        element: <Index />,
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
          {
            path: "/user/mypage",
            element: <MyPage />,
            children: [
              {
                path: "/user/mypage/change-info",
                element: <ChangeInfo />,
                index: true,
              },
              {
                path: "/user/mypage/change-password",
                element: <ChangePassword />,
              },
            ],
          },
        ],
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "/dashboard",
            element: <ProjectList />,
            loader: projectListLoader,
            index: true,
          },
          {
            path: "/dashboard/create-project",
            element: <ProjectCreate />,
          },
        ],
      },
    ],
  },
]);
