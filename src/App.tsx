import React from 'react';
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import {LinkEnum} from "./routes";

import 'react-toastify/dist/ReactToastify.css';

import News from "./pages/News";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout";

function App() {
    return (
        <>
            <Routes>
                <Route path='/'
                       element={<Layout>
                           <AuthPage/>
                       </Layout>}/>

                <Route path={LinkEnum.AUTH}
                       element={<Layout>
                           <AuthPage/>
                       </Layout>}/>
                <Route path={LinkEnum.HOME}
                       element={<Layout>
                           <HomePage/>
                       </Layout>}/>
                <Route path={LinkEnum.NEWS}
                       element={<Layout>
                           <News/>
                       </Layout>}/>

                <Route path="*" element={<NotFound/>}/>
            </Routes>

            <ToastContainer/>
        </>
    )
}

export default App
