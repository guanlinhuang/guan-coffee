import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStoreListStore = defineStore('storeList', () => {
  const name = ref('台中創始店')
  const isActive = ref(1)

  function storeFilter(useName) {
    name.value = useName
  }

  function changeClass(index) {
    isActive.value = index
  }
  return { name, isActive, storeFilter, changeClass }
})
