import { createSlice } from "@reduxjs/toolkit";

/**
 * 로그인한 유저 정보를 전역 보관하는 slice
 */
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
  },
  reducers: {
    // actions of this slice
    login: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = undefined;
    },
    update: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { login, logout, update } = userSlice.actions;
export default userSlice.reducer;
