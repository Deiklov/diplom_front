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

    componentWillMount() {
        this.props.companyStore.getAllCompanies();
        console.log(this.props.companyStore.companyList)
    }


    render() {
        const {requestErrors: errors} = this.props.companyStore;

        return (
            <div className="row">
                <ListErrors errors={errors}/>
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
                    {this.props.companyStore.companyList &&
                    this.props.companyStore.companyList.map((value, index) => {
                        return <Card title={value.name} bordered={true} style={{width: 380}}>
                            <p>Number: {index}</p>
                            <p>ID: {value.id}</p>
                            <p>Country: {value.country}</p>
                            <p>Was founded: {value.founded_at}</p>
                            <p>Description: {value.description}</p>
                        </Card>
                    })}
                </div>
            </div>
        );
    }
}

export default inject('companyStore')(withRouter(observer(CompaniesPage)));