<template>
<VueLoading :active="adminProductStore.isLoading"
    ><section><span class="loader-18"></span></section
  ></VueLoading>
  <div class="container py-5 mx-auto">
    <h3 class="text-center">產品列表</h3>
    <div class="category_btn my-4 my-lg-5 row row-cols-2 row-cols-lg-6 gx-1 gx-lg-3 mx-1 mx-lg-0">
      <div class="col" v-for="category in categories" :key="category.id">
        <button
          type="button"
          class="btnHover2 w-100 mb-1 mb-lg-0"
          :data-text="category.label"
          @click.prevent="updateCategory(category.en, category.id)"
          :class="{ active: isActive === category.id }"
        >
          {{ category.label }}<span></span><span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="text-end mx-2 mx-lg-3 px-lg-4">
      <button type="button" class="btnHover btnHover5" @click="openModal(true)">
        <div>
          <span>新增產品</span>
          <span>新增產品</span>
        </div>
      </button>
    </div>
    <div class="row">
      <div class="col-lg-9 mx-auto d-none d-lg-block">
        <table class="table mt-4 align-middle">
          <thead>
            <tr class="text-center">
              <th></th>
              <th>分類</th>
              <th></th>
              <th class="text-start">產品名稱</th>
              <th>原價</th>
              <th>售價</th>
              <th>是否啟用</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="item in productsFilter" :key="item.id">
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openDelProductModal(item)"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </td>
              <td>{{ item.category }}</td>
              <td style="width: 70px">
                <div style="width: 70px; height: 100px">
                  <img
                    :src="item.imageUrl"
                    :alt="item.title"
                    class="w-100 h-100 object-fit-cover"
                  />
                </div>
              </td>
              <td class="align-top text-start">{{ item.title }}</td>
              <td class="text-right">${{ $filters.currency(item.origin_price) }}</td>
              <td class="text-right">${{ $filters.currency(item.price) }}</td>
              <td>
                <span class="text-success" v-if="item.is_enabled">啟用</span>
                <span class="text-danger" v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btnHover me-1" @click="openModal(false, item)">
                    <div>
                      <span>編輯</span>
                      <span>編輯</span>
                    </div>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col d-lg-none">
        <div
          class="row mx-2 my-3 p-2 border rounded-3 d-flex"
          v-for="item in productsFilter"
          :key="item.id"
        >
          <div class="col-3 p-0 pe-1">
            <div style="width: 100%; height: 140px">
              <img
                :src="item.imageUrl"
                :alt="item.title"
                class="w-100 h-100 object-fit-cover rounded-start"
              />
            </div>
          </div>
          <div class="col-9 p-0 ps-1">
            <div class="d-flex align-items-center mb-2">
              <p class="border border-dark p-1 mb-0">
                {{ item.category }}
              </p>
              <p class="mb-0 mx-2">{{ item.title }}</p>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm ms-auto"
                @click="openDelProductModal(item)"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <p class="mb-0">
              原價 ${{ $filters.currency(item.origin_price)
              }}<span class="ms-4">售價 ${{ $filters.currency(item.price) }}</span>
            </p>
            <div class="d-flex mt-4">
              <p>
                <span class="text-success" v-if="item.is_enabled">啟用</span>
                <span class="text-danger" v-else>未啟用</span>
              </p>
              <button
                type="button"
                class="btnHover p-0 ms-auto"
                style="min-width: 100px"
                @click="openModal(false, item)"
              >
                <div>
                  <span>編輯</span>
                  <span>編輯</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProductModal
      ref="productModal"
      :product="adminProductStore.tempProduct"
      @update-product="updateProduct"
    ></ProductModal>
    <DelModal :item="adminProductStore.tempProduct" ref="delModal" @del-item="delProduct" />
    <Pagination :pages="paginationStore.pagination" @emit-pages="handlePageChange"></Pagination>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAdminProductStore } from '@/stores/admin/useAdminProductStore'
import { usePaginationStore } from '@/stores/shared/usePaginationStore'
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/PagePagination.vue'

const adminProductStore = useAdminProductStore()
const paginationStore = usePaginationStore()

const router = useRouter()
const route = useRoute()

const categories = [
  { id: 1, name: '全部商品', en: 'all', label: '全部商品' },
  { id: 2, name: '咖啡', en: 'coffee', label: '咖啡' },
  { id: 3, name: '果汁', en: 'juice', label: '果汁' },
  { id: 4, name: '冰沙', en: 'smoothie', label: '冰沙' },
  { id: 5, name: '甜點', en: 'dessert', label: '甜點' },
  { id: 6, name: '組合餐', en: 'combo', label: '組合餐' },
]


const isActive = ref(1)
const productModal = ref(null)
const categoryName = ref('')
const isNewModal = ref(false)
const current_page = ref()
const delModal = ref(null)

async function getAdminProducts(page) {
  current_page.value = page
  await adminProductStore.getAdminProducts()
  categoryName.value = categories.find((c) => c.en === route.params.categoryName)?.name || ''
  if (categoryName.value === '全部商品') {
    paginationStore.setPagination(page, 'admin')
  } else {
    paginationStore.pagination = {}
  }
}

function updateCategory(category, id) {
  isActive.value = id // 更新按鈕高亮狀態
  router.push({
    name: '後台商品列表',
    params: { categoryName: category },
  })
  getAdminProducts(1) // 重新載入第一頁資料 // 因為切換分類了，所以從第一頁開始看 // 函式內也會執行更改並賦予類別的值
}

const productsFilter = computed(() => {
  if (categoryName.value === '全部商品') {
    return paginationStore.pagedProducts
  } else {
    return adminProductStore.adminProducts.filter((item) => {
      return item.category === categoryName.value
    })
  }
})


function handlePageChange(page) {
  getAdminProducts(page)
}

function openModal(isNew, item) {
  if (isNew) {
    adminProductStore.clearTempProduct()
  } else {
    adminProductStore.tempProduct = JSON.parse(JSON.stringify(item))
  }
  isNewModal.value = isNew
  productModal.value?.showModal()
}

async function updateProduct(item) {
  const result = await adminProductStore.updateProduct(item, isNewModal.value)
  if (result.success) {
    productModal.value?.hideModal()
    if (result.isNew === false) {
      getAdminProducts(current_page.value)
    } else {
      getAdminProducts(1)
    }
  }
}

function openDelProductModal(item) {
  adminProductStore.setTempProduct(item)
  delModal.value?.showModal()
}

async function delProduct() {
  await adminProductStore.delProduct()
  delModal.value?.hideModal()
  getAdminProducts(current_page.value)
}

onMounted(() => {
  getAdminProducts(1)
  router.replace({
    name: '後台商品列表',
    params: { categoryName: 'all' },
  })
})
</script>
