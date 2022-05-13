import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {checkLogin} from "../store/reducers/CheckLogin/ActionCreator";

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch()
    const {isLogin, user} = useAppSelector(state => state.loginReducer)

    useEffect(() => {
        dispatch(checkLogin())
    }, [])

    return (
        <>
            {
                isLogin
                    ? <h1>Привет, {user && user.name}</h1>
                    : <h1>Привет, Гость</h1>
            }
        </>
    )
}

export default HomePage;
