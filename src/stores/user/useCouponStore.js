import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useCartStore } from './useCartStore'

export const useCouponStore = defineStore('coupon', () => {
  const couponCode = ref('')

  async function addCouponCode() {
    const cartStore = useCartStore()
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/coupon`
    const coupon = {
      code: couponCode.value,
    }
    try {
      const res = await axios.post(url, { data: coupon })
      await cartStore.getCart()
      if (res.data.success) {
        toast.success('加入優惠券成功！')
      } else {
        toast.error('優惠券無法使用 或 已過期！')
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    }
  }
  return {
    couponCode,
    addCouponCode,
  }
})
