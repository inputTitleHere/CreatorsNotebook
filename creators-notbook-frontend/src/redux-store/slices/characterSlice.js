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
    createCharacter: (state, { payload }) => {
      state.characters.push(payload);
    },
  },
});

export const { createCharacter,saveCharacterToStore } = characterSlice.actions;
export default characterSlice.reducer;
