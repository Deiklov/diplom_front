import React from 'react';
import {Card} from 'antd';
import {inject, observer} from "mobx-react";
import userStoreInstance from "../store/userStore";
import {withRouter} from "react-router";
import ExampleCharts from "../components/charts";

function MainPage() {
    return (

        <>
            <Card title="Default page" style={{width: 400}}>
                <p>Hello </p>
                <p>{userStoreInstance.userData.name}</p>
                <p>{userStoreInstance.userData.email}</p>
                <p>{userStoreInstance.userData.avatarSrc}</p>
                {!userStoreInstance.isAuthorized && <p>Dear guest please authorize in system</p>}
            </Card>

            <ExampleCharts/>
        </>
    );
}

export default inject("userStore")(withRouter(observer(MainPage)));