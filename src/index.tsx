import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

import './scss/main.scss';


const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
);
