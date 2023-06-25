import { createSlice } from "@reduxjs/toolkit";

export const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tagMap: {},
    isToggleFilterActive: false,
    tagFilterSet: {}, // Set을 사용할 수 없어서 object의 키 여부로 판단.
    filterMode: "AND", // AND(false) | OR(true) 두가지 방식
  },
  reducers: {
    /**
     * 서버에서 가져온 태그 정보를 store에 저장한다.
     * @param {object} payload tagMap의 Object객체
     */
    saveTagToStore: (state, { payload }) => {
      state.tagMap = payload;
      Object.keys(payload).forEach(
        (tagNo) => (state.tagFilterSet[tagNo] = undefined)
      );
      console.log(payload);
    },
    /**
     * 신규 태그를 store에 저장한다.
     * @param {tagNo,tagData} payload 신규 태그 번호 및 정보
     */
    insertTagToStore: (state, { payload }) => {
      const { tagNo, tagData } = payload;
      state.tagMap[tagNo] = tagData;
    },
    /**
     * 태그를 store에서 삭제한다.
     * @param {number} payload 삭제할 태그 번호
     */
    removeTagFromStore: (state, { payload }) => {
      const { tagNo } = payload;
      delete state.tagMap[tagNo];
    },
    /**
     *
     * @param {boolean} payload 토글여부에 대한 boolean값
     */
    toggleTagFilter: (state, { payload }) => {
      state.isToggleFilterActive = payload;
    },
    setTagFilter: (state, { payload }) => {
      const { tagFilterSet, isToggleFilterActive, filterMode } = payload;
      state.tagFilterSet = tagFilterSet;
      state.isToggleFilterActive = isToggleFilterActive;
      state.filterMode = filterMode;
    },
    addTagToFilter: (state, { payload }) => {
      const tagNo = payload;
      state.tagFilterSet[tagNo] = true;
    },
    removeTagFromFilter: (state, { payload }) => {
      const tagNo = payload;
      delete state.tagFilterSet[tagNo];
    },
    toggleTagMode: (state, { payload }) => {
      state.filterMode = payload;
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
  toggleTagMode,
} = tagSlice.actions;
export default tagSlice.reducer;
