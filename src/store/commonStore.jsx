import {observable, action, reaction, makeObservable, autorun} from 'mobx';

//общее состояние приложения типо appname token
class CommonStore {

    appName = 'Romanov Invest';
    token = window.localStorage.getItem('jwt');

    constructor() {
        autorun(() => {
            if (this.token) {
                window.localStorage.setItem('jwt', this.token);
                console.log("seted jwt")
            } else {
                window.localStorage.removeItem('jwt');
                console.log("removed jwt")
            }
        });
        makeObservable(this, {
            appName: observable,
            token: observable,
            setToken: action,
            setAppLoaded: action,
        })
    }

    setToken(token) {
        this.token = token;
        window.localStorage.setItem('jwt', this.token);
    }

    setAppLoaded() {
        this.appLoaded = true;
    }

}

export default new CommonStore();
