<template>
    <div>
        <div class="container meter-box">
            <div class="left-box">
                <el-row>
                    <el-col>
                        <el-select v-model="tung" class="top-select" placeholder="请选择楼栋">
                            <el-option
                                v-for="item in tungs"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-select v-model="unit" class="top-select" placeholder="请选择单元">
                            <el-option
                                v-for="item in units"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <el-select v-model="number" class="top-select" placeholder="请选择房号">
                            <el-option
                                v-for="item in numbers"
                                :key="item.value"
                                :label="item.label"
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
                    <div class="input-box">
                        <el-input v-model="username" placeholder="请输入业主姓名"></el-input>
                    </div>
                    <div class="input-box">
                        <el-input v-model="userPhone" placeholder="请输入业主手机"></el-input>
                    </div>
                </el-row>
            </div>
            <div class="right-box">
                <el-row class="from-right-box">
                    <el-button type="primary" class="top-select">导入账单</el-button>
                    <el-button type="primary" class="top-select">导出账单</el-button>
                </el-row>
                <el-row class="from-right-box">
                    <el-button type="primary" icon="el-icon-plus" class="top-select">添加</el-button>
                </el-row>
            </div>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="expand">
                    >
                    <template slot-scope="props">
                        <el-table
                            ref="singleTable"
                            :data="props.row.children"
                            highlight-current-row
                            @current-change="handleCurrentChange"
                            style="width: 100%"
                        >
                            <el-table-column property="date" label="名称" width="120"></el-table-column>
                            <el-table-column property="name" label="计量方式" width="120"></el-table-column>
                            <el-table-column property="address" label="上次抄表"></el-table-column>
                            <el-table-column property="address" label="本次抄表"></el-table-column>
                            <el-table-column property="address" label="单价"></el-table-column>
                            <el-table-column property="address" label="用量"></el-table-column>
                            <el-table-column property="address" label="总金额"></el-table-column>
                            <el-table-column label="操作" width="180">
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
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column label="所在房屋"></el-table-column>
                <el-table-column label="业主名称">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="账单总额"></el-table-column>
                <el-table-column prop="name" label="归属月份"></el-table-column>
                <el-table-column label="截止日期">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='已认证'?'success':(scope.row.state==='未认证'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
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
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            tungs: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            units: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            numbers: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            tung: '',
            unit: '',
            number: '',
            username: '',
            userPhone: ''
        };
    },
    created() {
        this.getData();
    },
    mounted() {},
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
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
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.meter-box {
    display: flex;
    justify-content: space-between;
}
.container {
    margin-bottom: 20px;
}
.top-select {
    width: 120px;
    margin-right: 20px;
}
.input-box {
    width: 190px;
    display: inline-block;
    margin-top: 10px;
    margin-right: 20px;
}
.from-right-box {
    text-align: right;
}
.from-right-box:nth-child(2) {
    margin-top: 15px;
}
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
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
