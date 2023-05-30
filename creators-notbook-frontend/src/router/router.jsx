import { createBrowserRouter } from "react-router-dom";
import GlobalSettings from "../pages/common/global/GlobalSettings";
import autoLoginLoader from "../pages/COMMON/global/globalSettingsLoader";
import Index from "../pages/INDEX/Index";
import Login from "../pages/USER/login/Login";
import loginLoader from "../pages/USER/login/loginLoader";
import Register from "../pages/USER/register/Register";
import MyPage from "../pages/user/mypage/MyPage";
import ChangeInfo from "../pages/user/mypage/changeInfo/ChangeInfo";
import ChangePassword from "../pages/user/mypage/changePassword/ChangePassword";
import Dashboard from "../pages/DASHBOARD/Dashboard";
import ProjectList from "../pages/dashboard/project-list/ProjectList";
import projectListLoader from "../pages/dashboard/project-list/projectListLoader";
import ProjectCreate from "../pages/DASHBOARD/project-create/ProjectCreate";
import Project from "../pages/PROJECT/Project";
import MainChapter from "../pages/PROJECT/Routes/main/MainChapter";
import CharacterChapter from "../pages/PROJECT/Routes/character/CharacterChapter";

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
        element: <Dashboard/>,
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
        path:"/project/:uuid",
        element:<Project/>,
        children:[
          {
            path:"/project/:uuid",
            element:<MainChapter/>,
            index:true
          },
          {
            path:"/project/:uuid/character",
            element:<CharacterChapter/>
          }
        ]
      }
    ],
  },
]);
