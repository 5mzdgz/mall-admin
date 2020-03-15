<template>
    <div class="container">
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
                    <el-button @click="closeForm('ruleForm')">关闭</el-button>
                </el-form-item>
            </div>
        </el-form>
         <el-dialog title="地图" :visible.sync="mapVisible" width="40%">
            <iframe id="mapPage" width="100%" height="600px" frameborder=0
                src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4&referer=myapp">
            </iframe>
        </el-dialog>
     </div>
</template>

<script>
let token =  sessionStorage.getItem('token') // 要保证取到
export default {
    props: {
        onClose: Function,
        attrsData: { type: Object, default: {} },
        ruleForm: { type: Object, default: {} }
    },
    data () {
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
            mapVisible: false,
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
            videoFlag: false,
            //是否显示进度条
            videoUploadPercent: '',
            //进度条的进度，
            isShowUploadVideo: false,
            dialogImageUrl: '',
            dialogVisible: false,
            myHeaders: { Authorization: token },
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
        }
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
        closeForm() {
            this.ruleForm = {}
            this.onClose && this.onClose()
        },
        focus() {
            this.mapVisible = true
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
}
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
</style>