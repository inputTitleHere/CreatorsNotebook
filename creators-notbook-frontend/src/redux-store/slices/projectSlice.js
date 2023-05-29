import { createSlice } from "@reduxjs/toolkit";

/**
 * 로그인한 유저 정보를 전역 보관하는 slice
 */
export const userSlice = createSlice({
  name: "project",
  initialState: {
    project : undefined,
    characters:[]
  },
  reducers: {
    /**
     * 서버에서 가져온 프로젝트 데이터를 저장한다.
     * @param {object} state 
     * @param {object} projectData 
     */
    loadProject:(state, projectData)=>{
      state.project = projectData.project;
      state.characters = projectData.characters;
    },
    updateProject:(state, project)=>{
      state.project = project;
    },

  },
});

export const {login,logout,update} = userSlice.actions;
export default userSlice.reducer;
