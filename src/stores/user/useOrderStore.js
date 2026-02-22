import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { useCartStore } from '@/stores/user/useCartStore'
const cartStore = useCartStore()

export const useOrderStore = defineStore('order', () => {
  const orderList = ref([])
  const pagination = ref({})
  const search = ref('')
  const filterOrder = ref([])
  const searchState = ref(false)
  const isLoading = ref(false)
  const form = ref({
    user: {
      name: '',
      email: '',
      tel: '',
      address: '',
    },
    message: '',
  })
  const order = ref({
    user: {},
  })

  async function createOrder() {
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order`
    const orderForm = form.value
    try {
      const res = await axios.post(url, { data: orderForm })
      if (res.data.success) {
        const id = res.data.orderId
        cartStore.getCart()
        router.push({ path: `/pay/${id}`, state: { fromOrder: true } })
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    }
  }

  async function getOrderAll(page = 1) {
    searchState.value = false
    search.value = ''
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/orders?page=${page}`
    try {
      const res = await axios.get(url)
      if (res.data.success) {
        orderList.value = res.data.orders
        pagination.value = res.data.pagination
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    }
  }

  async function getOrder(orderId) {
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/order/${orderId}`
    try {
      const res = await axios.get(url)
      if (res.data.success) {
        order.value = res.data.order
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    }
  }

  function resetForm() {
    form.value = {
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      message: '',
    }
  }

  function searchOrder() {
    isLoading.value = true
    searchState.value = true
    filterOrder.value = orderList.value.filter(
      (item) => item.user.email === search.value || item.user.tel === search.value,
    )
    isLoading.value = false
  }

  function payOrder(id) {
    window.open(
      router.resolve({
        path: `/pay/${id}`,
      }).href,
      '_blank',
    )
  }

  return {
    orderList,
    pagination,
    search,
    filterOrder,
    searchState,
    isLoading,
    form,
    order,
    createOrder,
    getOrderAll,
    getOrder,
    resetForm,
    searchOrder,
    payOrder,
  }
})
