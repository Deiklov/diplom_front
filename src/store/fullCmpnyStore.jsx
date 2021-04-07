import {action, makeObservable, observable} from "mobx";
import agent from "../api/apiCalls";


class FullCmpnyStore {
    companyData = {
        id: undefined,
        name: undefined,
        ipo: undefined,
        description: undefined,
        country: undefined,
        ticker: undefined,
        logo: undefined,
        weburl: undefined,
        attributes: {
            currency: undefined,
            exchange: undefined,
            finnhubIndustry: undefined
        }
    };
    errors = undefined;
    info = undefined;

    constructor() {
        makeObservable(this, {
            companyData: observable,
            errors: observable,
            info: observable,
            reset: action,
        })
    }

    reset() {
        this.errors = undefined;
        this.info = undefined;
        this.companyData = {}
    }

    getFullInfo(slug) {
        return agent.Company.get(slug).then(action((resp) => {
            this.companyData = resp;
        })).catch(action((err) => {
            this.errors = err.response.body.error;
        }))
    }

    addFavorite() {
        return agent.Company.follow(this.companyData.ticker).then(action(() => {
            this.info = "Successfully added to favorite list";
        })).catch(action((err) => {
            this.errors = err.response.body.error;
        }))
    }


}

export default new FullCmpnyStore();
