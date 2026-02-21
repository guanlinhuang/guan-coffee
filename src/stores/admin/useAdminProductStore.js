import { defineStore } from 'pinia'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'

export const useAdminProductStore = defineStore('adminProduct', () => {
  const adminProducts = ref([])
  const tempProduct = ref({})
  const isLoading = ref(false)

  async function getAdminProducts() {
    isLoading.value = true
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/products/all`
    try {
      const res = await axios.get(url)
      if (res.data.success) {
        adminProducts.value = Object.values(res.data.products).reverse()
      }
      return { success: true }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
      return { success: false, error: err }
    } finally {
      isLoading.value = false
    }
  }

  async function updateProduct(item, isNewModal) {
    tempProduct.value = item
    let url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product`
    let httpMethod = 'post'
    if (!isNewModal) {
      url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${
        item.id
      }`
      httpMethod = 'put'
    }
    try {
      const res = await axios[httpMethod](url, { data: tempProduct.value })
      if (res.data.success) {
        if (!isNewModal) {
          toast.success('儲存成功')
          return { success: true, isNew: false }
        } else {
          toast.success('新增成功')
          return { success: true }
        }
      } else {
        toast.error(`新增失敗，${res.data.message}`)
        return { success: false }
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    }
  }

  async function delProduct() {
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/product/${
      tempProduct.value.id
    }`
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

  async function uploadFile(uploadedFile) {
    const formData = new FormData()
    formData.append('file-to-upl', uploadedFile)
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/upload`
    try {
      const res = await axios.post(url, formData)
      if (res.data.success) {
        return { success: true, imageUrl: res.data.imageUrl }
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
      return { success: false, error: err }
    }
  }

  async function uploadFiles(uploadedFiles) {
    const uploadedUrls = []
    for (const files of uploadedFiles) {
      const formData = new FormData()
      formData.append('file-to-upload', files)
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/admin/upload`
      try {
        const res = await axios.post(url, formData)
        if (res.data.success) {
          uploadedUrls.push(res.data.imageUrl)
        }
      } catch (err) {
        console.error('連線錯誤，請再試一次', err)
      }
    }
    return uploadedUrls
  }

  function setTempProduct(product) {
    tempProduct.value = { ...product }
  }

  function clearTempProduct() {
    tempProduct.value = {}
  }

  return {
    adminProducts,
    tempProduct,
    isLoading,
    getAdminProducts,
    updateProduct,
    delProduct,
    uploadFile,
    uploadFiles,
    setTempProduct,
    clearTempProduct,
  }
})
