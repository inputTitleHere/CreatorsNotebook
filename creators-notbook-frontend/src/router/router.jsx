import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/index/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index></Index>
  },
]);
