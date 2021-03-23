import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import authStore from "./store/authStore";
import commonStore from "./store/commonStore";
import userStore from "./store/userStore";
import companyStore from "./store/companyStore";
import promiseFinally from "promise.prototype.finally";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "mobx-react";
import {Layout} from "antd";

const stores = {
    authStore,
    commonStore,
    userStore,
    companyStore
};

promiseFinally.shim();

ReactDOM.render(
    <React.StrictMode>
        <Provider {...stores}>
            <Layout className="layout">
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Layout>
        </Provider>,
    </React.StrictMode>,
    document.getElementById('root')
);

