import React from 'react';
import {Card} from 'antd';
import {useObserver} from "mobx-react";
import userStoreInstance from "../store/userStore";

export default function MainPage() {
    return (
        useObserver(() => (
            <>
                <Card title="Default page" style={{width: 300}}>
                    <p>Hello</p>
                    <p>{userStoreInstance.userData.name}</p>
                    <p>{userStoreInstance.userData.login}</p>
                    <p>{userStoreInstance.userData.email}</p>
                    <p>{userStoreInstance.userData.avatarSrc}</p>
                    <p>User is authorized {userStoreInstance.isAuthorized}</p>
                </Card>
            </>
        ))
    );
}