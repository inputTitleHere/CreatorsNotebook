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
    },
    addAttribute:(state,{payload})=>{
      const {characterIndex, name,data}=payload;
      const character = state.characters[characterIndex];
      character.data[name]=data;
      character.order.push(name);
    },
    removeEditTag:(state,{payload})=>{
      const {characterIndex,name}=payload;
      delete state.characters[characterIndex].data[name].editMode

    }
  },
});

export const { addCharacter,saveCharacterToStore,removeCharacter,addAttribute,removeEditTag } = characterSlice.actions;
export default characterSlice.reducer;
