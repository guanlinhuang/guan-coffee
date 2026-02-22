import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import axios from 'axios'
import { useOrderStore } from '@/stores/user/useOrderStore'
const orderStore = useOrderStore()

export const usePayStore = defineStore('pay', () => {
  async function payOrder(orderId) {
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/pay/${orderId}`
    try {
      const res = await axios.post(url)
      if (res.data.success) {
        toast.success('付款成功 !')
        orderStore.getOrder(orderId)
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    }
  }
  return {
    payOrder,
  }
})
