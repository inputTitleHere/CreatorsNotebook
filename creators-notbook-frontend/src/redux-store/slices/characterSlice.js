import { createSlice } from "@reduxjs/toolkit";

/**
 * 로그인한 유저 정보를 전역 보관하는 slice
 */
export const characterSlice = createSlice({
  name: "character",
  initialState: {
    characters: [],
    characterData: {},
  },
  reducers: {
    /**
     * 서버로부터 로드해온 캐릭터 정보를 저장한다.
     * @param {object} payload 서버로부터 가져올 CharacterList 객체
     */
    saveCharacterToStore: (state, { payload }) => {
      const characterList = [];
      const characterMap = {};
      payload.forEach((item) => {
        characterList.push(item.uuid);
        characterMap[item.uuid] = item;
        characterMap[item.uuid].tagList = item.tagList;
      });

      state.characters = characterList;
      state.characterData = characterMap;
    },
    /**
     * 신규 캐릭터 객체를 추가한다.
     * @param {object} payload 신규 캐릭터 객체
     */
    addCharacter: (state, { payload }) => {
      state.characters.push(payload.uuid);
      state.characterData[payload.uuid] = payload;
    },
    /**
     * 캐릭터 UUID를 기반으로 삭제한다.
     * @param {string} payload -> uuid
     */
    removeCharacter: (state, { payload }) => {
      state.characters.splice(state.characters.indexOf(payload), 1);
      delete state.characterData[payload];
    },
    /**
     * 캐릭터 카드 정렬 -> 기본 옵션(모든 캐릭터가 필수적으로 보유)
     * @param {sortMode : string, sortDirection : "asc" | "desc"} payload -> sortMode = 속성명
     */
    sortCharacterDefault: (state, { payload }) => {
      const { sortMode, sortDirection } = payload;
      const charData = state.characterData;
      if (sortMode && sortDirection) {
        if (sortMode.includes("Date")) {
          if (sortDirection === "asc") {
            state.characters.sort((left, right) => {
              return (
                Date.parse(charData[left][sortMode]) -
                Date.parse(charData[right][sortMode])
              );
            });
          } else {
            state.characters.sort((left, right) => {
              return (
                Date.parse(charData[right][sortMode]) -
                Date.parse(charData[left][sortMode])
              );
            });
          }
        }
      }
    },
    /**
     * 캐릭터 카드 정렬 -> data상 존재하는 속성들을 기반으로.
     */
    sortCharacterCustom: (state, { payload }) => {
      const { sortMode, sortDirection } = payload;
      if (sortMode && sortDirection) {
        state.characters.sort((left, right) => {
          let leftData = state.characterData[left].data[sortMode]?.value;
          let rightData = state.characterData[right].data[sortMode]?.value;
          if (leftData && rightData) {
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
     * 캐릭터 속성 신규 추가
     * @param {characterUuid, name, data} payload
     */
    addCharacterAttribute: (state, { payload }) => {
      const { characterUuid, name, data } = payload;
      const character = state.characterData[characterUuid];
      character.data[name] = data;
      character.order.push(name);
    },
    /**
     * 초기 수정태그를 삭제한다.
     * @param {characterUuid, name} payload
     */
    removeEditTag: (state, { payload }) => {
      const { characterUuid, name } = payload;
      delete state.characterData[characterUuid].data[name].editMode;
    },
    updateCharacterAttr: (state, { payload }) => {
      const { characterUuid, name, value } = payload;
      const character = state.characterData[characterUuid];
      character.data[name].value = value;
      character.editDate = new Date().toISOString();
    },
    removeCharacterAttr: (state, { payload }) => {
      const { characterUuid, name } = payload;
      const character = state.characterData[characterUuid];
      delete character.data[name];
      const order = character.order;
      const index = order.indexOf(name);
      if (index > -1) {
        order.splice(index, 1);
      }
      character.editDate = new Date().toISOString();
    },
    renameCharacterAttr: (state, { payload }) => {
      const { characterUuid, oldName, newName } = payload;
      const character = state.characterData[characterUuid];
      console.log({ ...character });
      character.data[oldName].name = newName;
      character.data[newName] = character.data[oldName];
      delete character.data[oldName];
      const order = character.order;
      const index = order.indexOf(oldName);
      if (index > -1) {
        order[index] = newName;
      }
      character.editDate = new Date().toISOString();
    },
    /**
     * 속성 드래그엔 드랍시 순서 변경
     */
    updateCharacterAttrOrder: (state, { payload }) => {
      const { characterUuid, newOrder } = payload;
      const character = state.characterData[characterUuid];
      character.order = newOrder;
      character.editDate = new Date().toISOString();
    },
    setCharacterData: (state, { payload }) => {
      const { characterUuid, charData, charOrder } = payload;
      const character = state.characterData[characterUuid];
      character.editDate = new Date().toISOString();
      character.data = charData;
      character.order = charOrder;
    },
    addCharacterTag: (state, { payload }) => {
      const { characterUuid, tagNo } = payload;
      const character = state.characterData[characterUuid];
      // character.tags.push(tagData);
      character.tagList.push(tagNo);
    },
    removeCharacterTag: (state, { payload }) => {
      const { characterUuid, tagNo } = payload;
      const character = state.characterData[characterUuid];
      character.tagList.splice(character.tagList.indexOf(tagNo), 1);
    },
    removeTagFromAllCharacters: (state, { payload }) => {
      const { tagNo } = payload;
      Object.values(state.characterData).forEach((character) => {
        const index = character.tagList.indexOf(tagNo);
        if (index > -1) {
          character.tagList.splice(index, 1);
        }
      });
    },
  },
});

export const {
  addCharacter,
  saveCharacterToStore,
  removeCharacter,
  addCharacterAttribute,
  removeEditTag,
  updateCharacterAttr,
  removeCharacterAttr,
  renameCharacterAttr,
  sortCharacterDefault,
  sortCharacterCustom,
  updateCharacterAttrOrder,
  setCharacterData,
  addCharacterTag,
  removeCharacterTag,
  removeTagFromAllCharacters,
} = characterSlice.actions;
export default characterSlice.reducer;
