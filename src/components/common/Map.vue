<template>
    <div class="container flex-r">
        <div class="left-box">
            <div class="tips">使用提示：拖动标注，点击标注（弹出右边地址栏，点击选取）</div>
            <div id="container"></div>
        </div>
        <div class="container">
            <div class="address-box" v-for="(item, index) of nearPois" :key="index" @click="selectedItem(item)">
                <p class="top">
                    <span class="name">{{item.name}}</span>
                    <span class="sub">({{item.category}})</span>
                </p>
                <p class="detail">{{item.address}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { TMap } from '@/utils/TMap';
let geocoder = null
export default {
    data() {
        return {
            nearPois: []
        };
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let that = this
            TMap('5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4').then(qq => {
                let center = new qq.maps.LatLng(24.916527, 108.397128);
                let map = new qq.maps.Map(document.getElementById('container'), {
                    // 地图的中心地理坐标。
                    center: center,
                    zoom: 15
                });
                // 调用地址解析类
                var info = new qq.maps.InfoWindow({map: map});
                geocoder = new qq.maps.Geocoder({
                    complete: function(result) {
                        map.setCenter(result.detail.location);
                        let marker = new qq.maps.Marker({
                            map: map,
                            position: result.detail.location
                        });
                        marker.setDraggable(true);
                        let listener = qq.maps.event.addListener(marker, 'click', function(event) {
                            // console.log(event)
                            that.getAddresss(event.latLng.lat, event.latLng.lng)
                        });
                        // qq.maps.event.removeListener(listener);
                    }
                });
                // let address = document.getElementById('address').value;
                //通过getLocation();方法获取位置信息值
                geocoder.getLocation('贵港市');
            });
        },
        selectedItem(item) {
            this.$router.push({ path: '/adverList', params:{ addressData: item }});
        },
        getAddresss(lat, lng) {
            let that = this
            TMap('5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4').then(qq => {
                let geocoder = new qq.maps.Geocoder({
                    complete:function(result){
                        // alert('成功：'+result.detail.address);
                        // console.log(result)
                        that.nearPois = result.detail.nearPois
                    }
                });
                var coord =new qq.maps.LatLng(lat, lng);//传入数据（纬度,经度）
                geocoder.getAddress(coord);
            })
        // let that = this;
        // const KEY = "5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4"; //key 秘钥自己申请
        // let url =
        //     "https://apis.map.qq.com/ws/geocoder/v1?&poi_options=address_format=short&get_poi=0";
        // let locationdata = lat + "," + lng; //纬度，经度
        // this.$jsonp(url, {
        //     key: KEY,
        //     output: "jsonp",
        //     location: locationdata
        // })
        //     .then(json => {
        //     console.log("json", json);
        //     // console.log('address',address) //附近街道地址信息
        //     that.address = json.result.address + json.result.formatted_addresses.recommend
        //     })
        //     .catch(err => {
        //     console.log(err);
        //     });
        },
    }
};
</script>

<style scoped>
#container {
    width: 600px;
    height: 600px;
}
.container {
    margin-left: 20px;
}
.tips {
    font-size: 14px;
    margin-bottom: 10px;
}
.address-box {
    background: #fff;
    margin: 10px;
    border: 1px solid #ddd;
    font-size: 14px;
    padding: 0 10px;
}
p {
    margin: 2px 0;
}
.name {
    font-weight: bold;
}
.sub {
    margin-left: 20px;
}
</style>