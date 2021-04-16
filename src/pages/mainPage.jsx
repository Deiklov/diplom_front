import React from 'react';
import {Card} from 'antd';
import {inject, observer} from "mobx-react";
import userStoreInstance from "../store/userStore";
import {withRouter} from "react-router";
import ExampleCharts from "../components/charts";

function MainPage() {
    const socket = new WebSocket('wss://ws.finnhub.io?token=c0ilbh748v6ot9ddgc0g');

// Connection opened -> Subscribe
    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'FB'}));
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}));
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AMZN'}));
        socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'PYPL'}));

    });
;

// Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });

// Unsubscribe
    var unsubscribe = function(symbol) {
        socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
    };
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