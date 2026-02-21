import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

export const useCartStore = defineStore('cart', () => {
  const cart = ref({})
  const carts = ref([])
  const productsQty = ref(1)
  const product = ref({})
  const tempProduct = ref({})
  const delModal = ref(null)
  const router = useRouter()
  const isLoading = ref(false)

  async function getCart() {
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`
    try {
      const res = await axios.get(url)
      cart.value = res.data.data
      carts.value = res.data.data.carts
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    }
  }

  async function addToCart(id, qty, cartPage, title) {
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart`
    const cart = {
      product_id: id,
      qty,
    }
    isLoading.value = true
    try {
      await axios.post(url, { data: cart })
      getCart()
      toast.success(`已將「 ${title} 」加入購物車成功 !`)
      if (cartPage) {
        router.push('/cart')
      }
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    } finally {
      isLoading.value = false
    }
  }

  function changeQty(number) {
    productsQty.value += number
  }

  async function updateCart(item) {
    const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${item.id}`
    const cart = {
      product_id: item.product_id,
      qty: item.qty,
    }
    try {
      await axios.put(url, { data: cart })
      getCart()
    } catch (err) {
      console.error('連線錯誤，請再試一次', err)
    }
  }

  async function deleteCartItem(id) {
    try {
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/cart/${id}`
      await axios.delete(url)
      await getCart()
    } catch (err) {
      console.error('刪除單一商品失敗', err)
    }
  }

  async function deleteAllCart() {
    try {
      const url = `${import.meta.env.VITE_APP_API}api/${import.meta.env.VITE_APP_PATH}/carts`
      await axios.delete(url)
      await getCart()
    } catch (err) {
      console.error('刪除全部商品失敗', err)
    }
  }

  async function deleteCart(item) {
    try {
      if (item.title === '所有商品') {
        await deleteAllCart()
      } else {
        await deleteCartItem(item.id)
      }
    } catch (err) {
      console.error('刪除購物車失敗', err)
    }
  }

  return {
    cart,
    carts,
    productsQty,
    product,
    tempProduct,
    delModal,
    getCart,
    addToCart,
    changeQty,
    updateCart,
    deleteCartItem,
    deleteAllCart,
    deleteCart,
    isLoading,
  }
})
