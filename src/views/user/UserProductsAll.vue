<template>
  <VueLoading :active="productStore.isLoading"
    ><section><span class="loader-18"></span></section
  ></VueLoading>
  <div class="container products_all mainContainer">
    <div class="row justify-content-center">
      <div class="d-lg-none w-100 menu fixed-top px-0">
        <ul
          class="d-flex mb-0 menu-hover-fill flex flex-col items-start leading-none text-2xl uppercase space-y-4 text-center ps-0"
        >
          <li
            v-for="category in categories"
            :key="category.id"
            class="border-bottom p-2"
            :class="{ active: isActive === category.id }"
          >
            <a
              href="#"
              :data-text="category.label"
              @click.prevent="updateCategory(category.en, category.id)"
              :class="{ active: isActive === category.id }"
            >
              {{ category.label }}
            </a>
          </li>
        </ul>
      </div>
      <div class="d-none d-lg-block col-2 mt-5 pe-5 d-flex flex-row-reverse">
        <ul
          class="menu-hover-fill flex flex-col items-start leading-none text-2xl uppercase space-y-4"
        >
          <li v-for="category in categories" :key="category.id" class="mb-2">
            <a
              href="#"
              :data-text="category.label"
              @click.prevent="updateCategory(category.en, category.id)"
              :class="{ active: isActive === category.id }"
            >
              {{ category.label }}
            </a>
          </li>
        </ul>
      </div>
      <div class="col col-lg-9 mt-lg-5" style="margin-top: 45px">
        <div class="row row-cols-2 row-cols-lg-4 gx-2 gx-lg-4 p-1 p-lg-0">
          <div class="col mb-4" v-for="item in productsFilter" :key="item.id">
            <div class="position-relative text-center product h-100">
              <a @click="getProductPage(item.id)">
                <div
                  v-if="item.origin_price !== item.price"
                  class="onSale position-absolute text-white bg-danger py-1 px-3"
                  style="z-index: 5"
                >
                  特 價
                </div>
                <div class="product_img">
                  <img :src="`${item.imageUrl}`" :alt="item.title" class="object-fit-cover" />
                </div>
                <p class="my-1 fw-normal">{{ item.title }}</p>
                <div class="price text-center">
                  <div v-if="item.origin_price !== item.price">
                    <p class="mb-1 text-danger">NT$ {{ item.price }}</p>
                  </div>
                  <div v-if="item.origin_price === item.price">
                    <p class="mb-1">NT$ {{ item.price }}</p>
                  </div>
                  <div v-if="item.origin_price !== item.price">
                    <p
                      class="product_origin_price mb-1 text-decoration-line-through"
                      style="font-size: 13px"
                    >
                      NT$ {{ item.origin_price }}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center justify-content-lg-center">
          <Pagination :pages="paginationStore.pagination" @emit-pages="getProducts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Pagination from '@/components/PagePagination.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useProductStore } from '@/stores/user/useProductStore'
import { usePaginationStore } from '@/stores/shared/usePaginationStore'

const router = useRouter()
const route = useRoute()
const categoryName = ref('')
const isActive = ref(1)
const productStore = useProductStore()
const paginationStore = usePaginationStore()

const categories = [
  { id: 1, name: '全部商品', en: 'all', label: '全部商品' },
  { id: 2, name: '咖啡', en: 'coffee', label: '咖啡' },
  { id: 3, name: '果汁', en: 'juice', label: '果汁' },
  { id: 4, name: '冰沙', en: 'smoothie', label: '冰沙' },
  { id: 5, name: '甜點', en: 'dessert', label: '甜點' },
  { id: 6, name: '組合餐', en: 'combo', label: '組合餐' },
]

async function getProducts(page = 1) {
  await productStore.getProducts()
  categoryName.value = categories.find((c) => c.en === route.params.categoryName)?.name || '' // 根據 從網址取得的類別英文名稱 找出對應費別中文名稱，賦予categoryName的值
  if (categoryName.value === '全部商品') {
    setPagination(page)
  } else {
    paginationStore.pagination = {}

  }
}

function updateCategory(category, id) {
  isActive.value = id
  router.push({
    name: '商品列表',
    params: { categoryName: category },
  })
  getProducts()
}

const productsFilter = computed(() => {
  if (categoryName.value === '全部商品') {
    return paginationStore.pagedProducts
  }
  return productStore.products.filter((item) => {
    return item.category === categoryName.value
  })
})

function setPagination(page) {
  paginationStore.setPagination(page, 'user')
}

function getProductPage(ProductId) {
  productStore.getProductPage(ProductId)
}

onMounted(() => {
  getProducts()
  router.replace({
    name: '商品列表',
    params: { categoryName: 'all' },
  })
})
</script>
