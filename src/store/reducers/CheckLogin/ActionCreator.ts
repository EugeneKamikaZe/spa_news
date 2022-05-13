import {createAsyncThunk} from "@reduxjs/toolkit";

export const checkLogin = createAsyncThunk(
    'test',
    async () => {
        return true
    }
)
