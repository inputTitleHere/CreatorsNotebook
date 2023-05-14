import { createSlice } from "@reduxjs/toolkit";

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
    },
  },
});

export const {login,logout} = userSlice.actions;
export default userSlice.reducer;
