<template>
    <div class="container">
        <el-button type="primary" class="top-select" @click="handleEdit()">添加</el-button>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
                v-for="(item, index) of chargeArr"
                :key="index"
                :label="item.cycleName"
                :name="item.cycleName"
            >
                <el-table :data="item.cycleArr" style="width: 100%">
                    >
                    <el-table-column property="mediaId" label="ID" width="50"></el-table-column>
                    <el-table-column property="mediaName" label="标题"></el-table-column>
                    <el-table-column label="图片">
                        <template slot-scope="scope">
                            <div class="demo-image__preview">
                                <el-image
                                    style="width: 100px; height: 100px"
                                    :src="scope.row.mediaImageurl"
                                    :preview-src-list="imageUrlList"
                                ></el-image>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="url" label="链接"></el-table-column>
                    <el-table-column label="显示状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.status==='1'?'正常':'禁用'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="createTime" label="创建时间"></el-table-column>
                    <el-table-column property="mark" label="备注"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row, index, '编辑')"
                            >编辑</el-button>
                            <!-- <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleUpperLower(scope.$index, scope.row, 1)"
                            >上架</el-button>
                            <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleUpperLower(scope.$index, scope.row, 2)"
                            >下架</el-button> -->
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <edit-home :on-cancel="cancel"></edit-home>
        </el-dialog>
    </div>
</template>
<script>
import { addNav, updateNav, listNav, mediaList, updateMedia, addMedia } from '@/api/web';
import EditHome from './EditHome'
export default {
    components: {
        EditHome
    },
    data() {
        return {
            dialogTitle: '',
            src: '',
            imageUrlList: [],
            query: {
                page: 1,
                pageSize: 10
            },
            activeName: '轮播图',
            editVisible: false,
            chargeArr: [
                {
                    id: 1,
                    cycleName: '轮播图',
                    cycleArr: []
                },
                {
                    id: 2,
                    cycleName: '导航管理',
                    cycleArr: []
                },
                {
                    id: 3,
                    cycleName: '内容管理',
                    cycleArr: []
                },
                {
                    id: 4,
                    cycleName: '其他',
                    cycleArr: []
                }
            ],
            currentRow: null,
            index: 0,
            row: {},
            changeIndex: 0
        };
    },
    created() {
        
    },
    methods: {
        getListNav(query) {
            listNav(query).then(res => {
                console.log(res)
            })
        },
        getMediaList(query) {
            mediaList(query).then(res => {
                console.log(res)
                if (res.code === 200) {
                    this.chargeArr[2].cycleArr = res.data.records
                }
            })
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
        },
        handleClick(tab, event) {
            const index = parseInt(tab.index)
            switch(index) {
                case 0:
                break
                case 1:
                    this.getListNav(this.query)
                break
                case 2:
                    this.getMediaList(this.query)
                break
            }
        },
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        handleEdit(rowIndex, row, changeIndex, handleType) {
            this.editVisible = true
        },
        cancel() {
            this.editVisible = false
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
}
.red {
    color: #ff0000;
}
</style>
