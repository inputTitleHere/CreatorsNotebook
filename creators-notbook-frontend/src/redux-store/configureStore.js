import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import styleSlice from "./slices/styleSlice";
import projectSlice from "./slices/projectSlice";
import characterSlice from "./slices/characterSlice";
import tagSlice from "./slices/tagSlice";

const rootReducer = {
  user: userSlice,
  style: styleSlice,
  project: projectSlice,
  character: characterSlice,
  tag: tagSlice,
};

export default configureStore({
  reducer: rootReducer,
});
