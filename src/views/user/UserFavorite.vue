<template>
  <VueLoading :active="favoriteStore.isLoading"
    ><section><span class="loader-18"></span></section
  ></VueLoading>
  <div class="container products_all mainContainer">
    <div v-if="favoriteStore.favorite.length !== 0" class="py-5">
      <h3 class="text-center">收藏清單</h3>
      <div class="row justify-content-center">
        <div class="col col-lg-9 mt-lg-5" style="margin-top: 45px">
          <div class="row row-cols-2 row-cols-lg-4 gx-2 gx-lg-4 p-1 p-lg-0">
            <div class="col mb-4 mb-lg-5" v-for="item in favoriteStore.favoriteProduct" :key="item.id">
              <div class="position-relative text-center product d-flex flex-column h-100">
                <div class="mb-2">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeFavorite(item)"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>
                <a @click="getProductPage(item.id)">
                  <div
                    v-if="item.origin_price !== item.price"
                    class="onSale_favorite position-absolute text-white bg-danger py-1 px-3"
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
                <div class="mt-auto">
                  <button
                    type="button"
                    class="btnHover btnHover5 col ms-1 ms-lg-0 me-lg-1"
                    @click="addToCart(item.id, 1, false, item.title)"
                  >
                    <div>
                      <span>加到購物車</span>
                      <span>加到購物車</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="padding-top: 180px; padding-bottom: 250px">
      <div class="text-center my-5">
        <p class="fs-4 ls">您的收藏清單目前是空的唷！</p>
        <router-link
          to="/products/all"
          type="button"
          class="btnHover btn-lg rounded-0 mt-3 d-block w-25 mx-auto"
        >
          <div>
            <span>去逛逛商店 <i class="bi bi-arrow-right" /></span>
            <span>去逛逛商店 <i class="bi bi-arrow-right" /></span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import { useFavoriteStore } from '@/stores/user/useFavoriteStore'
const favoriteStore = useFavoriteStore()
import { useProductStore } from '@/stores/user/useProductStore'
const productStore = useProductStore()
import { useCartStore } from '@/stores/user/useCartStore'
const cartStore = useCartStore()

function removeFavorite(item) {
  favoriteStore.removeFavorite(item)
}

function getProductPage(id) {
  productStore.getProductPage(id)
}

async function addToCart(id, qty, cartPage, title) {
  await cartStore.addToCart(id, qty, cartPage, title)
}

onMounted(async () => {
  favoriteStore.getFavoriteProduct()
})
</script>
