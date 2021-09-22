import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'   // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/register',
    component: (resolve) => require(['@/views/register'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/index'], resolve),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'info',
        component: (resolve) => require(['@/views/system/user/info/index'], resolve),
        name: 'info',
        meta: { title: '个人资料', icon: 'user' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'shopInfo',
        component: (resolve) => require(['@/views/system/user/shopInfo/index'], resolve),
        name: 'shopInfo',
        meta: { title: '商家资料', icon: 'user' }
      }
    ]
  },
  
  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'Message',
        component: (resolve) => require(['@/views/content/Message/index'], resolve),
        name: 'Message',
        meta: { title: '消息', icon: 'user' }
      }
    ]
  },


  // 海报路由
  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'Poster',
        component: (resolve) => require(['@/views/content/Poster/index'], resolve),
        name: 'Poster',
        meta: { title: '海报', icon: 'user' }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'addPoster',
        component: (resolve) => require(['@/views/content/addPoster/index'], resolve),
        name: 'addPoster',
        meta: { title: '新增海报', icon: 'user' }
      }
    ]
  },


  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'editPoster',
        component: (resolve) => require(['@/views/content/editPoster/index'], resolve),
        name: 'editPoster',
        meta: { title: '修改海报', icon: 'user' }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'posterDetail',
        component: (resolve) => require(['@/views/content/posterDetail/index'], resolve),
        name: 'posterDetail',
        meta: { title: '查看海报', icon: 'user' }
      }
    ]
  },


  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'Activity',
        component: (resolve) => require(['@/views/content/Activity/index'], resolve),
        name: 'Activity',
        meta: { title: '活动方案', icon: 'user' }
      }
    ]
  },


  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'addActivity',
        component: (resolve) => require(['@/views/content/addActivity/index'], resolve),
        name: 'addActivity',
        meta: { title: '新增活动方案', icon: 'user' }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'editActivity',
        component: (resolve) => require(['@/views/content/editActivity/index'], resolve),
        name: 'editActivity',
        meta: { title: '修改活动方案', icon: 'user' }
      }
    ]
  },





  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'activityDetail',
        component: (resolve) => require(['@/views/content/activityDetail/index'], resolve),
        name: 'activityDetail',
        meta: { title: '查看活动', icon: 'user' }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'Class',
        component: (resolve) => require(['@/views/content/Class/index'], resolve),
        name: 'Class',
        meta: { title: '在线微课', icon: 'user' }
      }
    ]
  },
  
  
  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'addClass',
        component: (resolve) => require(['@/views/content/addClass/index'], resolve),
        name: 'addClass',
        meta: { title: '新增课程', icon: 'user' }
      }
    ]
  },
  
  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'editClass',
        component: (resolve) => require(['@/views/content/editClass/index'], resolve),
        name: 'editClass',
        meta: { title: '修改课程', icon: 'user' }
      }
    ]
  },
  
  

  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'classDetail',
        component: (resolve) => require(['@/views/content/classDetail/index'], resolve),
        name: 'classDetail',
        meta: { title: '查看课程', icon: 'user' }
      }
    ]
  },





  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'Company',
        component: (resolve) => require(['@/views/content/Company/index'], resolve),
        name: 'Company',
        meta: { title: '厂商', icon: 'user' }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'addCompany',
        component: (resolve) => require(['@/views/content/addCompany/index'], resolve),
        name: 'addCompany',
        meta: { title: '新增厂商', icon: 'user' }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'editCompany',
        component: (resolve) => require(['@/views/content/editCompany/index'], resolve),
        name: 'editCompany',
        meta: { title: '修改厂商', icon: 'user' }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'companyDetail',
        component: (resolve) => require(['@/views/content/companyDetail/index'], resolve),
        name: 'companyDetail',
        meta: { title: '查看厂商', icon: 'user' }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'Tools',
        component: (resolve) => require(['@/views/content/Tools/index'], resolve),
        name: 'Tools',
        meta: { title: '器材', icon: 'user' }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'addTools',
        component: (resolve) => require(['@/views/content/addTools/index'], resolve),
        name: 'addTools',
        meta: { title: '新增器材', icon: 'user' }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'editTools',
        component: (resolve) => require(['@/views/content/editTools/index'], resolve),
        name: 'editTools',
        meta: { title: '修改器材', icon: 'user' }
      }
    ]
  },


  {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'toolsDetail',
        component: (resolve) => require(['@/views/content/toolsDetail/index'], resolve),
        name: 'toolsDetail',
        meta: { title: '查看器材', icon: 'user' }
      }
    ]
  },





  // 导师路由
 {
    path: '/content',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'Teacher',
        component: (resolve) => require(['@/views/content/Teacher/index'], resolve),
        name: 'Teacher',
        meta: { title: '导师', icon: 'user' }
      }
    ]
  },

  {
     path: '/content',
     component: Layout,
     hidden: true,
     redirect: 'noredirect',
     children: [
       {
         path: 'addTeacher',
         component: (resolve) => require(['@/views/content/addTeacher/index'], resolve),
         name: 'addTeacher',
         meta: { title: '新增导师', icon: 'user' }
       }
     ]
   },


   {
      path: '/content',
      component: Layout,
      hidden: true,
      redirect: 'noredirect',
      children: [
        {
          path: 'editTeacher',
          component: (resolve) => require(['@/views/content/editTeacher/index'], resolve),
          name: 'editTeacher',
          meta: { title: '修改导师', icon: 'user' }
        }
      ]
    },

    {
       path: '/content',
       component: Layout,
       hidden: true,
       redirect: 'noredirect',
       children: [
         {
           path: 'teacherDetail',
           component: (resolve) => require(['@/views/content/teacherDetail/index'], resolve),
           name: 'teacherDetail',
           meta: { title: '查看导师', icon: 'user' }
         }
       ]
     },





  // 统计路由
  {
    path: '/statistics',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'UserStatics',
        component: (resolve) => require(['@/views/statistics/UserStatics/index'], resolve),
        name: 'UserStatics',
        meta: { title: '用户分析', icon: 'user' }
      }
    ]
  },



   // 功能路由
   {
     path: '/function',
     component: Layout,
     hidden: true,
     redirect: 'noredirect',
     children: [
       {
         path: 'Order',
         component: (resolve) => require(['@/views/function/Order/index'], resolve),
         name: 'Order',
         meta: {title: '订单', icon: 'user'}
       }
     ]
   },

   {
     path: '/function',
     component: Layout,
     hidden: true,
     redirect: 'noredirect',
     children: [
       {
         path: 'OrderDetail',
         component: (resolve) => require(['@/views/function/OrderDetail/index'], resolve),
         name: 'OrderDetail',
         meta: {title: '订单详情', icon: 'user' }
       }
     ]
   },


  {
    path: '/function',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'Comment',
        component: (resolve) => require(['@/views/function/Comment/index'], resolve),
        name: 'Comment',
        meta: { title: '评论', icon: 'user' }
      }
    ]
  },




  // 管理路由
  {
    path: '/manage',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'Account',
        component: (resolve) => require(['@/views/manage/Account/index'], resolve),
        name: 'Account',
        meta: { title: '账号', icon: 'user' }
      }
    ]
  },

  {
    path: '/manage',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'addAccount',
        component: (resolve) => require(['@/views/manage/addAccount/index'], resolve),
        name: 'addAccount',
        meta: { title: '新增账号', icon: 'user' }
      }
    ]
  },

  {
    path: '/manage',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'editAccount',
        component: (resolve) => require(['@/views/manage/editAccount/index'], resolve),
        name: 'editAccount',
        meta: { title: '编辑账号', icon: 'user' }
      }
    ]
  },







  {
    path: '/manage',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'Money',
        component: (resolve) => require(['@/views/manage/Money/index'], resolve),
        name: 'Money',
        meta: { title: '资金', icon: 'user' }
      }
    ]
  },


  {
    path: '/manage',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'ViewMoney',
        component: (resolve) => require(['@/views/manage/ViewMoney/index'], resolve),
        name: 'ViewMoney',
        meta: { title: '查看流水', icon: 'user' }
      }
    ]
  },

  {
    path: '/manage',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'ViewRecord',
        component: (resolve) => require(['@/views/manage/ViewRecord/index'], resolve),
        name: 'ViewRecord',
        meta: { title: '查看明细', icon: 'user' }
      }
    ]
  },



  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: (resolve) => require(['@/views/system/user/authRole'], resolve),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user'}
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: (resolve) => require(['@/views/system/role/authUser'], resolve),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role'}
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: (resolve) => require(['@/views/system/dict/data'], resolve),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict'}
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/monitor/job/log'], resolve),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job'}
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: (resolve) => require(['@/views/tool/gen/editTable'], resolve),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen'}
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
