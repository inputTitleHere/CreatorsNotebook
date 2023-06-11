import { createSlice } from "@reduxjs/toolkit";
import { sortOptions } from "../../utils/characterUtils";

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
    /**
     * 캐릭터 카드 정렬 -> 기본 옵션(모든 캐릭터가 필수적으로 보유)
     */
    sortCharacterDefault: (state, { payload }) => {
      const { sortMode, sortDirection } = payload;
      if (sortMode && sortDirection) {
        state.characters.sort(sortOptions[sortMode][sortDirection]);
      }
    },
    /**
     * 캐릭터 카드 정렬 -> data상 존재하는 속성들을 기반으로.
     */
    sortCharacterCustom: (state, { payload }) => {
      const { sortMode, sortDirection } = payload;
      if (sortMode && sortDirection) {
        state.characters.sort((left, right) => {
          let leftData = left[sortMode];
          let rightData = right[sortMode];
          if (left[sortMode] && right[sortMode]) {
            // 데이터 둘다 있는경우
            if (typeof leftData === typeof rightData) {
              if (typeof leftData === "string") {
                if (sortDirection === "asc") {
                  return leftData.localeCompare(rightData);
                } else {
                  return rightData.localeCompare(leftData);
                }
              } else {
                if (sortDirection === "asc") {
                  return leftData - rightData;
                } else {
                  return rightData - leftData;
                }
              }
            } else {
              if (typeof leftData === "number") {
                leftData = leftData.toString();
              }
              if (typeof rightData === "number") {
                rightData = rightData.toString();
              }
              if (sortDirection === "asc") {
                return leftData.localeCompare(rightData);
              } else {
                return rightData.localeCompare(leftData);
              }
            }
          } else if (!leftData && rightData) {
            // 좌측 데이터가 없는 경우
            return 1;
          } else if (leftData && !rightData) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    },
    /**
     * 캐릭터 속성 CRUD
     */
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
      charData[oldName].name = newName;
      charData[newName] = charData[oldName];
      delete charData[oldName];
      const order = state.characters[characterIndex].order;
      const index = order.indexOf(oldName);
      if (index > -1) {
        order[index] = newName;
      }
    },
    /**
     * 속성 드래그엔 드랍시 순서 변경
     */
    updateCharacterAttrOrder: (state, { payload }) => {
      const {characterIndex, newOrder} = payload;
      state.characters[characterIndex].order=newOrder;
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
  sortCharacterDefault,
  sortCharacterCustom,
  updateCharacterAttrOrder,
} = characterSlice.actions;
export default characterSlice.reducer;
