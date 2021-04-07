import React from 'react';
import {Alert} from 'antd';

class ListSuccess extends React.Component {
    render() {
        const info = this.props.info;
        if (info) {
            return (
                <Alert
                    message="Info from server"
                    description={info}
                    type="success"
                    showIcon
                />
            );
        } else {
            return null;
        }
    }
}

export default ListSuccess;