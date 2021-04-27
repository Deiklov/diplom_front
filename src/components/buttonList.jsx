import {Button, Row} from "antd";
import React from "react";

export default function ButtonList(props) {
    return <Row>
        <Button type="primary" shape="round">
            D
        </Button>
        <Button type="primary" shape="round">
            W
        </Button>
        <Button type="primary" shape="round">
            M
        </Button>
        <Button type="primary" shape="round">
            6M
        </Button>
        <Button type="primary" shape="round">
            1Y
        </Button>
        <Button type="primary" shape="round">
            All
        </Button>
    </Row>;
}