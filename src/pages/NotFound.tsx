import React from 'react';
import {useNavigate} from "react-router-dom";

import Button from "../components/Button";
import {LinkEnum} from "../routes";

const NotFound = () => {
    const navigate = useNavigate()
    const navigateHandle = () => {
        navigate(LinkEnum.HOME)
    }

    return (
        <div className='not__found'>
            <div className='not__found-title'>404</div>

            <p className='not__found-additional__title'>Page not found</p>
            <p className='not__found-descr'>Sorry, we could not find that page</p>

            <Button buttonText='Back to Main Page' onClick={navigateHandle}/>
        </div>
    );
};

export default NotFound;
