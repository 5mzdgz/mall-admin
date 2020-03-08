<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
                v-for="(item, index) of chargeArr"
                :key="index"
                :label="item.cycleName"
                :name="item.cycleName"
            >
                <el-table :data="item.cycleArr" style="width: 100%">
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
                            <!-- <p>{{scope.row.adLeaseEntity.contactPhone}}</p> -->
                        </template>
                    </el-table-column>
                    <el-table-column property="createTime" label="申请时间"></el-table-column>
                    <el-table-column label="审核状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.checkStatus===4">已通过</span>
                            <span v-if="scope.row.checkStatus===3">未通过</span>
                            <span v-if="scope.row.checkStatus===2">待审核</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="显示状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.checkStatus===5?'下架':'上架'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="descr" label="备注"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                            >详情</el-button>
                            <el-button
                                v-if="scope.row.checkStatus != 4 && scope.row.checkStatus != 3"
                                type="text"
                                icon="el-icon-edit"
                                @click="handleExamine(scope.$index, scope.row, 4)"
                            >通过</el-button>
                            <el-button
                            v-if="scope.row.checkStatus != 4 && scope.row.checkStatus != 3"
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleExamine(scope.$index, scope.row, 3)"
                            >不通过</el-button>
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
            </el-tab-pane>
        </el-tabs>
        <!-- 编辑弹出框 -->
        <el-dialog title="审核" :visible.sync="editVisible" width="30%">
            <div class="dialg-content">请认真核对信息</div>
            <textarea name="mark" v-if="checkStatus === 3" placeholder="请填写审核理由，不少于10个字" v-model="mark" id="" cols="30" rows="10"></textarea>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { adStatusList, updateAd } from '@/api/examine';
export default {
    data() {
        return {
            query: {
                itemId: 0,
                pageIndex: 1,
                pageSize: 5,
                checkStatus: -1,
                pageTotal: 0
            },
            activeName: '全部',
            editVisible: false,
            mark: '',
            chargeArr: [
                {
                    id: 1,
                    cycleName: '全部',
                    cycleArr: []
                },
                {
                    id: 2,
                    cycleName: '已通过',
                    cycleArr: []
                },
                {
                    id: 3,
                    cycleName: '待审核',
                    cycleArr: []
                },
                {
                    id: 4,
                    cycleName: '未通过',
                    cycleArr: []
                }
            ],
            currentRow: null,
            checkStatus: 4
        };
    },
    created() {
        this.getAdStatusList(this.query)
    },
    methods: {
        /**
         * 获取状态列表
         */
        getAdStatusList(query) {
            adStatusList(query).then(res => {
                console.log(res)
                switch(this.query.checkStatus) {
                    case -1:
                        this.chargeArr[0].cycleArr = res.data.records
                        break;
                    case 4:
                        this.chargeArr[1].cycleArr = res.data.records
                        break;
                    case 2:
                        this.chargeArr[2].cycleArr = res.data.records
                        break;
                    case 3:
                        this.chargeArr[3].cycleArr = res.data.records
                        break;
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
            const index = parseInt(tab.index);
            this.chargeIndex = index
            let query = this.query;
            if (index) {
                query.checkStatus = index
                if (index === 1) {
                    query.checkStatus = 4
                }
            } else {
                query = {
                    checkStatus: -1,
                    pageIndex: 1,
                    pageSize: 5
                }
            }
            this.getAdStatusList(query);
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        // 编辑操作
        handleExamine(index, row, checkStatus) {
            this.idx = index;
            this.currentRow = row;
            this.checkStatus = checkStatus
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            const obj = {
                itemId: this.currentRow.itemId,
                checkStatus: this.checkStatus,
                mark: this.mark
            }
            console.log(obj)
            if(this.checkStatus === 3) {
                if(this.mark.replace(/\s*/g,"").length <= 10)  {
                    this.$message.error('长度不够');
                    return
                }
            }
            console.log(obj)
            updateAd(obj).then(res => {
                console.log(res)
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                if (obj.checkStatus === 4) {
                    this.currentRow.checkStatus = 4
                } else {
                    this.currentRow.checkStatus = 3
                }
                if (this.chargeIndex === 2) {
                    this.chargeArr[this.chargeIndex].cycleArr.splice(this.idx, 1);
                } else {
                    this.$set(this.chargeArr[this.chargeIndex].cycleArr, this.idx, this.currentRow);
                }
            })
            this.editVisible = false;
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
.dialg-content {
    margin-bottom: 20px;
    color: red;
}
textarea {
    width: 100%;
}
.red {
    color: #ff0000;
}

.right-box {
    padding: 0 10px;
}
</style>
