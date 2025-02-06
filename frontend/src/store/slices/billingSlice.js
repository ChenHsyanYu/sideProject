import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

export const fetchInfo = createAsyncThunk(
    "billing/fetchInfo",
    async () =>{
        const response = (await fetch("")).json();
        dispatch(setBillingStatus());
        return response;
    } 
)

export const fetchBillInfos = createAsyncThunk(
    "billing/fetchBillInfos",
    async () =>{
        const response = (await fetch("")).json();
        return response;
    } 
)

export const fetchMembers = createAsyncThunk(
    "billing/fetchMembers",
    async () =>{
        const response = (await fetch("")).json();
        return response;
    } 
) 




export const billingSlice = createSlice({
    name: 'billings',
    initialState:{
        info:{}, // 基本資料
        billInfos: [], // 每個帳目的資料(個人 and 分帳)
        billingStatus: "onGoing", // 這個專案的狀態
        members: [],  // 參與專案的人
        closingBalance:[], // 結算的結果(誰要給誰多少錢)
        personalSpending: 0, // 個人總花費結果
        status: "idle",
        errorMessage: null,
    },
    reducers:{
        calculateBalance: (state) => {
            state.billInfos.forEach((bill) => {
                state.personalSpending += bill.spendingAmount;
            })
        },
        calculateClosingBalance: (state) => {
            
        },
        setBillingStatus: (state) => {
            state.billingStatus = state.info.status;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInfo.pending, (state) => {
                state.status = "loading"; // 🔹 API 請求開始，狀態變為 loading
            })
            .addCase(fetchInfo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.info = action.payload; // 🔹 更新專案資料
            })
            .addCase(fetchInfo.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.error.message; // 🔹 設定錯誤訊息
            });
        
        builder
            .addCase(fetchBillInfos.pending, (state) => {
                state.status = "loading"; // 🔹 API 請求開始，狀態變為 loading
            })
            .addCase(fetchBillInfos.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.billInfos = action.payload; // 🔹 更新專案資料
            })
            .addCase(fetchBillInfos.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.error.message; // 🔹 設定錯誤訊息
            });

        builder
            .addCase(fetchMembers.pending, (state) => {
                state.status = "loading"; // 🔹 API 請求開始，狀態變為 loading
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.members = action.payload; // 🔹 更新專案資料
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.status = "failed";
                state.errorMessage = action.error.message; // 🔹 設定錯誤訊息
            });
    }
})

export default billingSlice.reducer;
export const {calculateBalance,calculateClosingBalance,setBillingStatus} = billingSlice.actions;
