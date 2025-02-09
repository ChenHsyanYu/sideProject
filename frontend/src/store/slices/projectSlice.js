import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// 管理所有專案用，不包含專案內部
const header =  { 'Content-Type': 'application/json' }

export const fetchAllProjects = createAsyncThunk(
    "projects/fetchAllProjects",
    async () => {
        const response = await fetch("https://sideproject-production-f126.up.railway.app/allProjects", {
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
            body: JSON.stringify(projectInfo),
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

export const fetchOneProject = createAsyncThunk(
    "project/fetchOneProject",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const projectID = state.projects.projectNow.projectID;
        const response = await fetch(`https://sideproject-production-f126.up.railway.app/project?projectID=${projectID}`,{
            method: 'GET',
            headers:header
        });
        const data = await response.json();
        return data
    }
)

export const projectsSlice = createSlice({
    name: 'projects',
    initialState:{
        projects: [],
        status: "idle",
        errorMessage: "",
        projectNow:{},
        projectBills:[],
    },
    reducers:{
        setProjectNow: (state,action) =>{
            state.projectNow = action.payload
        }
    },
    extraReducers: (builder) => { // 🔹 定義非同步 reducers
        builder
            .addCase(fetchAllProjects.pending, (state) => {
                state.status = "loading"; // 🔹 API 請求開始，狀態變為 loading
            })
            .addCase(fetchAllProjects.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.projects = action.payload; // 🔹 更新專案資料
                // console.log(action.payload)
            })
            .addCase(fetchAllProjects.rejected, (state, action) => {
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
        
        builder
            .addCase(fetchOneProject.pending, (state) => {
                state.status = "loading"; // 🔹 API 請求開始，狀態變為 loading
            })
            .addCase(fetchOneProject.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.projectBills = action.payload; // 🔹 更新專案資料
                // console.log(action.payload)
            })
            .addCase(fetchOneProject.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.error.message; // 🔹 設定錯誤訊息
            });
    }
})

export const {setProjectNow} = projectsSlice.actions;
export default projectsSlice.reducer;
// export const { , deleteProject } = projectsSlice.actions;
