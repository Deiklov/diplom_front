import React from 'react';
import './App.css';
import AuthComponent from './presentation/view/auth/AuthComponent';
import AuthViewModelImpl from './presentation/view-model/auth/AuthViewModelImpl';
import AuthFakeApi from './data/auth/AuthFakeApi';
import LoginUseCase from './domain/interactors/auth/LoginUseCase';
import AuthHolder from './domain/entity/auth/models/AuthHolder';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

function App(): JSX.Element {
    // data layer
    const authRepository = new AuthFakeApi();
    // domain layer
    const authHolder = new AuthHolder();
    const loginUseCase = new LoginUseCase(authRepository, authHolder);
    // view layer
    const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact={true} render={() => {
                    return (<div className="app-container d-flex container-fluid">
                        <AuthComponent authViewModel={authViewModel}/>
                    </div>)
                }}/>
                <Route path="/" render={() => {
                    return <h1>kekmda route</h1>
                }}/>
                <Route render={() => {
                    return <h1>Not found route!</h1>
                }}/>
            </Switch>
        </BrowserRouter>

    );
}

export default App;