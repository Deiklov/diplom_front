import React from 'react';
import { Link } from 'react-router-dom';
class NotFoundPage extends React.Component{
    render(){
        return <div>
            <p style={{textAlign:"center"}}>
                <Link to="/">Sorry, page not found! </Link>
            </p>
        </div>;
    }
}
export default NotFoundPage;