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

export const updateMine = (query) => {
    let imageUrl;
    query.imageUrlList.forEach(item => {
        console.log(imageUrl)
        if (typeof(item) === 'string') {
            if (imageUrl) {
                console.log(item, 1111, imageUrl)
                imageUrl += imageUrl + ',' + item
            }
        }
        if (item.url) {
            if (imageUrl) {
                imageUrl += imageUrl + ',' + item.url
                console.log(item, 2222, imageUrl)
            }
        }
    })
    let str = '', labelId;
    query.adLabelEntityList.forEach(item => {
        str += item.labelId + ','
    })
    labelId = str.substring(0, str.length - 1);
    return request({
        url: '/ad/updateMine',
        method: 'post',
        data: {
            itemId: query.itemId,
            itemName: query.itemName,
            adSecond: query.adSecond,
            descr: query.descr,
            adHigh: query.adHigh,
            adWide: query.adWide,
            imageUrl: imageUrl,
            typeId: query.typeId,
            areaId: query.areaId,
            labelId: labelId,
            latitude:query.latitude,
            longitude:query.longitude,
            adAddress: query.adAddress,
            price: query.lowPrice + '-' + query.highPrice,
            status: query.status,
            contactName: query.contactName,
            contactPhone: query.contactPhone,
            endTimeStr: query.endTimeStr,
            videoUrl: query.videoUrl
        }
    });
};

export const navArr = () => {
    return request({
        url: '/search/item',
        method: 'get'
    });
};