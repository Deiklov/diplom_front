import React, {Component} from "react";
import './App.css';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom'
import {withRouter} from "react-router";
import "antd/dist/antd.css";
import {Layout, Menu, Breadcrumb} from 'antd';
import LoginPage from "./pages/loginPage";
import SignUpContainer from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";
import {Row, Col} from 'antd';
import {inject, observer} from "mobx-react";
import MainPage from "./pages/mainPage";

const {Header, Content, Footer} = Layout;

class App extends Component {
    componentWillMount() {
        if (!this.props.commonStore.token) {
            this.props.commonStore.setAppLoaded();
        }
    }

    componentDidMount() {
        // if (this.props.commonStore.token) {
        //     this.props.userStore
        //         .pullUser()
        //         .finally(() => this.props.commonStore.setAppLoaded());
        // }
    }

    render() {
        if (this.props.commonStore.appLoaded) {
            return (
                <div>
                    <Header style={{position: "sticky", top: "0"}}>
                        <div className="logo"/>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="4"><Link to="/">Main page</Link></Menu.Item>
                            {!this.props.userStore.isAuthorized &&
                            <Menu.Item key="1"><Link to="/login">login</Link></Menu.Item>}
                            {!this.props.userStore.isAuthorized &&
                            <Menu.Item key="2"><Link to="/signup">signup</Link></Menu.Item>}
                            {this.props.userStore.isAuthorized &&
                            <Menu.Item key="3"><Link to="/profile">Change profile</Link></Menu.Item>}
                        </Menu>
                    </Header>
                    <Switch>
                        <Route path="/login" exact>
                            <Row>
                                <Col span={8} offset={8}><LoginPage/></Col>
                            </Row>
                        </Route>
                        <Route path="/" exact>
                            <Row>
                                <Col span={8} offset={8}><MainPage/></Col>
                            </Row>
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
                    <h6>token : {this.props.commonStore.token}</h6>
                    <Footer style={{textAlign: "center"}}>Ant Design ©2018 Created by BMSTU</Footer>
                </div>
            );
        }
        return (
            <Header style={{position: "sticky", top: "0"}}>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to="/login">loginlow</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/signup">signup</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/profile">profile</Link></Menu.Item>
                </Menu>
            </Header>
        )
    }

}

export default inject("authStore", "commonStore", "userStore")(withRouter(observer(App)));