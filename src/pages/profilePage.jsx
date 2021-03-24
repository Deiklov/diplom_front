import React from "react";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import {Form, Input, Button, Radio} from 'antd';
import ListErrors from "../components/ListErrors";

class ProfilePageContainer extends React.Component {

    handleNameChange = e => this.props.userStore.setName(e.target.value);
    handleEmailChange = e => this.props.userStore.setEmail(e.target.value);
    handleSubmitForm = e => {
        e.preventDefault();
        this.props.userStore.update()
    };

    render() {
        const {userData, errors} = this.props.userStore;

        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Your Settings</h1>

                            <ListErrors errors={errors}/>
                            <Form
                                name="register"
                                onFinish={this.handleSubmitForm}
                                scrollToFirstError
                            >
                                <Form.Item label="Name" >
                                    <Input placeholder="Enter your name" value={userData.name} size="middle"
                                           onChange={this.handleNameChange} maxLength={60}/>
                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input placeholder="Enter your email" value={userData.email} size="middle"
                                           onChange={this.handleEmailChange}/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary">Update settings</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default inject('userStore')(withRouter(observer(ProfilePageContainer)));