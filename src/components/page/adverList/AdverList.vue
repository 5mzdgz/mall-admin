<template>
    <div>
        <div class="container">
            <edit-search :on-search="search"></edit-search>
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
                    :total="query.pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <edit-dialog v-else :attrsData="attrsData" :ruleForm="ruleForm" :on-close="close"></edit-dialog>
    </div>
</template>

<script>
import { adStatusList, updateAd, navArr, updateMine, searchAtrrt } from '@/api/examine';
import EditDialog from './EditDialog'
import EditSearch from './EditSearch'
export default {
    components: {
        EditDialog,
        EditSearch
    },
    data() {
        return {
            show: true,
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 4,
                pageTotal: 0,
                checkStatus: -1
            },
            ruleForm: {},
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
    methods: {
        search(parmas) {
            console.log(parmas)
            searchAtrrt(parmas).then(res => {
                console.log(res)
                if (res.code === 200) {
                    this.chargeArr = res.data.records
                    this.query.pageTotal = res.data.total
                }
            })
        },
        close() {
            this.show = true
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
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            console.log(this.query)
            this.getAdStatusList(this.query)
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
    }
};
</script>

<style scoped>
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
