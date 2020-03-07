import Vue from 'vue';
import Router from 'vue-router';
import Store from '@/store'

Vue.use(Router);

 const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页', need_login: true }
                },
                {
                    path: '/examine',
                    component: () => import(/* webpackChunkName: "examine" */ '../components/page/Examine.vue'),
                    meta: { title: '广告位审核' }
                },
                {
                    path: '/adverList',
                    component: () => import(/* webpackChunkName: "adverList" */ '../components/page/AdverList.vue'),
                    meta: { title: '广告位列表' }
                },
                {
                    path: '/roleList',
                    component: () => import(/* webpackChunkName: "roleList" */ '../components/page/RoleList.vue'),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/userList',
                    component: () => import(/* webpackChunkName: "userList" */ '../components/page/UserList.vue'),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/enterprise',
                    component: () => import(/* webpackChunkName: "enterprise" */ '../components/page/Enterprise.vue'),
                    meta: { title: '企业认证' }
                },
                {
                    path: '/enterpriseList',
                    component: () => import(/* webpackChunkName: "enterpriseList" */ '../components/page/EnterpriseList.vue'),
                    meta: { title: '企业列表' }
                },
                {
                    path: '/adLabel',
                    component: () => import(/* webpackChunkName: "adLabel" */ '../components/page/AdLabel.vue'),
                    meta: { title: '标签管理' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    path: '/adType',
                    component: () => import(/* webpackChunkName: "adType" */ '../components/page/AdType.vue'),
                    meta: { title: '类型管理' }
                },
                {
                    path: '/adArea',
                    component: () => import(/* webpackChunkName: "adArea" */ '../components/page/AdArea.vue'),
                    meta: { title: '区域管理' }
                },
                {
                    path: '/adPrice',
                    component: () => import(/* webpackChunkName: "adPrice" */ '../components/page/AdPrice.vue'),
                    meta: { title: '区域管理' }
                },
                {
                    path: '/analysis',
                    component: () => import(/* webpackChunkName: "analysis" */ '../components/page/Analysis.vue'),
                    meta: { title: '数据分析' }
                },
                {
                    path: '/backstage',
                    component: () => import(/* webpackChunkName: "backstage" */ '../components/page/Backstage.vue'),
                    meta: { title: '后台管理' }
                },
                {
                    path: '/wxhome',
                    component: () => import(/* webpackChunkName: "wxhome" */ '../components/page/Wxhome.vue'),
                    meta: { title: '小程序首页' }
                },
                {
                    path: '/wxnav',
                    component: () => import(/* webpackChunkName: "wxnav" */ '../components/page/Wxnav.vue'),
                    meta: { title: '小程序导航' }
                },
                {
                    path: '/wxother',
                    component: () => import(/* webpackChunkName: "wxother" */ '../components/page/Wxother.vue'),
                    meta: { title: '小程序其他' }
                },
                {
                    // vue-schart组件
                    path: '/enterprise',
                    component: () => import(/* webpackChunkName: "enterprise" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 广告台管理系统`;
    let token = sessionStorage.getItem('token');
    if (to.meta.need_login) {
        if (!token) {
            next('/login');
        } else {
            // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
            if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
                Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                    confirmButtonText: '确定'
                });
            } else {
                console.log(token)
                next();
            }
        }
    } else {
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

export default router
