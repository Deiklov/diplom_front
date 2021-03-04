import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from '../store/commonStore';
import authStore from '../store/authStore';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8080/api/v1';


const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        authStore.logout();
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
        requests.post('/login',  {email, password}),
    register: (username, email, password) =>
        requests.post('/user', {user: {username, email, password}}),
};


const Profile = {
    follow: username =>
        requests.post(`/profiles/${username}/follow`),
    get: username =>
        requests.get(`/profiles/${username}`),
    unfollow: username =>
        requests.del(`/profiles/${username}/follow`)
};

export default {
    Auth,
    Profile,
};