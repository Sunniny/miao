import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SelectCreateVue from '@/views/SelectCreate.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '',
          redirect: '/select-create'//法1,可以直接重定向地址
        },
        {
        path: 'select-create',
        //alias: '',//法2:加一个这个,代表 当地址栏后面是空.则默认跳到这个组件的地址.
        component: SelectCreateVue,
        },
        {
          path: 'me',
          component: () => import('../views/Me.vue')
        }
      ]
    },
    {
      path: '/create',
      component: () => import('../views/CreateVote.vue')
    },
    {
      path: '/vote/:id',
      component: () => import('../views/Vote.vue')
    },
    {
      path: '/my-votes',
      component: () => import('../views/MyVotes.vue')
    },
    {
      path: '/my-settings',
      component: () => import('../views/MySettings.vue')
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router
