import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/UsersFetch/UserSlice'
import loginReducer from './reducers/CheckLogin/LoginSlice'
import {newsAPI} from "../services/NewsService";

const rootReducer = combineReducers({
    userReducer,
    loginReducer,
    [newsAPI.reducerPath]: newsAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(newsAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
