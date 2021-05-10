import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from '../store/commonStore';
// import authStore from '../store/authStore';

const superagent = superagentPromise(_superagent, global.Promise);

//зависит от двух env файлов которые определяются по react-script start и react-scripts build
const API_ROOT = process.env.REACT_APP_API_ROOT;
const API_WS = process.env.REACT_APP_API_WS;
console.log(process.env);


const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        // authStore.logout();
    }
    return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
    if (commonStore.token) {
        req.set('Authorization', `Bearer ${commonStore.token}`);
    }
};

const requests = {
    del: url =>
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/login', {email, password}),
    register: (name, email, password) =>
        requests.post('/user', {name, email, password}),
};


const Profile = {
    follow: username =>
        requests.post(`/profiles/${username}/follow`),
    get: username =>
        requests.get(`/profiles/${username}`),
    unfollow: username =>
        requests.del(`/profiles/${username}/follow`),
    update: (name = undefined, email = undefined, avatarSrc = undefined) =>
        requests.put(`/user`)
};

const Company = {
    get: slug =>
        requests.get(`/company/page/${slug}`),
    getFavorites: () =>
        requests.get(`/companies/favorite`),
    all: () =>
        requests.get(`/companies`),
    add: name =>
        requests.post(`/company`, {name}),
    follow: ticker =>
        requests.post(`/company/favorite`, {ticker}),
    unfollow: ticker =>
        requests.del(`/company/favorite`, {ticker}),
    predict: ticker =>
        requests.get(`/company/predict/${ticker}`),
};
const TinkoffAPI = {
    getHistoryCandles: (ticker, dateFrom, dateTo = new Date().toISOString(), internal = "day") =>
        requests.get(encodeURI(`/market/candles?ticker=${ticker}&from=${dateFrom}&to=${dateTo}&interval=${internal}`))

};


export default {
    Auth,
    Profile,
    Company,
    TinkoffAPI,
    API_WS
};
