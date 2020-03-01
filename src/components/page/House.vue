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
                <el-table-column prop="houseId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column label="区域" prop="areaName" align="center"></el-table-column>
                <el-table-column label="楼栋" prop="tungs" align="center"></el-table-column>
                <el-table-column label="单元" prop="units" align="center"></el-table-column>
                <el-table-column label="房号" prop="houseNum" align="center"></el-table-column>
                <el-table-column label="户型" prop="househx" align="center">
                    <!-- <template slot-scope="scope">￥{{scope.row.money}}</template> -->
                </el-table-column>
                <el-table-column label="房屋面积" prop="houseSquare" align="center"></el-table-column>
                <el-table-column prop="name" label="业主" align="center"></el-table-column>
                <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.authStatus==='1'?'success':(scope.row.authStatus!='1'?'danger':'')"
                        >{{scope.row.authStatus === '1' ? '未认证' : '待认证'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="marks" label="备注" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-select
                            v-model="state[scope.row.id]"
                            @change="changeSelect(scope.row.id)"
                            placeholder="更多"
                        >
                            <el-option
                                v-for="item in operations"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
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
                <el-form-item label="楼栋" prop="tungs">
                    <el-input v-model="param.tungs" @keyup.enter.native="saveEdit()"></el-input>
                </el-form-item>
                <el-form-item label="单元" prop="units">
                    <el-input v-model="param.units" @keyup.enter.native="saveEdit()"></el-input>
                </el-form-item>
                <el-form-item label="房号" prop="houseNum">
                    <el-input v-model="param.houseNum" @keyup.enter.native="saveEdit()"></el-input>
                </el-form-item>
                <el-form-item label="房屋面积" prop="houseSquare">
                    <el-input v-model="param.houseSquare" @keyup.enter.native="saveEdit()"></el-input>
                </el-form-item>
                <el-form-item label="户型" prop="househx">
                    <el-input v-model="param.househx" @keyup.enter.native="saveEdit()"></el-input>
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
import { houseList, addHouse } from '@/api/index';
import { fetchData } from '../../api/index';
export default {
    name: 'house',
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
            operations: [
                {
                    value: '操作',
                    label: '操作'
                },
                {
                    value: '查看住户',
                    label: '查看住户'
                },
                {
                    value: '房屋收费项目',
                    label: '房屋收费项目'
                },
                {
                    value: '编辑',
                    label: '编辑'
                },
                {
                    value: '删除',
                    label: '删除'
                }
            ],
            tung: '',
            unit: '',
            number: '',
            username: '',
            userPhone: '',
            state: {},
            param: {
                areaId: '14',
                areaName: '',
                tungs: '',
                units: '',
                houseNum: '',
                houseSquare: '',
                househx: ''
            },
            rules: {
                areaName: [{ required: true, message: '请输入小区名称', trigger: 'blur' }],
                tungs: [{ required: true, message: '请输入楼栋', trigger: 'blur' }],
                units: [{ required: true, message: '请输入单元', trigger: 'blur' }],
                houseNum: [{ required: true, message: '请输入房号', trigger: 'blur' }],
                houseSquare: [{ required: true, message: '请输入房屋面积', trigger: 'blur' }],
                househx: [{ required: true, message: '请输入户型', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getHuoseList();
    },
    mounted() {
        this.tableData.forEach(item => {
            this.$set(this.state, item.id, ''); // 父、  子、  子的赋值
        });
    },
    methods: {
        //获取房子列表
        getHuoseList() {
            houseList().then(res => {
                console.log(res);
                res.data.records.forEach(item => {
                    const identityItem = item.housePeopleEntity.filter(i => i.identity === 1);
                    if (identityItem.length > 0) {
                        item.identity = identityItem[0].identity;
                        item.name = identityItem[0].name;
                        item.authStatus = identityItem[0].status;
                    }
                });
                this.tableData = res.data.records;
            });
        },
        // 下拉框的选择 可以打印看
        changeSelect(id) {
            console.log(id, this.state[id]);
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
                    addHouse(this.param).then(res => {
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
