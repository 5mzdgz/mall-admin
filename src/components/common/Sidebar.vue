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
                    index: '1',
                    title: '用户管理',
                    userType: 4,
                    subs: [
                        {
                            index: 'userList',
                            title: '用户列表'
                        },
                        {
                            index: 'permission',
                            title: '权限管理',
                        },
                        {
                            index: 'roleList',
                            title: '角色列表',
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: '2',
                    title: '广告管理',
                    subs: [
                        {
                            index: 'adverList',
                            title: '广告位列表'
                        },
                        {
                            index: 'examine',
                            title: '广告位审核',
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'adAttrs',
                    title: '广告属性'
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '4',
                    title: '内容管理',
                    subs: [
                        {
                            index: 'wxhome',
                            title: '首页轮播图'
                        },
                        {
                            index: 'wxnav',
                            title: '导航管理'
                        },
                        {
                            index: 'wxother',
                            title: '其他内容'
                        }
                    ]
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: '5',
                    title: '企业管理',
                    subs: [
                        {
                            index: 'enterpriseList',
                            title: '企业列表'
                        },
                        {
                            index: 'enterprise',
                            title: '企业认证'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'analysis',
                    title: '数据分析'
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: 'backstage',
                    title: '后台管理'
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
                        // {
                        //     index: 'permission',
                        //     title: '权限测试'
                        // },
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
        // this.getUserData();
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
