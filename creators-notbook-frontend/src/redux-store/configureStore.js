import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import styleSlice from "./slices/styleSlice";
import projectSlice from "./slices/projectSlice";
import characterSlice from "./slices/characterSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    style: styleSlice,
    project: projectSlice,
    character: characterSlice,
  },
});
