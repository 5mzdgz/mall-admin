<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
                v-for="item of chargeArr"
                :key="item.id"
                :label="item.cycleName"
                :name="item.cycleName"
            >
                <el-button type="primary" class="top-select" @click="handleEdit(0, 0, item.id, '添加')">添加</el-button>
                <el-table :data="item.cycleArr" style="width: 100%">
                    >
                    <el-table-column property="id" label="ID" width="50"></el-table-column>
                    <el-table-column property="itemName" label="名称"></el-table-column>
                    <el-table-column property="backColour" label="标签颜色" v-if="item.background">
                        <template slot-scope="scope">
                            <div class="block" :style="{background: scope.row.backColour}"></div>
                        </template>
                    </el-table-column>
                    <el-table-column label="显示状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.status===1?'上架':'下架'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="createTime" label="创建时间"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row, item.id, '编辑')"
                            >编辑</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleUpperLower(scope.$index, scope.row, 1)"
                            >上架</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleUpperLower(scope.$index, scope.row, 2)"
                            >下架</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.page"
                        :page-size="query.pageSize"
                        :total="query.pageTotal"
                        @current-change="handlePageChange"
                    ></el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 编辑弹出框 -->
        <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="30%">
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="itemName">
                    <el-input v-model="param.itemName" placeholder="请输入标签"></el-input>
                </el-form-item>
                <el-form-item prop="backColour" v-if="id===1">
                    <el-input placeholder="请输入十六进制颜色值" v-model="param.backColour"></el-input>
                </el-form-item>
                <el-form-item prop="status">
                    <el-radio v-model="param.status" label="1">上架</el-radio>
                    <el-radio v-model="param.status" label="2">下架</el-radio>
                </el-form-item>
                <textarea name="mark" placeholder="备注" v-model="param.mark" id="" cols="30" rows="5"></textarea>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { attrsArr } from '@/api/attrs';
export default {
    data() {
        let validateColor = (rule, value, callback) => {
            let reg = /^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/
            if (value === '') {
                callback(new Error('不能为空'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入十六进制颜色值!'));
            } else {
                callback();
            }
        };
        return {
            dialogTitle: '',
            param: {
                itemName: '',
                backColour: '',
                status: '',
                mark: ''
            },
            rules: {
                itemName: [{ required: true, message: '请输入标签', trigger: 'blur' }],
                backColour: [{ validator: validateColor, trigger: 'blur' }],
            },
            query: {
                url: '/attr/adLabelList',
                page: 1,
                pageSize: 10,
                pageTotal: 0
            },
            activeName: '标签',
            editVisible: false,
            chargeArr: [
                {
                    id: 1,
                    cycleName: '标签',
                    background: true,
                    cycleArr: []
                },
                {
                    id: 2,
                    cycleName: '类型',
                    cycleArr: []
                },
                {
                    id: 3,
                    cycleName: '区域',
                    cycleArr: []
                },
                {
                    id: 4,
                    cycleName: '价格',
                    cycleArr: []
                },
                {
                    id: 5,
                    cycleName: '周期',
                    cycleArr: []
                }
            ],
            currentRow: null,
            index: 0,
            row: {},
            id: 1
        };
    },
    created() {
        this.getAttrsArr(this.query)
    },
    methods: {
        getAttrsArr(query) {
            attrsArr(query).then(res => {
                console.log(res)
                if (this.activeName === '标签') {
                    res.data.records.forEach(element => {
                        element.id = element.labelId
                        element.itemName = element.labelName
                    });
                    this.chargeArr[0].cycleArr = res.data.records
                }
                if (this.activeName === '类型') {
                    res.data.records.forEach(element => {
                        element.id = element.typeId
                        element.itemName = element.typeName
                    });
                    this.chargeArr[1].cycleArr = res.data.records
                }
                if (this.activeName === '区域') {
                    res.data.records.forEach(element => {
                        element.id = element.areaId
                        element.itemName = element.areaName
                    });
                    this.chargeArr[2].cycleArr = res.data.records
                }
                if (this.activeName === '价格') {
                    res.data.records.forEach(element => {
                        element.id = element.priceId
                        element.itemName = element.priceName
                    });
                    this.chargeArr[3].cycleArr = res.data.records
                }
                if (this.activeName === '周期') {
                    res.data.records.forEach(element => {
                        element.id = element.cycleId
                        element.itemName = element.cycleName
                    });
                    this.chargeArr[4].cycleArr = res.data.records
                }
                this.query.pageTotal = res.data.total
            })
        },
        
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
        },
        handleClick(tab, event) {
            console.log(tab, event);
            let url = '';
            if (tab.index === '0') {
                url = '/attr/adLabelList'
            } else if(tab.index === '1') {
                url = '/attr/adTypeList'
            } else if(tab.index === '2') {
                url = '/attr/adAreaList'
            } else if(tab.index === '3') {
                url = '/attr/adPriceList'
            } else {
                url = '/attr/adCycleList'
            }
            this.query.url = url
            this.getAttrsArr(this.query)
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        handleEdit(rowIndex, row, id, handleType) {
            console.log(rowIndex, row, id, handleType)
            this.index = rowIndex
            this.row = row
            this.id = id
            switch(id) {
                case 1:
                this.dialogTitle = handleType + '标签'
                break;
                case 2:
                this.dialogTitle = handleType + '类型'
                break;
                case 3:
                this.dialogTitle = handleType + '区域'
                break;
                case 4:
                this.dialogTitle = handleType + '价格'
                break;
                case 5:
                this.dialogTitle = handleType + '周期'
                break;
            }
            this.editVisible = true
        },
        // 保存编辑
        saveEdit() {
            
        },
        handleUpperLower() {

        }
    }
};
</script>

<style scoped>
.row-expand-cover td:last-child .el-icon-arrow-right {
    visibility: hidden;
}
.plus-btn {
    margin-bottom: 15px;
}

.top-select {
    /* float: right; */
    margin: 0 20px 20px 0;
}

.block {
    width: 100px;
    height: 50px;
    background: #ff0000;
}
.red {
    color: #ff0000;
}

.dialg-content {
    width: 100%;
    text-align: center;
    color: #ff0000;
}

.right-box {
    padding: 0 10px;
}

textarea {
    width: 100%;
    margin-top: 20px;
    line-height: 23px;
}
</style>
