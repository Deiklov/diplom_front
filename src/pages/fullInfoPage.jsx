import React, {useState} from 'react';
import {Form, Input, Button, Checkbox, Row, Col, Modal} from 'antd';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import ListErrors from "../components/ListErrors";
import {Card} from 'antd';

class FullInfoPage extends React.Component {
    render() {

        return <Card title="Full info page" bordered={true} style={{width: 380}}>
           <p>Full info page</p>
        </Card>
    }
}

export default inject('companyStore')(withRouter(observer(FullInfoPage)));