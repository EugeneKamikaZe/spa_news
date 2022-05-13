import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUser} from "../../../models/user";

import axios from "axios";

export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async () => {
        const response = await axios.get<IUser[]>('http://localhost:3010/users')
        return response.data
    }
)
