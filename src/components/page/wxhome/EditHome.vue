<template>
    <div class="edit">
        <el-form :model="param" :rules="rules" ref="form" label-width="80px" class="ms-content">
            <el-form-item label="凭租状态" prop="type">
                <el-select v-model="param.type" placeholder="请选择媒体类型">
                    <el-option
                        v-for="item of typeArr"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="mediaName" label="标题">
                <el-input v-model="param.mediaName" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="媒体照片" prop="mediaImageurl">
                <el-upload
                    action="http://www.ggweijie.com:8838/upload/file"
                    :headers="myHeaders"
                    :file-list="param.imageUrlList"
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
            <el-form-item prop="mediaIntro" label="简介">
                <el-input type="textarea" v-model="param.mediaIntro" placeholder="请输入简介" :rows="5"></el-input>
            </el-form-item>
            <el-form-item prop="mediaDesc" label="内容">
                <el-input type="textarea" v-model="param.mediaDesc" placeholder="请输入内容" :rows="5"></el-input>
            </el-form-item>
            <el-form-item prop="mark" label="备注">
                <el-input type="textarea" v-model="param.mark" placeholder="请输入备注" :rows="5"></el-input>
            </el-form-item>
            <el-form-item prop="status" label="状态">
                <el-radio v-model="param.status" label="1">正常</el-radio>
                <el-radio v-model="param.status" label="2">禁用</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
let token =  sessionStorage.getItem('token') // 要保证取到
import { addNav, updateNav, listNav, mediaList, updateMedia, addMedia } from '@/api/web';
export default {
    props: {
        onCancel: Function
    },
    data () {
        return {
            param: {
                mediaImageurl: 'https://baijia-1301025608.cos.ap-shanghai.myqcloud.com/322473761f7a41f18bff13e36f35b958.jpg'
            },
            typeArr: [
                {
                    value: 1,
                    label: '轮播图'
                },
                {
                    value: 2,
                    label: '导航管理'
                },
                {
                    value: 3,
                    label: '内容管理'
                },
                {
                    value: 4,
                    label: '其他'
                }
            ],
            myHeaders: { Authorization: token },
            dialogImageUrl: '',
            dialogVisible: false,
            rules: {
                mediaName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                mediaImageurl: [{ required: true, message: '请上传图片', trigger: 'blur' },],
                mediaIntro: [{ required: true, message: '请输入简介', trigger: 'blur' }],
                mediaDesc: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
            },
        }
    },
    methods: {
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
        cancel() {
            this.onCancel && this.onCancel()
        },
        // 保存编辑/添加
        saveEdit() {
            console.log(this.param)
            this.$refs.form.validate(valid => {
                if (valid) {
                    addMedia(this.param).then(res => {
                        console.log(res)
                        if (res.code === 200) {
                            this.onCancel && this.onCancel()
                        }
                    })
                }
            })
        },
    }
}
</script>

<style scoped>

</style>