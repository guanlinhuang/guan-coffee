import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const productDetail = ref({})
  const id = ref(null)
  const isLoading = ref(false)

  async function getProducts() {
    isLoading.value = true
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/products/all`
    try {
      const res = await axios.get(url)
      if (res.data.success) {
        products.value = res.data.products
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    } finally {
      isLoading.value = false
    }
  }

  async function getProductDetail(productId) {
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/product/${productId}`
    try {
      const res = await axios.get(url)
      if (res.data.success) {
        productDetail.value = res.data.product
        productDetail.value.imagesUrl.push(res.data.product.imageUrl)
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    }
  }

  function getProductPage(ProductId) {
    router.push(`/product/${ProductId}`)
  }

  return {
    products,
    productDetail,
    id,
    isLoading,
    getProducts,
    getProductDetail,
    getProductPage,
  }
})
