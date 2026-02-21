import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useProductStore } from '@/stores/user/useProductStore'
import { useAdminProductStore } from '@/stores/admin/useAdminProductStore'

export const usePaginationStore = defineStore('paginationStore', () => {
  const perPage = ref(10)
  const pagination = ref({})
  const pagedProducts = ref([])
  const productStore = useProductStore()
  const adminProductStore = useAdminProductStore()

  function setPagination(page, type) {
    const data = type === 'user' ? productStore.products : adminProductStore.adminProducts
    pagination.value = {
      total_pages: Math.ceil(data.length / perPage.value),
      current_page: page,
      has_pre: page !== 1,
      has_next: false,
      category: null,
    }
    if (pagination.value.current_page >= pagination.value.total_pages) {
      pagination.value.current_page = pagination.value.total_pages
      pagination.value.has_next = false
    } else {
      pagination.value.has_next = true
    }
    const minPage = pagination.value.current_page * perPage.value - perPage.value
    const maxPage = pagination.value.current_page * perPage.value
    pagedProducts.value = data.slice(minPage, maxPage)
  }

  return {
    pagination,
    pagedProducts,
    setPagination,
  }
})
