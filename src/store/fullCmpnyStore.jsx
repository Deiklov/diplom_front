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
    socket = null;
    dateFrom = undefined;
    dateTo = undefined;
    stocks = null;
    stocksPredicted = null;
    errors = undefined;
    info = undefined;
    currentPrice = 0;

    constructor() {
        makeObservable(this, {
            companyData: observable,
            errors: observable,
            info: observable,
            reset: action,
            stocks: observable,
            currentPrice: observable,
            stocksPredicted: observable,
            dateFrom: observable,
            dateTo: observable,
            setFromDate: action,
            setToDate: action,
            closeWS: action,
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
                this.currentPrice = resp[resp.length - 1].c;
                console.log(this.stocks)
            }))
                .catch(action((err) => {
                    this.errors = err.response.body.error;
                }))
        }
    }

    getStocksWS() {
        this.socket = new WebSocket(`${agent.API_WS}/market/candles/${this.companyData.ticker}`);
        this.socket.onopen = action(() => {
            console.log("ws connected");
            this.stocks = this.stocks.slice(-20);
            console.log(this.stocks)
        });
        this.socket.onclose = () => console.log("ws closed");
        this.socket.onmessage = action(event => {
            const data = JSON.parse(event.data);
            this.stocks = this.stocks.concat(data);
            console.log(data);
            this.currentPrice = data.c;
        });
        this.socket.onerror = err => console.log("Ошибка " + err.message);
    }

    closeWS() {
        this.socket.close(1000, "kek")
    }

    predict() {
        if (this.companyData.ticker) {
            return agent.Company.predict(this.companyData.ticker).then(action((resp) => {
                this.info = "Successfully got prediction data";
                this.stocksPredicted = resp;
                this.stocks = this.stocks.concat(resp);
                console.log(resp);
                console.log(this.stocks)
            }))
                .catch(action((err) => {
                    this.errors = err.response.body.error;
                }))
        }
    }


}

export default new FullCmpnyStore();
