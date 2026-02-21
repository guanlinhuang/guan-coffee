import { defineStore } from 'pinia'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'

export const useAdminCouponsStore = defineStore('adminCoupons', () => {
  const coupons = ref([])
  const isLoading = ref(false)
  const tempCoupon = ref({})
  const isNew = ref(false)

  async function getCoupons() {
    isLoading.value = true
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/coupons`
    try {
      const res = await axios.get(url)
      if (res.data.success) {
        coupons.value = res.data.coupons
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    } finally {
      isLoading.value = false
    }
  }

  function openCouponModal(status, item) {
    isNew.value = status
    if (isNew.value) {
      tempCoupon.value = {
        title: '',
        is_enabled: 0,
        percent: '',
        code: '',
        due_date: new Date().getTime() / 1000,
      }
    } else {
      tempCoupon.value = { ...item }
    }
  }

  function openDelCouponModal(item) {
    tempCoupon.value = { ...item }
    console.log(tempCoupon.value)
  }

  async function updateCoupon(tempCoupon) {
    try {
      if (isNew.value) {
        const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/coupon`
        const res = await axios.post(url, { data: tempCoupon })
        if (res.data.success) {
          toast.success('新增優惠券成功')
          getCoupons()
        }
      } else {
        const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${tempCoupon.id}`
        const res = await axios.put(url, { data: { ...tempCoupon } })
        if (res.data.success) {
          toast.success('更新優惠券成功')
          getCoupons()
        }
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    }
  }

  async function delCoupon(tempCoupon) {
    isLoading.value = true
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${tempCoupon.id}`
    try {
      const res = await axios.delete(url)
      if (res.data.success) {
        toast.success('刪除優惠券成功')
        await getCoupons()
        isLoading.value = false
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    coupons,
    isLoading,
    tempCoupon,
    isNew,
    getCoupons,
    openCouponModal,
    openDelCouponModal,
    updateCoupon,
    delCoupon,
  }
})
