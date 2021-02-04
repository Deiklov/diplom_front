import React from 'react';
import BaseView from '../BaseView';
import 'antd/dist/antd.css'
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Card} from 'antd';

export default class ProfileComponent extends React.Component {
    public constructor(props: {}) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <>
                <div>
                    <Avatar size={64} icon={<UserOutlined/>}/>
                    <Avatar size="large" icon={<UserOutlined/>}/>
                    <Avatar icon={<UserOutlined/>}/>
                    <Avatar size="small" icon={<UserOutlined/>}/>
                </div>
                <div>
                    <Avatar shape="square" size={64} icon={<UserOutlined/>}/>
                    <Avatar shape="square" size="large" icon={<UserOutlined/>}/>
                    <Avatar shape="square" icon={<UserOutlined/>}/>
                    <Avatar shape="square" size="small" icon={<UserOutlined/>}/>
                </div>
                <Card title="Карточка юзера" extra={<a href="#">More</a>} style={{width: 300}}>
                    <p>Имя: Андрей</p>
                    <p>Фамилия: Романов</p>
                    <p>Почта:  romanov408g@mail.ru</p>
                </Card>
            </>
        )
    }
}