import { createSlice } from "@reduxjs/toolkit";

/**
 * 로그인한 유저 정보를 전역 보관하는 slice
 */
export const characterTemplateSlice = createSlice({
  name: "characterTemplate",
  initialState: {
    template:[]
  },
  reducers: {
    /**
     * 서버에서 가져온 템플릿 데이터를 저장한다.
     * @param {Array} payload : characterTemplateDto의 배열
     */
    saveCharacterTemplateToStore: (state, { payload }) => {
      console.log([...payload]);
      state.template=payload;
    },
  },
});


export const { saveCharacterTemplateToStore } = characterTemplateSlice.actions;
export default characterTemplateSlice.reducer;
