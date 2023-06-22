import { createSlice } from "@reduxjs/toolkit";

/**
 * 로그인한 유저 정보를 전역 보관하는 slice
 */
export const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: undefined,
    projectSortOptions: {
      sortBy: "",
      direction: "",
    },
  },
  reducers: {
    /**
     * 서버에서 가져온 프로젝트 데이터를 저장한다.
     * @param {object} state
     * @param {object} projectData
     */
    saveProjectToStore: (state, { payload }) => {
      createProject(state, payload);
    },
    /**
     * 프로젝트 데이터를 갱신한다.
     * @param {object} state 이전 상태(기본 전달됨)
     * @param {object} payload 신규 프로젝트 데이터
     */
    updateProject: (state, { payload }) => {
      createProject(state, payload);
    },
    /**
     *
     * @param {{sortBy : string, direction : "asc" | "desc"}} payload
     */
    setProjectSortOption: (state, { payload }) => {
      state.projectSortOptions=payload;
      localStorage.setItem("pso",JSON.stringify(payload));
    },
  },
});

function createProject(state, payload) {
  state.project = {
    uuid: payload.uuid,
    authority: payload.authority,
    title: payload.title,
    description: payload.description,
    createDate: payload.createDate,
    editDate: payload.editDate,
    openToPublic: payload.openToPublic,
    image: payload.image,
  };
}

export const { saveProjectToStore, updateProject, setProjectSortOption } =
  projectSlice.actions;
export default projectSlice.reducer;
