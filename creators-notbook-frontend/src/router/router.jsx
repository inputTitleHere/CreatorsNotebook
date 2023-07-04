import { createBrowserRouter } from "react-router-dom";
import GlobalSettings from "@src/pages/common/global/GlobalSettings";
import autoLoginLoader from "@src/pages/common/global/globalSettingsLoader";
import Index from "@src/pages/index/Index";
import Login from "@src/pages/user/login/Login";
import loginLoader from "@src/pages/user/login/loginLoader";
import Register from "@src/pages/user/register/Register";
import MyPage from "@src/pages/user/mypage/MyPage";
import ChangeInfo from "@src/pages/user/mypage/changeInfo/ChangeInfo";
import ChangePassword from "@src/pages/user/mypage/changePassword/ChangePassword";
import Dashboard from "@src/pages/dashboard/Dashboard";
import ProjectList from "@src/pages/dashboard/project-list/ProjectList";
import projectListLoader from "@src/pages/dashboard/project-list/projectListLoader";
import ProjectCreate from "@src/pages/dashboard/project-create/ProjectCreate";
import Project from "@src/pages/project/Project";
import MainChapter from "@src/pages/project/Routes/main/MainChapter";
import CharacterChapter from "@src/pages/project/Routes/character/CharacterChapter";
import Unauthorized from "@src/pages/ERROR/Unauthorized";
import dashboardLoader from "@src/pages/dashboard/dashboardLoader";
import ResetPassword from "@src/pages/user/resetPassword/ResetPassword";

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
            loader: loginLoader,
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
                path: "/user/mypage/",
                element: <ChangeInfo />,
                index: true,
              },
              {
                path: "/user/mypage/password",
                element: <ChangePassword />,
              },
            ],
          },
          {
            path: "/user/resetPassword",
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
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
      {
        path: "/project/:uuid",
        element: <Project />,
        children: [
          {
            path: "/project/:uuid",
            element: <MainChapter />,
            index: true,
          },
          {
            path: "/project/:uuid/character",
            element: <CharacterChapter />,
          },
        ],
      },
    ],
    // errorElement:<Unauthorized/>
  },
]);
