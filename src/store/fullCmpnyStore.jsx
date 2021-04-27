import {action, makeObservable, observable, runInAction, toJS} from "mobx";
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
        figi: undefined,
        attributes: {
            currency: undefined,
            exchange: undefined,
            finnhubIndustry: undefined
        }
    };
    dateFrom = undefined;
    dateTo = undefined;
    stocks = null;
    errors = undefined;
    info = undefined;

    constructor() {
        makeObservable(this, {
            companyData: observable,
            errors: observable,
            info: observable,
            reset: action,
            stocks: observable,
            dateFrom: observable,
            dateTo: observable,
            setFromDate: action,
            setToDate: action,
        })
    }

    reset() {
        this.errors = undefined;
        this.info = undefined;
        this.companyData = {};
        this.stocks = null;
        return Promise.resolve();
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

    setFromDate(data) {
        this.dateFrom = data
    }

    setToDate(data) {
        this.dateTo = data
    }

    getStocksData() {
        const ticker = this.companyData.ticker;
        console.log(ticker);
        if (ticker) {
            return agent.TinkoffAPI.getHistoryCandles(ticker, this.dateFrom, this.dateTo).then(action((resp) => {
                this.info = "Successfully got tinkoffAPI data";
                this.stocks = resp;
            }))
                .catch(action((err) => {
                    this.errors = err.response.body.error;
                }))
        }
    }

    getStocksWS() {
        const Socket = new WebSocket(`${agent.API_WS}market/candles/${this.companyData.ticker}`);
        Socket.onopen = () => console.log("ws connected");
        Socket.onclose = () => console.log("ws closed");
        Socket.onmessage = event => console.log("Получены данные " + event.data);
        Socket.onerror = err => console.log("Ошибка " + err.message);
    }


}

export default new FullCmpnyStore();
