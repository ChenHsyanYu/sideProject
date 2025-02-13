import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'users',
    initialState:{
        userLineliffID: '345',
    },
    reducers:{
        setUserID: (state, action) =>{
            state.userLineliffID = action.payload;
        }
    }
})

export const {setUserID} = userSlice.actions;
export default userSlice.reducer;

