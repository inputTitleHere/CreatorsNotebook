import { createSlice } from "@reduxjs/toolkit";

/**
 * 전역적인 테마를 지정하는 슬라이스이다.
 */
export const styleSlice = createSlice({
  name: "style",
  initialState: {
    style: localStorage.getItem("style")
      ? (() => {
          return localStorage.getItem("style");
        })()
      : (() => {
          localStorage.setItem("style", "ui-light");
          return "ui-light";
        })(),
  },
  reducers: {
    changeStyle: (state, styleName) => {
      state.style = styleName;
      localStorage.setItem("style", styleName);
    },
  },
});

export const { changeStyle } = styleSlice.actions;
export default styleSlice.reducer;
