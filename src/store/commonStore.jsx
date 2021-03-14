import {observable, action, reaction, makeObservable} from 'mobx';
//общее состояние приложения типо appname token
class CommonStore {

    appName = 'Romanov Invest';
    token = window.localStorage.getItem('jwt');

    constructor() {
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        );
        makeObservable(this, {
            appName: observable,
            token: observable,
            setToken: action,
            setAppLoaded: action,
        })
    }

    setToken(token) {
        this.token = token;
    }

    setAppLoaded() {
        this.appLoaded = true;
    }

}

export default new CommonStore();
