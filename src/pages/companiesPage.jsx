import React, {useState} from 'react';
import {Form, Input, Button, Checkbox, Row, Col, Modal} from 'antd';
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

    showModal = () => {
        this.props.companyStore.setModalVisible()
    };

    handleOk = () => {
        this.onFinishAdd();
        this.props.companyStore.setModalInvisible()
    };

    handleCancel = () => {
        this.props.companyStore.setModalInvisible()
    };
    handleQueryChange = e => {
        this.props.companyStore.setSearchQuery(e.target.value);
    };
    handleChangeNewCompanyName = e => {
        this.props.companyStore.setNewCompanyName(e.target.value);
    };
    onFinish = values => {
        this.props.companyStore.searchCompany()
    };
    onFinishAdd = values => {
        this.props.companyStore.addNewCompany();
    };

    componentWillMount() {
        if (this.props.location.pathname === "/companies") {
            this.props.companyStore.getAllCompanies();
        } else {
            this.props.companyStore.getFavorites();
        }
    }
    componentWillUnmount() {
        this.props.companyStore.reset();
    }


    render() {
        const {requestErrors: errors} = this.props.companyStore;

        return (
            <>
                <Row justify="center">
                    <Col span={16}>
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
                    </Col>
                    <Col span={8}>
                        <Button type="primary" onClick={this.showModal}>
                            Add new company
                        </Button>
                        <Modal title="Basic Modal" visible={this.props.companyStore.isModalVisible} onOk={this.handleOk}
                               onCancel={this.handleCancel}>
                            <Form {...layout} layout={"inline"} name="nest-messages" onFinish={this.onFinishAdd}>
                                <Form.Item
                                    name={['addCompany']}
                                    label="Enter company name"
                                >
                                    <Input style={{width: 160}} placeholder="PYPL"
                                           onChange={this.handleChangeNewCompanyName}/>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col span={6} offset={3}>
                        {this.props.companyStore.companyList &&
                        this.props.companyStore.companyList.map((value, index) => {
                            return <Card title={value.name} bordered={true} style={{width: 380}} key={index}>
                                <p>ID: {value.id}</p>
                                <p>Country: {value.country}</p>
                                <p>IPO: {value.ipo}</p>
                                <p>Description: {value.description}</p>
                                <Link to={`/company/page/${value.ticker}`}><p>Ticker: {value.ticker}</p></Link>
                            </Card>
                        })}
                    </Col>
                </Row>
            </>
        )
            ;
    }
}

export default inject('companyStore')(withRouter(observer(CompaniesPage)));