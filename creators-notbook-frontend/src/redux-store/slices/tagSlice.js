import { createSlice } from "@reduxjs/toolkit";

export const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tagMap: {},
    isToggleFilterActive: false,
    tagFilterSet: {}, // Set을 사용할 수 없어서 object의 키 여부로 판단.
  },
  reducers: {
    saveTagToStore: (state, { payload }) => {
      state.tagMap = payload;
      Object.keys(payload).forEach(
        (tagNo) => (state.tagFilterSet[tagNo] = undefined)
      );
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
    toggleTagFilter: (state, { payload }) => {
      state.isToggleFilterActive = payload;
    },
    setTagFilter: (state, { payload }) => {
      const { tagFilterSet, isToggleFilterActive } = payload;
      state.tagFilterSet = tagFilterSet;
      state.isToggleFilterActive = isToggleFilterActive;
    },
    addTagToFilter: (state, { payload }) => {
      const tagNo = payload;
      state.tagFilterSet[tagNo] = true;
    },
    removeTagFromFilter: (state, { payload }) => {
      const tagNo = payload;
      delete state.tagFilterSet[tagNo];
    },
  },
});

export const {
  saveTagToStore,
  insertTagToStore,
  removeTagFromStore,
  toggleTagFilter,
  setTagFilter,
  addTagToFilter,
  removeTagFromFilter,
} = tagSlice.actions;
export default tagSlice.reducer;
