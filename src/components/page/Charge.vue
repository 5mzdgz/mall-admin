<template>
    <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
                v-for="item of chargeArr"
                :key="item.id"
                label="周期性项目"
                :name="item.cycleName"
            >
                <el-button class="plus-btn" type="primary" icon="el-icon-plus">添加</el-button>
                <el-table :data="tableData" style="width: 100%">
                    >
                    <el-table-column type="index" label="ID" width="50"></el-table-column>
                    <el-table-column property="date" label="名称"></el-table-column>
                    <el-table-column property="name" label="单价"></el-table-column>
                    <el-table-column property="date" label="计量方式"></el-table-column>
                    <el-table-column property="date" label="违约系数"></el-table-column>
                    <el-table-column property="date" label="创建时间"></el-table-column>
                    <el-table-column property="address" label="备注"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
export default {
    data() {
        return {
            activeName: '周期性项目',
            editVisible: false,
            form: {},
            chargeArr: [
                {
                    id: 1,
                    cycleName: '周期性项目',
                    cycleArr: []
                },
                {
                    id: 2,
                    cycleName: '临时性项目',
                    cycleArr: []
                },
                {
                    id: 3,
                    cycleName: '抄表类项目',
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
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
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
</style>
