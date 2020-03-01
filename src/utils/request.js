import axios from 'axios';
import Store from '@/store'
import { nextTick } from 'q';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: 'http://www.ggweijie.com:8834',
    // baseURL: 'http://192.168.1.20:8834',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        config.headers['Authorization'] = Store.state.token;
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        console.log(response)
        if (response.status === 200) {
            if(response.data.code === 401) {
                next('/login');
            }
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
