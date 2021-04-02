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

    constructor() {
        makeObservable(this, {
            companyData: observable
        })
    }

    getFullInfo(slug) {
        return agent.Company.get(slug).then(action((resp) => {
            this.companyData = resp;
        })).catch(action((err) => {
            this.errors = err.response.body.error;
        }))
    }


}

export default new FullCmpnyStore();
