import React from "react";
import {Form, Input, Button, Checkbox} from 'antd';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import ListErrors from "../components/ListErrors";
import {Card} from 'antd';

const layout = {
    labelCol: {
        span: 12,
    },
    wrapperCol: {
        span: 16,
    },
};

class CompaniesPage extends React.Component {
    handleQueryChange = e => {
        this.props.companyStore.setSearchQuery(e.target.value);
    };
    onFinish = values => {
        this.props.companyStore.searchCompany()
    };


    render() {
        const {values, errors, inProgress} = this.props.authStore;
        const elements = ["AAPL", "TSLA", "AMZN", "GOOG", "FB"];


        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <Form {...layout} layout={"inline"} name="nest-messages" onFinish={this.onFinish}>
                            <Form.Item
                                name={['searchCompany']}
                                label="Enter company name"
                            >
                                <Input style={{width: 160}} placeholder="AAPL"
                                       onChange={this.handleQueryChange}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                                <Button type="primary" htmlType="submit">
                                    Search
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <div className="site-card-border-less-wrapper">
                                {elements.map((value, index) => {
                                    return <Card title={value} bordered={false} style={{width: 300}}>
                                        <p>Open price 200$</p>
                                        <p>Close price 250$</p>
                                        <p>Date 12.03.2021</p>
                                    </Card>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default inject('authStore')(withRouter(observer(CompaniesPage)));