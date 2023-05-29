import { createSlice } from "@reduxjs/toolkit";

/**
 * 로그인한 유저 정보를 전역 보관하는 slice
 */
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user : undefined
  },
  reducers: {
    // actions of this slice
    login: (state, userData) => {
      state.user = userData;
    },
    logout : (state)=>{
      state.user = undefined;
    },update:(state,userData)=>{
      state.user = userData;
    }
  },
});

export const {login,logout,update} = userSlice.actions;
export default userSlice.reducer;
