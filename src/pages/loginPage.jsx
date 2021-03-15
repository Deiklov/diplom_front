import React from "react";
import {Form, Input, Button, Checkbox} from 'antd';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import ListErrors from "../components/ListErrors";

class LoginPage extends React.Component {
    layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };


    componentWillUnmount() {
        this.props.authStore.reset();
    }

    handleEmailChange = e => {
        this.props.authStore.setEmail(e.target.value);
    };

    handlePasswordChange = e => {
        this.props.authStore.setPassword(e.target.value);
    };

    handleSubmitForm = () => {
        console.log(this.props.authStore.values.email);
        console.log(this.props.authStore.values.password);
        this.props.authStore.login().then(() => this.props.history.replace("/"));
    };
    onFinish = (values) => {
        this.handleSubmitForm()
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const {values, errors, inProgress} = this.props.authStore;

        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign In</h1>
                            <p className="text-xs-center">
                                <Link to="/signup">Need an account?</Link>
                            </p>

                            <ListErrors errors={errors}/>
                            <Form
                                {...this.layout}
                                name="basic"
                                initialValues={{remember: true}}
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{required: true, message: 'Please input your email!'}]}
                                >
                                    <Input onChange={this.handleEmailChange}/>
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{required: true, message: 'Please input your password!'}]}
                                >
                                    <Input.Password onChange={this.handlePasswordChange}/>
                                </Form.Item>


                                <Form.Item {...this.tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default inject('authStore')(withRouter(observer(LoginPage)));