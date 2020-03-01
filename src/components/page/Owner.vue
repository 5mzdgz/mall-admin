<template>
    <div>
        <div class="container">
            <el-row>
                <el-col :span="17">
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
                <el-col :span="7" class="from-right-box">
                    <el-button
                        type="primary"
                        icon="el-icon-plus"
                        class="top-select"
                        @click="addProject"
                    >添加</el-button>
                    <el-button type="primary" class="top-select">导入数据</el-button>
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
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="peopleId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
                <el-table-column label="住户身份" align="center">
                    <template slot-scope="scope">
                        {{scope.row.identity > 1 ? '住户':'业主'}}
                    </template>
                </el-table-column>
                <el-table-column label="所在房屋" align="center"></el-table-column>
                <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
                <el-table-column prop="marks" label="备注" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
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
            <el-form ref="form" :rules="rules" :model="param" label-width="90px">
                <el-form-item label="小区" prop="areaName">
                    <el-input v-model="param.areaName" @keyup.enter.native="saveEdit()"></el-input>
                </el-form-item>
                <el-form-item label="家属/业主" prop="name">
                    <el-input v-model="param.name" @keyup.enter.native="saveEdit()"></el-input>
                </el-form-item>
                <el-form-item label="房号" prop="houseId">
                    <el-input v-model="param.houseId" @keyup.enter.native="saveEdit()"></el-input>
                </el-form-item>
                <!-- <span slot="footer" class="dialog-footer"> -->
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
                <!-- </span> -->
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData , addPeople, peopleList} from '@/api/index';
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
            userPhone: '',
            param: {
                areaId: '14',
                areaName: '',
                name: '',
                houseId: '6',
                identity: '1'
            },
            rules: {
                areaName: [{ required: true, message: '请输入小区名称', trigger: 'blur' }],
                name: [{ required: true, message: '请输入业主姓名', trigger: 'blur' }],
                houseId: [{ required: true, message: '请输入房号', trigger: 'blur' }],
                identity: [{ required: true, message: '请输入业主', trigger: 'blur' }],
                areaId: [{ required: true, message: '请输入小区', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getPeopleList()
    },
    mounted() {},
    methods: {
        getPeopleList() {
            peopleList().then(res => {
                console.log(res)
                this.tableData = res.data.records
            })
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
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
        //添加弹窗
        addProject() {
            this.editVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    console.log(this.param)
                    addPeople(this.param).then(res => {
                        console.log(res)
                        this.editVisible = false
                    })
                }
            });
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
