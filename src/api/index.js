import request from '../utils/request';

export const comList = query => {
    return request({
        url: '/company/comList',
        method: 'post',
        data: {
            status: query.status,
            page: query.page,
            pageSize: query.pageSize
        }
    });
};

export const comuUdate = query => {
    return request({
        url: '/company/update',
        method: 'post',
        data: query
    });
};

export const resigeterData = query => {
    return request({
        url: '/user/register',
        method: 'post',
        data: {
            username: query.username,
            password: query.loginResgsiterPassword,
            userType: query.userType
        }
    });
};

export const loginData = query => {
    return request({
        url: '/user/login',
        method: 'post',
        params: {
            username: query.username,
            password: query.loginResgsiterPassword,
        }
    });
};

export const userData = () => {
    return request({
        url: '/user/info',
        method: 'get'
    });
};

export const addPeople = query => {
    return request({
        url: '/area/addPeople',
        method: 'post',
        data: {
            areaId: query.areaId,
            name: query.name,
            houseId: query.houseId,
            identity: query.identity
        }
    });
};

export const peopleList = () => {
    return request({
        url: '/area/getpeopleList',
        method: 'post',
        data: {
            page: 1,
            pageSize: 10,
            areaId: 14
        }
    });
};
