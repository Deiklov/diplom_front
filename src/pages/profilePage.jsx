import React from "react";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import ListErrors from "../components/ListErrors";

class ProfilePageContainer extends React.Component {

    handleNameChange = e => this.props.userStore.setUsername(e.target.value);
    handleEmailChange = e => this.props.userStore.setEmail(e.target.value);
    handleSubmitForm = e => {
        e.preventDefault();
        this.props.userStore.update()
    };

    render() {
        const {userData, errors} = this.props.userStore;

        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Your's profile page </h1>

                            <ListErrors errors={errors}/>
                            <form onSubmit={this.handleSubmitForm}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Username"
                                            value={userData.name}
                                            onChange={this.handleNameChange}
                                        />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input
                                            className="form-control form-control-lg"
                                            type="email"
                                            placeholder="Email"
                                            value={userData.email}
                                            onChange={this.handleEmailChange}
                                        />
                                    </fieldset>

                                    <button
                                        className="btn btn-lg btn-primary pull-xs-right"
                                        type="submit"
                                    >
                                        Change User data
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default inject('userStore')(withRouter(observer(ProfilePageContainer)));