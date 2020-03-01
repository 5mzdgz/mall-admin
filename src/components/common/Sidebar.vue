<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import { userData } from '@/api/index';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '概述首页'
                },
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '用户管理',
                    userType: 4
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: '2',
                    title: '社区管理',
                    subs: [
                        {
                            index: 'house',
                            title: '房屋管理'
                        },
                        {
                            index: 'owner',
                            title: '业主管理',
                        },
                        {
                            index: 'authentication',
                            title: '房屋认证'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'charge',
                    title: '收费管理'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '账单管理',
                    subs: [
                        {
                            index: 'unpaid',
                            title: '未缴费账单'
                        },
                        {
                            index: 'meterReading',
                            title: '抄表录入'
                        },
                        {
                            index: 'generateBills',
                            title: '生成账单'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'finance',
                    title: '财务管理'
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'enterprise',
                    title: '企业管理'
                },
                {
                    icon: 'el-icon-rank',
                    index: '6',
                    title: '拖拽组件',
                    subs: [
                        {
                            index: 'drag',
                            title: '拖拽列表'
                        },
                        {
                            index: 'dialog',
                            title: '拖拽弹框'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-global',
                    index: 'i18n',
                    title: '国际化功能'
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '7',
                    title: '错误处理',
                    subs: [
                        {
                            index: 'permission',
                            title: '权限测试'
                        },
                        {
                            index: '404',
                            title: '404页面'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-redpacket_fill',
                    index: '/donate',
                    title: '支持作者'
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        this.getUserData();
    },
    methods: {
        getUserData() {
            userData().then(res => {
                if (res.code === 200) {
                    this.$store.dispatch('userData', res.data)
                    this.getAuthNav(res.data)
                }
                console.log(res)
            })
        },
        getAuthNav(userData) {
            console.log('用户信息', this.userData)
            
            if (userData.userType === '4') {
                const  navData = this.items.filter(item => item.userType !='4');
                this.items = navData;
            }
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
