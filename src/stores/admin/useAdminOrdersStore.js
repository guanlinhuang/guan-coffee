import { defineStore } from 'pinia'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'

export const useAdminOrdersStore = defineStore('adminOrders', () => {
  const orders = ref([])
  const pagination = ref({})
  const isLoading = ref(false)
  const tempOrder = ref({})
  const currentPage = ref(1)

  async function getOrders(page = 1) {
    currentPage.value = page
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/orders?page=${page}`
    isLoading.value = true
    try {
      const res = await axios.get(url)
      if (res.data.success) {
        orders.value = res.data.orders
        pagination.value = res.data.pagination
        isLoading.value = false
        scrollTop()
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    } finally {
      isLoading.value = false
    }
  }

  async function updatePaid(item) {
    isLoading.value = true
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/order/${item.id}`
    const paid = {
      is_paid: item.is_paid,
    }
    try {
      const res = await axios.put(url, { data: paid })
      if (res.data.success) {
        isLoading.value = false
        getOrders(currentPage.value)
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    }
  }

  async function delOrder() {
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/order/${tempOrder.value.id}`
    try {
      const res = await axios.delete(url)
      if (res.data.success) {
        toast.success('刪除成功')
        return { success: true }
      }
      return { success: false }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
      return { success: false, error: err }
    }
  }

  function setTempOrder(order) {
    tempOrder.value = { ...order }
  }

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return {
    orders,
    isLoading,
    tempOrder,
    currentPage,
    getOrders,
    updatePaid,
    delOrder,
    setTempOrder,
    scrollTop,
  }
})
