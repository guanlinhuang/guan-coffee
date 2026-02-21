import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useProductStore } from '@/stores/user/useProductStore'
import { toast } from 'vue3-toastify'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorite = ref(getFavorite() || [])
  const favoriteProduct = ref([])
  const productStore = useProductStore()
  const isLoading = ref(false)

  async function getFavoriteProduct() {
    await productStore.getProducts()
    favoriteProduct.value = productStore.products.filter((product) =>
      favorite.value.includes(product.id),
    )
  }

  function saveFavorite(favorite) {
    const favoriteStr = JSON.stringify(favorite)
    localStorage.setItem('favoriteProduct', favoriteStr)
  }

  function getFavorite() {
    return JSON.parse(localStorage.getItem('favoriteProduct'))
  }

  async function toggleFavorite(product) {
    if (favorite.value.includes(product.id)) {
      favorite.value.splice(favorite.value.indexOf(product.id), 1)
      toast.success(`已將「 ${product.title} 」移除喜愛清單成功!`)
    } else {
      favorite.value.push(product.id)
      toast.success(`已將「 ${product.title} 」加入喜愛清單成功!`)
    }
    saveFavorite(favorite.value)
    getFavoriteProduct()
  }

  function removeFavorite(item) {
    isLoading.value = true
    favorite.value.splice(favorite.value.indexOf(item.id), 1)
    saveFavorite(favorite.value)
    isLoading.value = false
    getFavoriteProduct()
    toast.success(`已將「 ${item.title} 」移除喜愛清單成功!`)
    console.log(item)
  }

  return {
    favorite,
    favoriteProduct,
    getFavoriteProduct,
    toggleFavorite,
    getFavorite,
    removeFavorite,
    isLoading,
  }
})
