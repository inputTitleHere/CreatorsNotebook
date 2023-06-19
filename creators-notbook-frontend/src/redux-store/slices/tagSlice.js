import { createSlice } from "@reduxjs/toolkit";

export const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tagMap: {},
  },
  reducers: {
    saveTagToStore: (state, { payload }) => {
      state.tagMap = payload;
      console.log(payload);
    },
    insertTagToStore: (state, { payload }) => {
      const { tagNo, tagData } = payload;
      state.tagMap[tagNo] = tagData;
    },
    removeTagFromStore: (state, { payload }) => {
      const { tagNo } = payload;
      delete state.tagMap[tagNo];
    },
  },
});

export const { saveTagToStore, insertTagToStore, removeTagFromStore } =
  tagSlice.actions;
export default tagSlice.reducer;
