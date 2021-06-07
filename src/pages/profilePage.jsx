import React from "react";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import {Form, Input, Button, Radio, InputNumber, Upload} from 'antd';
import {UploadOutlined, InboxOutlined} from '@ant-design/icons';
import ListErrors from "../components/ListErrors";

class ProfilePageContainer extends React.Component {
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    handleNameChange = e => this.props.userStore.setName(e.target.value);
    handleEmailChange = e => this.props.userStore.setEmail(e.target.value);
    handleSubmitForm = e => {
        e.preventDefault();
        this.props.userStore.update()
    };
    // constructor(props) {
    //     super(props);
    //     this.setState()
    // }

    render() {
        const {userData, errors} = this.props.userStore;

        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Your Settings</h1>

                            <ListErrors errors={errors}/>
                            <Form name="register" onFinish={this.handleSubmitForm} scrollToFirstError>
                                <Form.Item label="Name">
                                    <Input placeholder="Enter your name" value={userData.name} size="middle"
                                           onChange={this.handleNameChange} maxLength={60}/>
                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input placeholder="Enter your email" value={userData.email} size="middle"
                                           readOnly
                                           onChange={this.handleEmailChange}/>
                                </Form.Item>
                                <Form.Item
                                    name={['user', 'age']}
                                    label="Age"
                                    rules={[
                                        {
                                            type: 'number',
                                            min: 0,
                                            max: 99,
                                        },
                                    ]}
                                >
                                    <InputNumber/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Update settings</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={() => alert("reday to change")}>Edit settings</Button>
                                </Form.Item>
                                <Form.Item
                                    name="upload"
                                    label="Upload"
                                    valuePropName="fileList"
                                    getValueFromEvent={this.normFile}
                                    extra="Upload your avatar"
                                >
                                    <Upload name="logo" action="/upload.do" listType="picture"
                                            accept=".png,.jpg,.jpeg,.bmp">
                                        <Button icon={<UploadOutlined/>}>Click to upload</Button>
                                    </Upload>
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