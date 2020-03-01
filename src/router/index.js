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
                    path: '/finance',
                    component: () => import(/* webpackChunkName: "finance" */ '../components/page/Finance.vue'),
                    meta: { title: '财务管理' }
                },
                {
                    path: '/house',
                    component: () => import(/* webpackChunkName: "house" */ '../components/page/House.vue'),
                    meta: { title: '房屋管理' }
                },
                {
                    path: '/owner',
                    component: () => import(/* webpackChunkName: "owner" */ '../components/page/Owner.vue'),
                    meta: { title: '业主管理' }
                },
                {
                    path: '/charge',
                    component: () => import(/* webpackChunkName: "charge" */ '../components/page/Charge.vue'),
                    meta: { title: '收费管理' }
                },
                {
                    path: '/unpaid',
                    component: () => import(/* webpackChunkName: "unpaid" */ '../components/page/Unpaid.vue'),
                    meta: { title: '未缴费账单' }
                },
                {
                    path: '/meterReading',
                    component: () => import(/* webpackChunkName: "meterReading" */ '../components/page/MeterReading.vue'),
                    meta: { title: '抄表录入' }
                },
                {
                    path: '/generateBills',
                    component: () => import(/* webpackChunkName: "generateBills" */ '../components/page/GenerateBills.vue'),
                    meta: { title: '生成账单' }
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
    document.title = `${to.meta.title} | 物业后台管理系统`;
    const token = sessionStorage.getItem('token');
    console.log(token)
    console.log(to.path)
    if (to.path != null) {
        if (to.meta.need_login) {
            if (!token) {
                next('/login')
            } else {
                if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
                    Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                        confirmButtonText: '确定'
                    });
                } else {
                    next();
                }
            }
        }
    }
});

export default router
