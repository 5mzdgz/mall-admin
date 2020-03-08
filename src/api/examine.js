import request from '../utils/request';

export const adStatusList = (query) => {
    return request({
        url: '/ad/adStatusList',
        method: 'post',
        data: {
            checkStatus: query.checkStatus,
            page: query.pageIndex,
            pageSize: query.pageSize,
        }
    });
};


export const updateAd = (query) => {
    return request({
        url: '/ad/updateAd',
        method: 'post',
        data: {
            checkStatus: query.checkStatus,
            itemId: query.itemId,
            mark: query.mark
        }
    });
};

export const navArr = () => {
    return request({
        url: '/search/item',
        method: 'get'
    });
};