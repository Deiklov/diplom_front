import React from 'react';
import {Form, Input, InputNumber, Button} from 'antd';
import SignupViewModel from "../../view-model/auth/SignUpViewModel";
import BaseView from "../BaseView";

export interface SignupComponentProps {
    signupViewModel: SignupViewModel;
}

// export interface SignupComponentState {
//     ageQuery: string;
//     authStatus: string;
//     emailQuery: string;
//     nameQuery: string;
//     passwordQuery: string;
// }

export default class SignupComponent extends React.Component<SignupComponentProps, {}> implements BaseView {
    private signupViewModel: SignupViewModel;

    public constructor(props: SignupComponentProps) {
        super(props);
        const {signupViewModel} = this.props;
        this.signupViewModel = signupViewModel;

        this.state = {
            emailQuery: signupViewModel.emailQuery,
            passwordQuery: signupViewModel.passwordQuery,
            ageQuery: signupViewModel.ageQuery,
            nameQuery: signupViewModel.nameQuery,
            authStatus: signupViewModel.authStatus,

        };
    }

    private layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

    private validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    onFinish = (values: any) => {
        console.log('Success:', values);
    };

    public onViewModelChanged(): void {
        this.setState({
            emailQuery: this.signupViewModel.emailQuery,
            passwordQuery: this.signupViewModel.passwordQuery,
            nameQuery: this.signupViewModel.nameQuery,
            ageQuery: this.signupViewModel.ageQuery,
            authStatus: this.signupViewModel.authStatus,
        });
    }


    public render(): JSX.Element {
        return (
            <Form {...this.layout} name="nest-messages" onFinish={this.onFinish}
                  validateMessages={this.validateMessages}>
                <Form.Item name={['user', 'name']} label="Name" rules={[{required: true}]}>
                    <Input onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                        this.signupViewModel.onNameQueryChanged(e.currentTarget.value);
                    }}/>
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{type: 'email'}]}>
                    <Input onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                        this.signupViewModel.onEmailQueryChanged(e.currentTarget.value);
                    }}/>
                </Form.Item>
                <Form.Item name={['user', 'age']} label="Age" rules={[{type: 'number', min: 0, max: 99}]}>
                    <InputNumber onChange={(value: string | number | null | undefined): void => {
                        this.signupViewModel.onAgeQueryChanged(String(value));
                    }}/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                        this.signupViewModel.onPasswordQueryChanged(e.currentTarget.value);
                    }}/>
                </Form.Item>
                <Form.Item wrapperCol={{...this.layout.wrapperCol, offset: 8}}>
                    <Button type="primary" htmlType="submit" onClick={(): void => this.signupViewModel.onClickSubmit()}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}