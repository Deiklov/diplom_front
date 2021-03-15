import React from 'react';
import {Card} from 'antd';
import {inject, observer} from "mobx-react";
import userStoreInstance from "../store/userStore";
import {withRouter} from "react-router";

function MainPage() {
    return (
        <>
            <Card title="Default page" style={{width: 300}}>
                <p>Hello </p>
                <p>{userStoreInstance.userData.name}</p>
                <p>{userStoreInstance.userData.email}</p>
                <p>{userStoreInstance.userData.avatarSrc}</p>
                {!userStoreInstance.isAuthorized && <p>Dear guest please authorize in system</p>}
            </Card>
        </>
    );
}

export default inject("userStore")(withRouter(observer(MainPage)));