import {action, makeObservable, observable} from "mobx";
import agent from "../api/apiCalls";

class CompanyStore {
    errors = undefined;
    companyData = {
        name: undefined,
        slug: undefined,
        description: undefined,
    };
    searchQuery = undefined;

    constructor() {
        makeObservable(this, {})
    }

    setSearchQuery(data) {
        this.searchQuery = data;
    }

    // async searchCompany(data) {
    //     agent.Company.search(data)
    // }

}

export default new CompanyStore();
