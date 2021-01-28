import React, {Component} from 'react'


export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            comments: '',
            topic: 'react'
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    };
    handleCommentsChange = (event) => {
        this.setState({
            comments: event.target.value
        })
    };
    handleTopicChange = (event) => {
        this.setState({
            topic: event.target.value
        })
    };
    handleOnSubmit = (event) => {
        alert(`${this.state.username} ${this.state.comments} ${this.state.topic}`)
    };

    render() {
        return (
            <form onSubmit={this.handleOnSubmit}>
                <h1>kekedaddd</h1>
                <div>
                    <label>username</label>
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
                </div>
                <div>
                    <label>Comments</label>
                    <textarea value={this.state.comments} onChange={this.handleCommentsChange}/>
                </div>
                <div>
                    <label>Topic</label>
                    <select value={this.state.topic} onChange={this.handleTopicChange}>
                        <option value="react">React</option>
                        <option value="angular">Angular</option>
                        <option value="vue">Vue</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }

}