<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
                v-for="item of chargeArr"
                :key="item.id"
                :label="item.cycleName"
                :name="item.cycleName"
            >
                <el-table :data="tableData" style="width: 100%">
                    >
                    <el-table-column property="companyId" label="ID" width="50"></el-table-column>
                    <el-table-column property="date" label="企业信息">
                        <template slot-scope="scope">
                            <div class="flex-r">
                                <div class="demo-image__preview">
                                    <el-image
                                        style="width: 100px; height: 100px"
                                        :src="scope.row.companyImage"
                                        :preview-src-list="srcList"
                                    ></el-image>
                                </div>
                                <div class="right-box">
                                    <p>{{scope.row.companyName}}</p>
                                    <p>{{scope.row.companyCode}}</p>
                                    <p>{{scope.row.companyAddress}}</p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="法人信息">
                        <template slot-scope="scope">
                            <p>{{scope.row.companyFaren}}</p>
                            <p>{{scope.row.companyFarenId}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="联系人信息">
                        <template slot-scope="scope">
                            <p>{{scope.row.companyContact}}</p>
                            <p>{{scope.row.contactPhone}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column property="checkTime" label="认证时间"></el-table-column>
                    <el-table-column property="statusName" label="认证状态"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                            >详情</el-button>
                            <el-button
                                v-if="query.status < 2"
                                type="text"
                                icon="el-icon-edit"
                                @click="handleCheck(scope.$index, scope.row, 2)"
                            >通过</el-button>
                            <el-button
                                v-if="query.status < 2"
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleCheck(scope.$index, scope.row, 3)"
                            >不通过</el-button>
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
        <el-dialog title="审核" :visible.sync="editVisible" width="30%">
            <div class="dialg-content">请认真核对信息</div>
            <textarea v-if="status===3" name="mark" placeholder="请填写审核理由，不少于10个字" v-model="mark" id="" cols="30" rows="10"></textarea>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {comList, comuUdate } from '../../api/index';
export default {
    data() {
        return {
            query: {
                page: 1,
                pageSize: 10,
                pageTotal: 0,
                status: -1
            },
            activeName: '全部',
            editVisible: false,
            srcList: [],
            chargeArr: [
                {
                    id: 1,
                    cycleName: '全部',
                    cycleArr: []
                },
                {
                    id: 2,
                    cycleName: '待审核',
                    cycleArr: []
                },
                {
                    id: 3,
                    cycleName: '审核通过',
                    cycleArr: []
                },
                {
                    id: 4,
                    cycleName: '未通过',
                    cycleArr: []
                }
            ],
            tableData: [],
            currentRow: null,
            index: 0,
            row: {},
            status: 2,
            mark: ''
        };
    },
    created() {
        this.getComList(this.query);
    },
    methods: {
        /***
         * 认证信息
         */
        handleCheck(index, row, status) {
            this.index = index
            this.row = row
            this.status = status
            this.editVisible = true
            console.log(index, row, status)
        },
        /**
         * 获取状态数据
         */
        getComList(query) {
            comList(query).then(res => {
                console.log(res)
                this.handleData(res.data)
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
        },
        handleClick(tab, event) {
            console.log(tab, event);
            this.query.status = tab.index === '0' ? -1 : tab.index
            this.getComList(this.query)
        },
        /**
         * data数据处理
         */
        handleData(data) {
            data.records.forEach(element => {
                if(element.status === 1) {
                    element.statusName = '待审核'
                } else if(element.status === 2) {
                    element.statusName = '审核通过'
                } else {
                    element.statusName = '未通过'
                }
                this.srcList.push(element.companyImage)
            });
            this.query.pageTotal = data.total
            this.tableData = data.records
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        // 保存编辑
        saveEdit() {
            const parmas = {
                companyId: this.row.companyId,
                status: this.status
            }
            if(this.status === 3) {
                if(this.mark.replace(/\s*/g,"").length <= 10)  {
                    this.$message.error('长度不够');
                    return
                }
            }
            
            comuUdate(parmas).then(res => {
                console.log(res)
                if (res.code === 200) {
                    console.log('aaaa'+this.query.status)
                    if (this.query.status === '1' || this.query.status === '2') {
                        
                        console.log(111)
                        this.tableData.splice(this.index, 1)
                    } else {
                        this.row.statusName = this.status === 3 ? '未通过' : '审核通过'
                        this.$set(this.tableData, this.index, this.row);
                    }
                }
            })
            this.editVisible = false
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
