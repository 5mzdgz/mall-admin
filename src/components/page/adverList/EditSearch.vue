<template>
    <div class="search">
        <el-form
                :model="form"
                label-width="80px"
                :inline="true"
                class="demo-ruleForm"
            >
            <el-row>
                <el-form-item label="用户名称" prop="contactName">
                    <el-input clearable placeholder="请输入用户名称" v-model="form.contactName"></el-input> 
                </el-form-item>
                <el-form-item label="电话号码" prop="contactPhone">
                    <el-input clearable placeholder="请输入电话号码" v-model="form.contactPhone"></el-input> 
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="top-select" @click="searchData">查询</el-button>
                    <el-button type="primary" @click="handleShow">
                        更多
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                </el-form-item>
            </el-row>
            <el-row>
                <el-row v-if="isShow">
                    <el-form-item>
                        <el-button class="btn-box" type="primary">最低价格</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn-box" type="primary">最高价格</el-button>
                    </el-form-item>
                    <el-form-item prop="status">
                        <el-select v-model="form.status" clearable class="btn-box" placeholder="在展状态">
                            <el-option
                                v-for="item in statusArr"
                                :key="item.value"
                                :label="item.status"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="checkStatus">
                        <el-select v-model="form.checkStatus" clearable class="btn-box" placeholder="广告位状态">
                            <el-option
                                v-for="item in adStatusArr"
                                :key="item.value"
                                :label="item.checkStatus"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    props:{
        onSearch: Function,
    },
    data () {
        return {
            isShow: false,
            form: {
                page: 1,
                pageSize: 10
            },
            statusArr: [
                {
                    value: 4,
                    status: '上架'
                },
                {
                    value: 5,
                    status: '下架'
                }
            ],
            adStatusArr: [
                {
                    value: -1,
                    checkStatus: '全部'
                },
                {
                    value: 4,
                    checkStatus: '已通过'
                },
                {
                    value: 2,
                    checkStatus: '待审核'
                },
                {
                    value: 3,
                    checkStatus: '未通过'
                }
            ]
        }
    },
    methods: {
        searchData() {
            this.onSearch && this.onSearch(this.form)
        },
        handleShow() {
            this.isShow = !this.isShow
        },
        reset() {
            this.form = {}
            // this.onReset && this.onReset(this.form)
        }
    }
}
</script>

<style scoped>

</style>