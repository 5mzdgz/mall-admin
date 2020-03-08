import request from '../utils/request';

export const attrsArr = (query) => {
    return request({
        url: query.url,
        method: 'post',
        data: {
            page: query.page,
            pageSize: query.pageSize
        }
    });
};

export const addAdType = (query) => {
    return request({
        url: 'attr/addAdType',
        method: 'post',
        data: {
            typeName: query.itemName,
            status: query.status,
            mark: query.mark
        }
    });
};

export const addAdArea = (query) => {
    return request({
        url: 'attr/addAdArea',
        method: 'post',
        data: {
            areaName: query.itemName,
            status: query.status,
            mark: query.mark
        }
    });
};

export const addAdCycle = (query) => {
    return request({
        url: 'attr/addAdCycle',
        method: 'post',
        data: {
            cycleName: query.itemName,
            status: query.status,
            mark: query.mark
        }
    });
};

export const addAdPrice = (query) => {
    return request({
        url: 'attr/addAdPrice',
        method: 'post',
        data: {
            lowPrice: query.lowPrice,
            highPrice: query.highPrice,
            status: query.status,
            mark: query.mark
        }
    });
};

export const addAdLabel = (query) => {
    return request({
        url: 'attr/addAdLabel',
        method: 'post',
        data: {
            labelName: query.itemName,
            backColour: query.backColour,
            status: query.status,
            mark: query.mark
        }
    });
};

export const updateAdType = (query) => {
    return request({
        url: '/attr/updateAdType',
        method: 'post',
        data: {
            typeId: query.id,
            status: query.status,
            mark: query.mark,
            typeName: query.itemName
        }
    });
};

export const updateAdArea = (query) => {
    return request({
        url: '/attr/updateAdArea',
        method: 'post',
        data: {
            areaId: query.id,
            status: query.status,
            mark: query.mark,
            areaName: query.itemName
        }
    });
};

export const updateAdLabel = (query) => {
    return request({
        url: '/attr/updateAdLabel',
        method: 'post',
        data: {
            labelId: query.id,
            status: query.status,
            mark: query.mark,
            labelName: query.itemName,
            backColour: query.backColour
        }
    });
};

export const updateAdCycle = (query) => {
    return request({
        url: '/attr/updateAdCycle',
        method: 'post',
        data: {
            cycleId: query.id,
            status: query.status,
            mark: query.mark,
            cycleName: query.itemName
        }
    });
};


export const updateAdPrice = (query) => {
    return request({
        url: '/attr/updateAdPrice',
        method: 'post',
        data: {
            priceId: query.id,
            status: query.status,
            mark: query.mark,
            lowPrice: query.lowPrice,
            highPrice: query.highPrice
        }
    });
};