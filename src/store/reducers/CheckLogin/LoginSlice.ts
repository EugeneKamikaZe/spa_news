import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface LoginState {
    user: IUser | null,
    isLogin: boolean,
}

export type IUser = {
    id: number | undefined,
    name: string,
    email: string,
    pass: string | number,
    rights: string,
}

const initialState: LoginState = {
    user: null,
    isLogin: false,
}

export const loginSlice = createSlice({
    name: 'isLogin',
    initialState,
    reducers: {
        change: (state,) => {
            state.isLogin = true
        },
        currentUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    },
})

export const {change, currentUser} = loginSlice.actions
export default loginSlice.reducer
