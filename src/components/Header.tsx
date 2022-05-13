import React from 'react';

import logo from '../assets/logo.svg'
import {GENERAL_MENU, LinkEnum} from "../routes";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()

    return (
        <div className='header'>
            <div className='header-logo'
                 onClick={() => navigate(LinkEnum.HOME)}>
                <img src={logo} alt=""/>
            </div>

            <ul className='header-list'>
                {
                    GENERAL_MENU.map((page) => (
                        <li key={page.link}
                            className='header-list_item'
                            onClick={() => navigate(page.link)}>{page.title}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Header;
