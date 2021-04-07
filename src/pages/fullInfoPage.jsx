import React, {useState} from 'react';
import {Form, Input, Button, Checkbox, Row, Col, Modal, Image} from 'antd';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import ListErrors from "../components/ListErrors";
import {Card} from 'antd';
import {io} from "socket.io-client";
import {HeartTwoTone} from '@ant-design/icons';
import ListSuccess from "../components/ListSuccess";

class FullInfoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: false,
        }
    }

    componentWillMount() {
        this.props.fullCmpnyStore.reset();
        this.props.fullCmpnyStore.getFullInfo(this.props.match.params.slug)
    }

    toogleFavorite = () => {
        this.props.fullCmpnyStore.addFavorite().then(this.setState({isFavorite: !this.state.isFavorite}))
    };


    render() {
        const {errors: errors, info: info} = this.props.fullCmpnyStore;
        return (
            <>
                <ListErrors errors={errors}/>
                <ListSuccess info={info}/>
                <Card title="Full info page" bordered={true} style={{width: 380}}>
                    {this.props.fullCmpnyStore.companyData.id &&
                    <>
                        <p>Full info page {this.props.match.params.slug}
                            <Button type="ghost" shape={"circle"}
                                    icon={<HeartTwoTone
                                        twoToneColor="#eb2f96"
                                        onClick={this.toogleFavorite}/>}
                                    danger={this.state.isFavorite}>
                            </Button>
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
                    </>
                    }
                </Card>
            </>
        )
    }
}

export default inject('fullCmpnyStore')(withRouter(observer(FullInfoPage)));