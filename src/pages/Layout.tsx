import React from 'react';
import Header from "../components/Header";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='page'>
            <Header/>
            {children}
        </div>
    );
};

export default Layout;
