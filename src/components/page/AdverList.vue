<template>
    <div>
        <div class="container">
            <el-row>
                <el-col :span="17">
                    <el-select v-model="userName" class="top-select" filterable placeholder="用户名称">
                        <el-option
                            v-for="item in userNameArr"
                            :key="item.value"
                            :label="item.userName"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-select v-model="phone" class="top-select" filterable placeholder="电话号码">
                        <el-option
                            v-for="item in phoneArr"
                            :key="item.value"
                            :label="item.phone"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-button type="primary" class="top-select">查询</el-button>
                    <el-dropdown class="top-select">
                        <el-button type="primary">
                            更多菜单
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item>双皮奶</el-dropdown-item>
                            <el-dropdown-item>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>

            <el-row>
                <el-button class="btn-box" type="primary">最低价格</el-button>
                <el-button class="btn-box" type="primary">最高价格</el-button>
                <el-select v-model="checkStatus" class="btn-box" placeholder="在展状态">
                    <el-option
                        v-for="item in checkStatusArr"
                        :key="item.value"
                        :label="item.exhibition"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-select v-model="status" class="btn-box" placeholder="凭租状态">
                    <el-option
                        v-for="item in adStatusArr"
                        :key="item.value"
                        :label="item.status"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-row>
        </div>
        <div class="container" v-if="show">
            <el-table :data="chargeArr" style="width: 100%">
                >
                <el-table-column property="itemId" label="ID" width="50"></el-table-column>
                <el-table-column label="基本信息" width="300">
                    <template slot-scope="scope">
                        <div class="flex-r">
                            <div class="demo-image__preview">
                                <el-image
                                    style="width: 100px; height: 100px"
                                    :src="scope.row.imageUrlList[0]"
                                    :preview-src-list="scope.row.imageUrlList"
                                ></el-image>
                            </div>
                            <div class="right-box">
                                <p>{{scope.row.itemName}}</p>
                                <p>高：{{scope.row.adHigh}}cm 宽：{{scope.row.adWide}}cm</p>
                                <p>{{scope.row.adAddress}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="价格">
                    <template slot-scope="scope">
                        <span>{{scope.row.adPriceEntity.lowPrice + '-' + scope.row.adPriceEntity.lowPrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="status" label="广告位状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.status===1?'空闲':'在租'}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="endTime" label="到期时间"></el-table-column>
                <el-table-column label="联系人">
                    <template slot-scope="scope">
                        <span>{{scope.row.adLeaseEntity.contactName}}</span>
                        <p>{{scope.row.adLeaseEntity.contactPhone}}</p>
                        <p>{{scope.row.adCompanyEntity.companyName}}</p>
                    </template>
                </el-table-column>
                <el-table-column property="endTime" label="指数"></el-table-column>
                <el-table-column property="endTime" label="上架时间"></el-table-column>
                <el-table-column property="endTime" label="上架状态"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >详情</el-button> -->
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleDelete(scope.$index, scope.row)"
                        >下架</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="70%"> -->
        <div class="container" v-else>
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <div class="left-box">
                    <div class="label-title">基础信息</div>
                    <el-form-item label="媒体标题" prop="itemName">
                        <el-input v-model="ruleForm.itemName"></el-input>
                    </el-form-item>
                    <el-form-item label="所属公司" prop="companyName">
                        <el-input :disabled="true" v-model="ruleForm.companyName"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体类型" prop="typeId">
                        <el-select v-model="ruleForm.typeId" placeholder="请选择媒体类型">
                            <el-option
                                v-for="item of attrsData.typeEntityList"
                                :key="item.typeId"
                                :label="item.typeName"
                                :value="item.typeId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="ruleForm.typeId === 4" label="显示时间" prop="adSecond">
                        <el-input v-model="ruleForm.adSecond"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体区域" prop="areaId">
                        <el-select v-model="ruleForm.areaId" placeholder="请选择媒体区域">
                            <el-option
                                v-for="item of attrsData.areaEntityList"
                                :key="item.areaId"
                                :label="item.areaName"
                                :value="item.areaId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="媒体规格" prop="adHigh">
                        <el-col :span="11" class="size-box flex-r">
                            <span>高</span>
                            <el-input v-model="ruleForm.adHigh" class="attrs" placeholder="高"></el-input>
                        </el-col>
                        <el-col :span="11" class="flex-r">
                            <span>宽</span>
                            <el-input v-model="ruleForm.adWide" class="attrs" placeholder="宽"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="媒体位置" prop="adAddress">
                        <el-input v-model="ruleForm.adAddress" @focus="focus()" suffix-icon="el-icon-location"></el-input>
                    </el-form-item>
                    <el-form-item label="纬度" prop="latitude">
                        <el-input v-model="ruleForm.latitude"></el-input>
                    </el-form-item>
                    <el-form-item label="经度" prop="longitude">
                        <el-input v-model="ruleForm.longitude"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体标签" prop="labelNameArr">
                        <el-checkbox-group v-model="ruleForm.labelNameArr">
                            <el-checkbox
                                v-for="item of attrsData.labelEntityList"
                                :key="item.labelId"
                                :label="item.labelName"
                                :name="item.labelName"
                            ></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="媒体照片" prop="imageUrlList">
                        <el-upload
                            action="http://www.ggweijie.com:8838/upload/file"
                            :headers="myHeaders"
                            :file-list="ruleForm.imageUrlList"
                            :limit="3"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleAvatarSuccess"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt />
                        </el-dialog>
                    </el-form-item>
                </div>
                <div class="right-box">
                    <el-form-item label="媒体视频">
                        <el-upload
                            class="avatar-uploader"
                            action="http://www.ggweijie.com:8838/upload/file"
                            :headers="myHeaders"
                            v-bind:on-progress="uploadVideoProcess"
                            v-bind:on-success="handleVideoSuccess"
                            v-bind:before-upload="beforeUploadVideo"
                            v-bind:show-file-list="false"
                        >
                            <video
                                v-if="ruleForm.videoUrl !='' && !videoFlag"
                                v-bind:src="ruleForm.videoUrl"
                                class="avatar video-avatar"
                                controls="controls"
                            >您的浏览器不支持视频播放</video>
                            <i
                                v-else-if="ruleForm.videoUrl =='' && !videoFlag"
                                class="el-icon-plus avatar-uploader-icon"
                            ></i>
                            <el-progress
                                v-if="videoFlag == true"
                                type="circle"
                                v-bind:percentage="videoUploadPercent"
                                style="margin-top:7px;"
                            ></el-progress>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="媒体描述" prop="descr">
                        <el-input type="textarea" v-model="ruleForm.descr"></el-input>
                    </el-form-item>
                    <div class="label-title">凭租信息</div>
                    <el-form-item label="媒体价格" prop="lowPrice">
                        <el-col :span="11" class="flex-r">
                            <div style="width:80px;">最低价格</div>
                            <el-input v-model="ruleForm.lowPrice" placeholder="请输入最低价格"></el-input>
                        </el-col>
                        <el-col :span="11" class="attrs flex-r">
                            <div style="width:80px;">最高价格</div>
                            <el-input v-model="ruleForm.highPrice" placeholder="请输入最高价格"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="凭租状态" prop="status">
                        <el-select v-model="ruleForm.status" placeholder="请选择媒体类型">
                            <el-option
                                v-for="item of adStatusArr"
                                :key="item.value"
                                :label="item.status"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="ruleForm.status === 2" label="到期时间" prop="endTimeStr">
                        <div class="block">
                            <el-date-picker
                                v-model="ruleForm.endTimeStr"
                                type="datetime"
                                placeholder="选择日期时间"
                            ></el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="联系人" prop="contactName">
                        <el-input v-model="ruleForm.contactName"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="contactPhone">
                        <el-input v-model="ruleForm.contactPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="展示状态" prop="checkStatus">
                        <el-select v-model="ruleForm.modelType" placeholder="请选择媒体类型">
                            <el-option label="上架" value="1"></el-option>
                            <el-option label="下架" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        <!-- </el-dialog> -->
     </div>
        <el-dialog title="地图" :visible.sync="mapVisible" width="40%">
            <iframe id="mapPage" width="100%" height="600px" frameborder=0
                src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4&referer=myapp">
            </iframe>
        </el-dialog>
    </div>
</template>

<script>
let token =  sessionStorage.getItem('token') // 要保证取到
import { adStatusList, updateAd, navArr, updateMine } from '@/api/examine';
export default {
    data() {
        let validateStatus = (rule, value, callback) => {
            if (this.ruleForm.status === 2) {
                if(!this.ruleForm.endTimeStr) {
                    callback(new Error('请选择时间'));
                }
                callback();
            } else {
                callback();
            }
        };
        let validateAdSecond = (rule, value, callback) => {
            if (this.ruleForm.typeId === 4) {
                if(!this.ruleForm.adSecond) {
                    callback(new Error('请输入秒'));
                }
                callback();
            } else {
                callback();
            }
        };
        return {
            show: true,
            mapVisible: false,
            myHeaders: { Authorization: token },
            videoFlag: false,
            //是否显示进度条
            videoUploadPercent: '',
            //进度条的进度，
            isShowUploadVideo: false,
            dialogImageUrl: '',
            dialogVisible: false,
            ruleForm: {},
            rules: {
                itemName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                companyName: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                    { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                adSecond: [{ validator: validateAdSecond, required: true, message: '请输入秒', trigger: 'blur' }],
                latitude: [{ required: true, message: '请输入纬度', trigger: 'blur' }],
                longitude: [{ required: true, message: '请输入经度', trigger: 'blur' }],
                status: [{ required: true, message: '请输入最低价格', trigger: 'blur' }],
                areaId: [{ required: true, message: '请输入最低价格', trigger: 'blur' }],
                typeId: [{ required: true, message: '请输入最低价格', trigger: 'blur' }],
                lowPrice: [{ required: true, message: '请输入最低价格', trigger: 'blur' }],
                highPrice: [{ required: true, message: '请输入最高价格', trigger: 'blur' }],
                endTimeStr: [{ validator: validateStatus, type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
                contactName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
                contactPhone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                adHigh: [{ required: true, message: '请输入高度', trigger: 'blur' }],
                adWide: [{ required: true, message: '请输入宽度', trigger: 'blur' }],
                adAddress: [{ required: true, message: '请输入选择地址', trigger: 'blur' }],
                modelType: [{ required: true, message: '请选择媒体类型', trigger: 'change' }],
                labelNameArr: [{ type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }],
                imageUrlList: [{ type: 'array', required: true, message: '请上传一张图片', trigger: 'blur' }],
                // descr: [
                //     { required: true, message: '请填写描述', trigger: 'blur' },
                //     { min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur' }
                // ]
            },
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 4,
                pageTotal: 0,
                checkStatus: -1
            },
            userNameArr: [
                {
                    value: '黄金糕',
                    userName: '黄金糕'
                },
                {
                    value: '双皮奶',
                    userName: '双皮奶'
                },
                {
                    value: '蚵仔煎',
                    userName: '蚵仔煎'
                },
                {
                    value: '龙须面',
                    userName: '龙须面'
                },
                {
                    value: '北京烤鸭',
                    userName: '北京烤鸭'
                }
            ],
            phoneArr: [
                {
                    value: '15977952156',
                    phone: '15977952156'
                },
                {
                    value: '15997952156',
                    phone: '15997952156'
                },
                {
                    value: '15987952156',
                    phone: '15987952156'
                },
                {
                    value: '15978852156',
                    phone: '15978852156'
                },
                {
                    value: '15976652156',
                    phone: '15976652156'
                }
            ],
            checkStatusArr: [
                {
                    value: 4,
                    exhibition: '上架'
                },
                {
                    value: 5,
                    exhibition: '下架'
                }
            ],
            adStatusArr: [
                {
                    value: 1,
                    status: '空闲'
                },
                {
                    value: 2,
                    status: '在租'
                }
            ],
            status: '',
            checkStatus: '',
            phone: '',
            userName: '',
            chargeArr: [],
            editVisible: false,
            pageTotal: 0,
            idx: -1,
            id: -1,
            attrsData: {}
        };
    },
    created() {
        this.getAdStatusList(this.query);
        this.getNavArr();
    },
    mounted() {
        let that = this;
        window.addEventListener('message', function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          console.log('location', loc);
          that.ruleForm.adAddress = loc.poiaddress
          that.ruleForm.latitude = loc.latlng.lat
          that.ruleForm.longitude = loc.latlng.lng
          that.mapVisible = false
        }
        }, false);
    },
    methods: {
        focus() {
            this.mapVisible = true
        },
        getNavArr() {
            navArr().then(res => {
                console.log(res);
                this.attrsData = res.data;
            });
        },
        /**
         * 获取状态列表
         */
        getAdStatusList(query) {
            adStatusList(query).then(res => {
                console.log(res);
                this.chargeArr = res.data.records;
                this.query.pageTotal = res.data.total;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 保存编辑
        saveEdit() {
    
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        handleEdit(rowIndex, row) {
            this.show = false
            this.editVisible = true;
            this.idx = rowIndex
            console.log(arr, row, this.ruleForm)
            row.companyName = row.adCompanyEntity.companyName
            row.lowPrice = row.adPriceEntity.lowPrice
            row.highPrice = row.adPriceEntity.highPrice
            row.contactName = row.adLeaseEntity.contactName
            row.contactPhone = row.adLeaseEntity.contactPhone
            row.typeId = row.adTypeEntity.typeId
            let obj = {}
            let imgArr = []
            row.imageUrlList.forEach((item,index) => {
                obj.url = item
                obj.name = index+'.jpg'
                console.log(item)
                console.log(obj)
                imgArr.push(obj)
            })
            row.imageUrlList = imgArr
            console.log(imgArr)
            const arr = []
            row.adLabelEntityList.forEach(element => {
               arr.push(element.labelName)
            });
            row.labelNameArr = arr
            this.ruleForm = row

            console.log(arr, row, this.ruleForm)
        },
        submitForm(formName) {
            console.log(this.ruleForm)
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // alert('submit!');
                    updateMine(this.ruleForm).then(res => {
                        console.log(res)
                        if (res.code === 200) {
                            this.show = true
                            this.editVisible = false;
                            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
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
                            this.$set(this.chargeArr, this.idx, this.ruleForm);
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            console.log(file);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleAvatarSuccess(res, file) {
            console.log('图片',res, file);
            console.log(this.ruleForm.imageUrlList)
            this.ruleForm.imageUrlList.push(res.date)
            console.log(this.ruleForm.imageUrlList)
        },
        //上传前回调
        beforeUploadVideo(file) {
            var fileSize = file.size / 1024 / 1024 < 20;
            if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                layer.msg('请上传正确的视频格式');
                return false;
            }
            if (!fileSize) {
                layer.msg('视频大小不能超过20MB');
                return false;
            }
            this.isShowUploadVideo = false;
        },
        //进度条
        uploadVideoProcess(event, file, fileList) {
            this.videoFlag = true;
            this.videoUploadPercent = file.percentage.toFixed(0) * 1;
        },
        //上传成功回调
        handleVideoSuccess(res, file) {
            console.log(res, file);
            this.isShowUploadVideo = true;
            this.videoFlag = false;
            this.videoUploadPercent = 0;

            //前台上传地址
            if (file.status == 'success') {
                this.ruleForm.videoUrl = res.date;
            } else {
                console.log('上传失败');
            }
        }
    }
};
</script>

<style scoped>
.demo-ruleForm {
    display: flex;
}
.left-box {
    margin-right: 40px;
}
.label-title {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
}
.size-box {
    margin-right: 20px;
}
.attrs {
    padding-left: 20px;
}
.container {
    margin-bottom: 20px;
}

#container {
    width: 500px;
    height: 400px;
}
.top-select {
    margin-right: 20px;
}

.btn-box {
    width: 100px;
    margin: 20px 17px 0 0;
}

.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
