import {decorate, observable, action, computed, runInAction, extendObservable, makeObservable} from "mobx";
import {act} from "@testing-library/react";
import agent from "../api/apiCalls";
import commonStore from "./commonStore";

//состояние юзера name avatar isAuthroized
class UserStore {
    apiBase = 'https://bmstu-romanov.xyz/api/v1';
    isAuthorized = false;
    errors = undefined;
    userData = {
        name: undefined,
        email: undefined,
        avatarSrc: undefined,
    };
    userUpdData = {
        name: undefined,
        email: undefined,
        avatarSrc: undefined,
    };

    constructor() {
        makeObservable(this, {
            isAuthorized: observable,
            userData: observable,
            authorize: action,
            unAuthorize: action,
            pullUser: action,
            update: action,
            setName: action,
            setEmail: action,
        })
    }


    authorize() {
        this.isAuthorized = true
    }

    unAuthorize() {
        this.isAuthorized = true
    }

    setName(name) {
        this.userData.name = name
    }

    setEmail(email) {
        this.userData.email = email
    }


    async pullUser() {
        agent.Auth.current()
            .then((data) => this.userData = data)
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {
                this.inProgress = false;
            }));
    }

    async update() {
        agent.Profile.update(this.userUpdData.name, this.userUpdData.email, this.userUpdData.avatarSrc)
            //todo set full user data
            .then(({name, login, email, avatarSrc}) => this.userData = {
                name: name,
                email: email,
                avatarSrc: avatarSrc
            })
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {
                this.inProgress = false;
            }));

    }
}

const userStoreInstance = new UserStore();
export default userStoreInstance;