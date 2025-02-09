import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// 管理所有專案用，不包含專案內部

export const fetchProjects = createAsyncThunk(
    "projects/fetchProjects",
    async () => {
        const response = await fetch("https://sideproject-production-f126.up.railway.app/project", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            // mode: 'no-cors',
        }); // 換成 API
        const data = await response.json();
        console.log("抓取所有資料");
        return data; // payload
    }
)

export const addProject = createAsyncThunk(
    "project/addProject",
    async (projectInfo) => {
        const response = await fetch("https://sideproject-production-f126.up.railway.app/addProject",{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: projectInfo,
        });
        const data = await response.json();
        return data;
    }
)

export const deleteProject = createAsyncThunk(
    "project/deleteProject",
    async () => {
        const response = await fetch("");
        const data = await response.json();
        return data;
    }
)

export const projectsSlice = createSlice({
    name: 'projects',
    initialState:{
        projects: [],
        status: "idle",
        errorMessage: "",
        projectNow:{},
    },
    reducers:{
        setProjectNow: (state,action) =>{
            state.projectNow = action.payload
        }
        // 新增專案
        // addProject: (state, action) => {
        //     state.projects.push(action.payload);
        //     // 調刪掉的 API
        // },
        // deleteProject: (state, action) => {
        //     state.projects.slice(action.payload,1);
        // }
    },
    extraReducers: (builder) => { // 🔹 定義非同步 reducers
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.status = "loading"; // 🔹 API 請求開始，狀態變為 loading
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.projects = action.payload; // 🔹 更新專案資料
                // console.log(action.payload)
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.error.message; // 🔹 設定錯誤訊息
            });

        builder
            .addCase(addProject.pending, (state) => {
                state.status = "loading"; // 🔹 API 請求開始，狀態變為 loading
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.projects = action.payload; // 🔹 更新專案資料
            })
            .addCase(addProject.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.error.message; // 🔹 設定錯誤訊息
            });

        builder
            .addCase(deleteProject.pending, (state) => {
                state.status = "loading"; // 🔹 API 請求開始，狀態變為 loading
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.projects = action.payload; // 🔹 更新專案資料
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.error.message; // 🔹 設定錯誤訊息
            });
    }
})

export const {setProjectNow} = projectsSlice.actions;
export default projectsSlice.reducer;
// export const { , deleteProject } = projectsSlice.actions;
