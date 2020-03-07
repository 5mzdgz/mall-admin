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