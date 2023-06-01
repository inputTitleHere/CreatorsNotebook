import { createSlice } from "@reduxjs/toolkit";

/**
 * 로그인한 유저 정보를 전역 보관하는 slice
 */
export const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: undefined,
    characters: [],
  },
  reducers: {
    /**
     * 서버에서 가져온 프로젝트 데이터를 저장한다.
     * @param {object} state
     * @param {object} projectData
     */
    saveProjectToStore: (state, {payload}) => {
      createProject(state,payload);
      state.characters = payload.characterDtoList;
    },
    updateProject: (state, {payload}) => {
      createProject(state,payload);
    },
  },
});

function createProject(state, payload){
  state.project = {
    uuid:payload.uuid,
    authority: payload.authority,
    title:payload.title,
    description: payload.description,
    createDate: payload.createDate,
    editDate:payload.editDate,
    openToPublic:payload.openToPublic,
    image:payload.image
  };
}


export const { saveProjectToStore, updateProject, } = projectSlice.actions;
export default projectSlice.reducer;
