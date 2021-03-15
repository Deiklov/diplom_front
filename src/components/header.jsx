import {Menu} from "antd";
import {Link} from "react-router-dom";
import React from "react";

class Header extends React.Component {
    render() {
        return (
            <Header style={{position: "sticky", top: "0"}}>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to="/login">login</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/signup">signup</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/profile">profile</Link></Menu.Item>
                </Menu>
            </Header>
        );
    }
}