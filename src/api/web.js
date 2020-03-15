import request from '../utils/request';

export const addNav = (query) => {
    return request({
        url: '/nav/addNav',
        method: 'post',
        data: {
            navName: query.navName
        }
    });
};

export const updateNav = (query) => {
    return request({
        url: '/nav/updateNav',
        method: 'post',
        data: {
            navName: query.navName
        }
    });
};

export const listNav = (query) => {
    return request({
        url: '/nav/listNav',
        method: 'post',
        data: query
    });
};

export const addMedia = (query) => {
    return request({
        url: '/media/add',
        method: 'post',
        data: query
    });
};

export const updateMedia = (query) => {
    return request({
        url: '/media/update',
        method: 'post',
        data: query
    });
};

export const mediaList = (query) => {
    return request({
        url: '/media/comList',
        method: 'post',
        data: query
    });
};