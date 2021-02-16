import React, {Component} from "react";
import './App.css';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom'
import "antd/dist/antd.css";
import {Layout, Menu, Breadcrumb} from 'antd';
import LoginContainer from "./containers/loginPage";
import SignUpContainer from "./containers/SignupPage";
import ProfilePage from "./containers/profilePage";
import {Row, Col} from 'antd';

const {Header, Content, Footer} = Layout;

export default class App extends Component {
    isLoggedIn = false;

    render() {
        return (
            <Layout className="layout">
                <BrowserRouter>
                    <Header style={{position: "sticky", top: "0"}}>
                        <div className="logo"/>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1"><Link to="/login">login</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/signup">signup</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/profile">profile</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{padding: '0 50px'}}>
                        <Switch>
                            <Route path="/login" exact>
                                <Row>
                                    <Col span={8} offset={8}><LoginContainer/></Col>
                                </Row>
                            </Route>
                            <Route path="/" exact>
                                <Redirect to="/login"/>
                            </Route>
                            <Route path="/signup" exact>
                                <Row>
                                    <Col span={8} offset={8}><SignUpContainer/></Col>
                                </Row>
                            </Route>
                            <Route path="/profile" exact>
                                <Row>
                                    <Col span={12} offset={0}><ProfilePage/></Col>
                                </Row>
                            </Route>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: "center"}}>Ant Design ©2018 Created by BMSTU</Footer>
                </BrowserRouter>
            </Layout>
        );
    }

}