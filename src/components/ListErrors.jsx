import React from 'react';
import {Alert} from 'antd';

class ListErrors extends React.Component {
    render() {
        const errors = this.props.errors;
        if (errors) {
            return (
                <Alert
                    message="Error from server"
                    description={errors}
                    type="error"
                    showIcon
                />
            );
        } else {
            return null;
        }
    }
}

export default ListErrors;