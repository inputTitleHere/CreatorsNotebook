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
    removeCharacter: (state, { payload }) => {
      state.characters.splice(payload, 1);
    },
    addCharacterAttribute: (state, { payload }) => {
      const { characterIndex, name, data } = payload;
      const character = state.characters[characterIndex];
      character.data[name] = data;
      character.order.push(name);
    },
    removeEditTag: (state, { payload }) => {
      const { characterIndex, name } = payload;
      delete state.characters[characterIndex].data[name].editMode;
    },
    updateChracterAttr: (state, { payload }) => {
      const { characterIndex, name, value } = payload;
      state.characters[characterIndex].data[name].value = value;
    },
    removeCharacterAttr: (state, { payload }) => {
      const { characterIndex, name } = payload;
      delete state.characters[characterIndex].data[name];
      const order = state.characters[characterIndex].order;
      const index = order.indexOf(name);
      if (index > -1) {
        order.splice(index, 1);
      }
    },
    renameCharacterAttr: (state, { payload }) => {
      const { oldName, newName, characterIndex } = payload;
      const charData = state.characters[characterIndex].data;
      charData[oldName].name=newName;
      charData[newName] = charData[oldName];
      delete charData[oldName];
      const order = state.characters[characterIndex].order;
      const index = order.indexOf(oldName);
      if (index > -1) {
        order[index]=newName;
      }
    },
  },
});

export const {
  addCharacter,
  saveCharacterToStore,
  removeCharacter,
  addCharacterAttribute,
  removeEditTag,
  updateChracterAttr,
  removeCharacterAttr,
  renameCharacterAttr,
} = characterSlice.actions;
export default characterSlice.reducer;
