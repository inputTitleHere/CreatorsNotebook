import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import styleSlice from "./slices/styleSlice"


export default configureStore({
  reducer:{
    user : userSlice,
    style: styleSlice,
  }
})