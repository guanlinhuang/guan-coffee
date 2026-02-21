import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'

const check = async () => {
  const url = `${import.meta.env.VITE_APP_API}api/user/check`
  try {
    const res = await axios.post(url)
    return res.data.success
  } catch (error) {
    console.error('登入檢查失敗', error)
    return false
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'UserBoard',
      component: () => import('../views/user/UserBoard.vue'),
      children: [
        {
          path: '',
          name: '首頁',
          component: () => import('../views/user/HomeView.vue'),
        },
        {
          path: 'aboutus',
          name: '關於我們',
          component: () => import('../views/user/UserAboutUs.vue'),
        },
        {
          path: 'storelist',
          name: '店舖清單',
          component: () => import('../views/user/UserStoreList.vue'),
        },
        {
          path: 'UserOrderSearch',
          name: '訂單查詢',
          component: () => import('../views/user/UserOrderSearch.vue'),
        },
        {
          path: 'pay/:orderId',
          name: '結帳',
          component: () => import('../views/user/UserPay.vue'),
        },
        {
          path: 'products/:categoryName?',
          name: '商品列表',
          component: () => import('../views/user/UserProductsAll.vue'),
        },
        {
          path: 'product/:productId',
          name: '單一產品介紹',
          component: () => import('../views/user/UserProductDetail.vue'),
        },
        {
          path: 'cart',
          name: '購物車',
          component: () => import('../views/user/UserCart.vue'),
        },
        {
          path: 'order',
          name: '訂單資料填寫',
          component: () => import('../views/user/UserOrder.vue'),
        },
        {
          path: 'favorite',
          name: '最愛',
          component: () => import('../views/user/UserFavorite.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: '登入頁面',
      component: () => import('../views/admin/AdminLogin.vue'),
    },
    {
      path: '/dashboard',
      name: '後台儀表板',
      component: () => import('../views/admin/AdminDashboard.vue'),
      beforeEnter: async () => {
        window.dispatchEvent(new CustomEvent('start-loading'))
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
          '$1',
        )
        if (!token) {
          window.dispatchEvent(new CustomEvent('stop-loading'))
          return { path: '/login' }
        }
        axios.defaults.headers.common['Authorization'] = token
        const isLogin = await check()
        window.dispatchEvent(new CustomEvent('stop-loading'))

        if (isLogin) return true

        return { path: '/login' }
      },
      children: [
        {
          path: 'products/:categoryName?',
          name: '後台商品列表',
          component: () => import('../views/admin/AdminProducts.vue'),
        },
        {
          path: 'orders',
          name: '訂單列表',
          component: () => import('../views/admin/AdminOrders.vue'),
        },
        {
          path: 'coupons',
          name: '優惠券列表',
          component: () => import('../views/admin/AdminCoupons.vue'),
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

export default router
