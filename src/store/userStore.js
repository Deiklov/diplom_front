import {decorate, observable, action, computed, runInAction, extendObservable, makeObservable} from "mobx";
import {act} from "@testing-library/react";
import agent from "../api/apiCalls";
import commonStore from "./commonStore";

class UserStore {
    apiBase = 'http://localhost:8080/api/v1/';
    isAuthorized = false;
    jwtToken = "";
    userData = {
        name: "",
        login: "",
        email: "",
        avatarSrc: "",
    };

    constructor() {
        makeObservable(this, {
            isAuthorized: observable,
            jwtToken: observable,
            userData: observable,
            authorize: action,
            unAuthorize: action,
            fetchLogin: action,
        })
    }


    authorize() {
        this.isAuthorized = true
    }

    unAuthorize() {
        this.isAuthorized = true
    }


    async pullUser() {
        agent.Auth.current()
            .then(({name}) => this.userData = name)
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {
                this.inProgress = false;
            }));

        // runInAction(() => {
        //     this.jwtToken = data.token;
        //     this.isAuthorized = true;
        // })
    }
}

const userStoreInstance = new UserStore();
export default userStoreInstance;