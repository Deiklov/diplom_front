import {action, makeObservable, observable} from "mobx";
import agent from "../api/apiCalls";
import commonStore from "./commonStore";
import userStore from "./userStore";

class CompanyStore {
    companyData = {
        name: undefined,
        slug: undefined,
        description: undefined,
    };
    searchQuery = undefined;
    companyList = [];
    requestErrors = undefined;

    constructor() {
        makeObservable(this, {
            searchQuery: observable,
            setSearchQuery: action,
            companyList: observable,
            companyData: observable,
            requestErrors: observable
        })
    }

    setSearchQuery(data) {
        this.searchQuery = data;
    }

    searchCompany() {
        return agent.Company.search(this.searchQuery)
            .then(action(({companyList}) => {
                this.companyList = companyList;
            }))
            .catch(action((err) => {
                this.requestErrors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
    }

}

export default new CompanyStore();
