import React from "react";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import ListErrors from "../components/ListErrors";
import {Form, Input, InputNumber, Button} from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },

};

class SignUpContainer extends React.Component {
    componentWillUnmount() {
        this.props.authStore.reset();
    }

    onFinish = (values) => {
        console.log(values);
        this.handleSubmitForm()
    };

    handleUsernameChange = e => this.props.authStore.setUsername(e.target.value);
    handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
    handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
    handleSubmitForm = () => {
        this.props.authStore.register().then(() => this.props.history.replace("/"));
    };

    render() {
        const {values, errors} = this.props.authStore;

        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign Up</h1>
                            <p className="text-xs-center">
                                <Link to="login">Have an account?</Link>
                            </p>


                            <ListErrors errors={errors}/>
                            <Form {...layout} name="nest-messages" onFinish={this.onFinish}
                                  validateMessages={validateMessages}>
                                <Form.Item
                                    name={['user', 'name']}
                                    label="Name"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}
                                >
                                    <Input onChange={this.handleUsernameChange}/>
                                </Form.Item>
                                <Form.Item
                                    name={['user', 'email']}
                                    label="Email"
                                    rules={[
                                        {
                                            type: 'email',
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input onChange={this.handleEmailChange}/>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password onChange={this.handlePasswordChange}/>
                                </Form.Item>
                                <Form.Item
                                    name="confirm"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
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

export default inject('authStore')(withRouter(observer(SignUpContainer)));