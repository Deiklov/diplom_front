import React, {Component} from "react";
import './App.css';
import {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom'
import {withRouter} from "react-router";
import "antd/dist/antd.css";
import {Layout, Menu, Breadcrumb} from 'antd';
import LoginPage from "./pages/loginPage";
import SignUpContainer from "./pages/signupPage";
import CompaniesPage from "./pages/companiesPage"
import ProfilePage from "./pages/profilePage";
import {Row, Col} from 'antd';
import {inject, observer} from "mobx-react";
import MainPage from "./pages/mainPage";
import userStore from "./store/userStore";
import NotFoundPage from "./pages/404Page";
import FullInfoPage from "./pages/fullInfoPage";

const {Header, Content, Footer} = Layout;

class App extends Component {
    componentWillMount() {
        if (this.props.commonStore.token) {

            this.props.userStore.pullUser()
                .then(() => this.props.userStore.authorize())
                .catch(() => this.props.history.replace("/login"))
                .then(() => this.props.commonStore.token = undefined);
        }
        this.props.commonStore.setAppLoaded();
    }


    render() {
        if (this.props.commonStore.appLoaded) {
            return (
                <div>
                    <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                        <div className="logo"/>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                            <Menu.Item key="4"><Link to="/">Main page</Link></Menu.Item>
                            {!this.props.userStore.isAuthorized &&
                            <Menu.Item key="1"><Link to="/login">Login</Link></Menu.Item>}
                            {!this.props.userStore.isAuthorized &&
                            <Menu.Item key="2"><Link to="/signup">SignUp</Link></Menu.Item>}
                            {this.props.userStore.isAuthorized &&
                            <Menu.Item key="3"><Link to="/profile">Change profile</Link></Menu.Item>}
                            <Menu.Item key="5"><Link to="/companies">Companies</Link></Menu.Item>
                            <Menu.Item key="6"><Link to="/favorites">Favorites list</Link></Menu.Item>
                        </Menu>
                    </Header>
                    <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 600}}>
                            <Switch>
                                <Route path="/login" exact>
                                    <Row>
                                        <Col span={8} offset={8}><LoginPage/></Col>
                                    </Row>
                                </Route>
                                <Route path="/" exact>
                                    <Row>
                                        <Col span={20} offset={2}><MainPage/></Col>
                                    </Row>
                                </Route>
                                <Route path="/signup" exact>
                                    <Row>
                                        <Col span={8} offset={8}><SignUpContainer/></Col>
                                    </Row>
                                </Route>
                                <Route path="/profile" exact>
                                    <Row>
                                        <Col span={12} offset={4}><ProfilePage/></Col>
                                    </Row>
                                </Route>
                                <Route path="/companies" exact>
                                    <Row>
                                        <Col span={24} offset={0}><CompaniesPage/></Col>
                                    </Row>
                                </Route>
                                <Route path="/company/page/:slug" exact>
                                    <Row>
                                        <Col span={24} offset={0}><FullInfoPage/></Col>
                                    </Row>
                                </Route>
                                <Route path="/favorites" exact>
                                    <Row>
                                        <Col span={24} offset={0}><CompaniesPage/></Col>
                                    </Row>
                                </Route>

                                <Route path='*' exact={true} component={NotFoundPage} status={404}/>
                            </Switch>
                        </div>
                    </Content>
                    {this.props.commonStore.token && <h6>SHA-256(jwt) : {this.props.commonStore.token}</h6>}
                    <Footer style={{textAlign: "center"}}>Ant Design ©2021 Created by BMSTU</Footer>
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