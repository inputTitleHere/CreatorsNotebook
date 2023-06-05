import { createSlice } from "@reduxjs/toolkit";

/**
 * 로그인한 유저 정보를 전역 보관하는 slice
 */
export const characterSlice = createSlice({
  name: "character",
  initialState: {
    characters: [],
  },
  reducers: {
    saveCharacterToStore: (state, { payload }) => {
      state.characters = payload;
    },
    addCharacter: (state, { payload }) => {
      state.characters.push(payload);
    },
    /**
     * 인덱스 번호로 삭제
     */
    removeCharacter:(state,{payload})=>{
      state.characters.splice(payload,1);
    }
  },
});

export const { addCharacter,saveCharacterToStore,removeCharacter } = characterSlice.actions;
export default characterSlice.reducer;
