import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchUsers} from "../store/reducers/UsersFetch/ActionCreator";
import {change, currentUser} from "../store/reducers/CheckLogin/LoginSlice";
import {LinkEnum} from "../routes";

import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";

const AuthPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {users} = useAppSelector(state => state.userReducer)

    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        dispatch(fetchUsers())
        setModalActive(true)
    }, [])

    const [isLoginError, setIsLoginError] = useState(false)
    const [login, setLogin] = useState(() => {
        return {
            email: "",
            password: "",
        }
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    isLoginError && toast.error('Invalid login or password')

    const handleFormSubmit = () => {
        if (login.email.length === 0 || login.password.length === 0) {
            toast.warn('Need to fill all')
        } else {
            users.filter((val) => {
                if (val.email === login.email && val.pass === login.password) {
                    dispatch(change())
                    // @ts-ignore
                    dispatch(currentUser(val))
                    setIsLoginError(false)
                    navigate(LinkEnum.HOME)
                } else {
                    setIsLoginError(true)
                }
            })
        }
    }

    return (
        <>
            <Modal active={modalActive}
                   setActive={setModalActive}>
                <div className='auth__modal'>
                    <h1 className='auth__modal-title'>Sign In</h1>

                    <div className='auth__modal-body'>
                        <Input handleChange={handleInputChange}
                                   id='email'
                                   labelText='Email Address'
                                   value={login.email}/>
                        <Input handleChange={handleInputChange}
                                   type='password'
                                   id='password'
                                   labelText='Password'
                                   value={login.password}/>

                        <Button buttonText='Submit'
                                type='submit'
                                className='auth__modal-submit btn-primary'
                                onClick={handleFormSubmit}/>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AuthPage;
