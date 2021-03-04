import React from 'react';
import {Card} from 'antd';
import {useObserver} from "mobx-react";
import userStoreInstance from "../store/userStore";

export default function ProfilePage() {
    return (
        useObserver(() => (
            <>
                <Card title="Default page" style={{width: 300}}>
                    <p>Andrey</p>
                    <p>Romanov</p>
                    <p>Bmstu</p>
                    <p>{userStoreInstance.jwtToken}</p>
                    <p>{userStoreInstance.isAuthorized}</p>
                </Card>
            </>
        ))
    );
}
