import React from "react";
import {Form, Input, Button, Checkbox} from 'antd';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import ListErrors from "../components/ListErrors";
import {Card} from 'antd';

class CompaniesPage extends React.Component {

    render() {
        const {values, errors, inProgress} = this.props.authStore;
        const elements = ["AAPL", "TSLA", "AMZN", "GOOG", "FB"];

        function randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }

        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <Input placeholder="Enter company name"/>
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