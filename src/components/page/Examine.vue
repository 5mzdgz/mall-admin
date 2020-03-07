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
                    <el-table-column label="ID" width="50"></el-table-column>
                    <el-table-column property="date" label="企业信息">
                        <template slot-scope="scope">
                            <div class="flex-r">
                                <div class="demo-image__preview">
                                    <el-image
                                        style="width: 100px; height: 100px"
                                        :src="url"
                                        :preview-src-list="srcList"
                                    ></el-image>
                                </div>
                                <div class="right-box">
                                    <p>广西XX科技有限公司</p>
                                    <p>456x45687864313</p>
                                    <p>广西贵港市港北区中山北路333号</p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="name" label="法人信息">
                        <template slot-scope="scope">
                            <p>张三</p>
                            <p>450801199001019955</p>
                        </template>
                    </el-table-column>
                    <el-table-column property="date" label="联系人信息">
                        <template slot-scope="scope">
                            <p>张三</p>
                            <p>450801199001019955</p>
                        </template>
                    </el-table-column>
                    <el-table-column property="date" label="认证时间"></el-table-column>
                    <el-table-column label="认证状态">未通过</el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                            >详情</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleDelete(scope.$index, scope.row)"
                            >通过</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
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
                        :total="pageTotal"
                        @current-change="handlePageChange"
                    ></el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            pageTotal: 0,
            activeName: '全部',
            editVisible: false,
            form: {},
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            ],
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
                    cycleName: '已审核',
                    cycleArr: []
                },
                {
                    id: 4,
                    cycleName: '未通过',
                    cycleArr: []
                }
            ],
            tableData: [
                {
                    id: 1,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    id: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    id: 3,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    children: [
                        {
                            id: 31,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        },
                        {
                            id: 32,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }
                    ]
                },
                {
                    id: 4,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ],
            currentRow: null
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
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
.red {
    color: #ff0000;
}

.right-box {
    padding: 0 10px;
}
</style>
