import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

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

export const houseList = query => {
    return request({
        url: '/area/getHouseList',
        method: 'post',
        data: {
            page: 1,
            pageSize: 10,
            areaId: 14
        }
    });
};

export const addHouse = query => {
    return request({
        url: '/area/addHouse',
        method: 'post',
        data: {
            areaId: query.areaId,
            areaName: query.areaName,
            tungs: query.tungs,
            units: query.units,
            houseNum: query.houseNum,
            houseSquare: query.houseSquare,
            househx: query.househx
        }
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
