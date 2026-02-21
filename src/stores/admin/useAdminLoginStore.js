import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'

export const useAdminLoginStore = defineStore('adminLogin', () => {
  const user = ref({
    username: '',
    password: '',
  })
  const router = useRouter()

  async function signIn() {
    const url = `${import.meta.env.VITE_APP_API}admin/signin`
    try {
      const res = await axios.post(url, user.value)
      if (res.data.success) {
        const { token, expired } = res.data
        document.cookie = `hexToken=${token};expires=${new Date(expired)}`
        axios.defaults.headers.common.Authorization = token
        router.push('/dashboard/products/all')
        document.body.style.overflow = ''
        document.body.style.position = ''
        toast.success('登入成功 !')
      } else {
        toast.error('登入失敗 !')
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    }
  }
  return {
    user,
    signIn,
  }
})
