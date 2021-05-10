import React, {useState} from 'react';
import {Form, Input, Button, Checkbox, Row, Col, Modal, Image, DatePicker, Space, Table, Tag, Radio} from 'antd';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label} from 'recharts';
import {Link, Route} from "react-router-dom";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import ListErrors from "../components/ListErrors";
import {Card} from 'antd';
import {HeartTwoTone} from '@ant-design/icons';
import ListSuccess from "../components/ListSuccess";
import ButtonList from "../components/buttonList";
import ProfilePage from "./profilePage";

const columns = [
    {
        title: 'Close price',
        dataIndex: 'c',
        key: 'c',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
];

class FullInfoPage extends React.Component {
    state = {
        modalVisible: false,
        predictAlg: 'LSTM',
    };

    setModalVisible(modalVisible) {
        this.setState({modalVisible})
    }

    componentWillMount() {
        this.props.fullCmpnyStore.reset()
            .then(() => this.props.fullCmpnyStore.getFullInfo(this.props.match.params.slug))
            .then(() => this.props.fullCmpnyStore.getStocksData())

    }

    componentDidMount() {
        // runInAction(() => this.props.fullCmpnyStore.getStocksData());

    }

    toogleFavorite = () => {
        this.props.fullCmpnyStore.addFavorite().then(this.setState({isFavorite: !this.state.isFavorite}))
    };

    onChangeDate = (value, dateString) => {
        this.props.fullCmpnyStore.setFromDate(new Date(Date.parse(dateString[0])).toISOString());
        this.props.fullCmpnyStore.setToDate(new Date(Date.parse(dateString[1])).toISOString());
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    onChangeAlg = e => {
        console.log(this.state.predictAlg);
        this.setState({predictAlg: e.target.value});
        console.log(this.state.predictAlg)
    };

    loadCandles = () => {
        this.props.fullCmpnyStore.getStocksData()
    };
    loadCandlesWS = () => {
        this.props.fullCmpnyStore.getStocksWS()
    };

    predict = () => {
        this.props.fullCmpnyStore.predict()
    };


    render() {
        const {errors, info} = this.props.fullCmpnyStore;
        const {RangePicker} = DatePicker;
        return (
            <>
                <ListErrors errors={errors}/>
                <ListSuccess info={info}/>
                <Card title="Full info page" bordered={true}>
                    {this.props.fullCmpnyStore.companyData.id &&
                    <>
                        <p>Full info page {this.props.match.params.slug}
                            {/*<Button type="ghost" shape={"circle"}*/}
                            {/*        icon={<HeartTwoTone*/}
                            {/*            twoToneColor="#eb2f96"*/}
                            {/*            onClick={this.toogleFavorite}/>}*/}
                            {/*        danger={this.state.isFavorite}>*/}
                            {/*</Button>*/}
                        </p>
                        <p> ID : {this.props.fullCmpnyStore.companyData.id}</p>
                        <p> Name : {this.props.fullCmpnyStore.companyData.name}</p>
                        <p> IPO : {this.props.fullCmpnyStore.companyData.ipo}</p>
                        <p> Country : {this.props.fullCmpnyStore.companyData.country}</p>
                        <p> Ticker : {this.props.fullCmpnyStore.companyData.ticker}</p>
                        <p> Logo : <a
                            href={this.props.fullCmpnyStore.companyData.logo}>{this.props.fullCmpnyStore.companyData.logo} </a>
                        </p>
                        <Image width={100} height="100%" src={this.props.fullCmpnyStore.companyData.logo} alt={"logo"}/>
                        <p> Weburl : <a
                            href={this.props.fullCmpnyStore.companyData.weburl}>{this.props.fullCmpnyStore.companyData.weburl} </a>
                        </p>
                        <p> Currency : {this.props.fullCmpnyStore.companyData.attributes.currency}</p>
                        <p> Exchange : {this.props.fullCmpnyStore.companyData.attributes.exchange}</p>
                        <p> Industry : {this.props.fullCmpnyStore.companyData.attributes.finnhubIndustry}</p>
                        <p> Description : {this.props.fullCmpnyStore.companyData.description}</p>
                        <Row>
                            <Space direction="vertical" size={12}>
                                {/*showTime это булеан флаг*/}
                                <RangePicker onChange={this.onChangeDate} showTime/>
                            </Space>
                            <Button type="primary" onClick={this.loadCandles}>
                                Load stocks
                            </Button>
                            <Button type="primary" onClick={this.loadCandlesWS}>
                                Get real-time
                            </Button>
                            <Button type="primary" onClick={() => {
                                this.predict();
                                alert("Prediction function are called, please wait 20 seconds");
                            }}>
                                Predict
                            </Button>
                        </Row>
                        <ButtonList/>
                        <Modal
                            title="Choose prediction params"
                            style={{top: 20}}
                            visible={this.state.modalVisible}
                            onOk={() => {
                                this.setModalVisible(false);
                            }}
                            onCancel={() => this.setModalVisible(false)}
                        >
                            <p>Choose ARIMA or LSTM</p>
                            <Radio.Group onChange={this.onChangeAlg} value={this.state.predictAlg}>
                                <Radio value="ARIMA">ARIMA</Radio>
                                <Radio value="LSTM">LSTM</Radio>
                            </Radio.Group>
                            <p>Choose prediction time</p>
                        </Modal>
                        <ResponsiveContainer width={'100%'} height={400}>
                            <LineChart data={this.props.fullCmpnyStore.stocks}>
                                <XAxis dataKey='time' type="category" interval="preserveStartEnd" angle={0} dx={0}
                                       padding={{left: 10}}>
                                    <Label value="Time line" offset={0} position="insideBottom"/>
                                </XAxis>
                                <YAxis type="number" scale="auto">
                                    <Label value="Close price" offset={0} position="left" angle={-90}/>
                                </YAxis>
                                <Line type="monotone" dataKey="c"
                                      stroke="#001529" dot={false} name="Real data"/>
                                <Line type="monotone" dataKey="pred_close" name="Predicted data" stroke="#82ca9d"
                                      dot={false}/>
                                <Tooltip/>
                                <Legend verticalAlign="top" height={36}/>
                            </LineChart>
                        </ResponsiveContainer>
                        {this.props.fullCmpnyStore.stocks &&
                        <Table dataSource={this.props.fullCmpnyStore.stocks} columns={columns} rowKey="time"/>}

                    </>
                    }
                </Card>
            </>
        )
    }
}

export default inject('fullCmpnyStore')(withRouter(observer(FullInfoPage)));