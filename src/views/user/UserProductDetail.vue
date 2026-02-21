<template>
  <VueLoading :active="useProductStore.isLoading"
    ><section><span class="loader-18"></span></section
  ></VueLoading>
  <div class="container py-lg-5 UserProductDetail">
    <div class="row d-flex justify-content-lg-center">
      <div class="col-lg-5 col-xl-4 me-5 mt-0 mt-sm-2">
        <nav aria-label="breadcrumb" class="d-none d-lg-block">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/products/all" class="text-decoration-none text-dark productsall"
                >所有商品</router-link
              >
            </li>
            <li class="breadcrumb-item active text-dark" aria-current="page">
              {{ productStore.productDetail.title }}
            </li>
          </ol>
        </nav>
        <div class="product_img mb-3 rounded-0">
          <img
            :src="selectedImageUrl || productStore.productDetail.imageUrl"
            :alt="productStore.productDetail.title"
            class="object-fit-cover"
          />
        </div>
        <div>
          <Swiper
            class="product-swiper mx-0 px-0"
            :modules="modules"
            :loop="false"
            :spaceBetween="3"
            :slidesPerView="3"
            :breakpoints="{
              992: { slidesPerView: 3, spaceBetween: 5 },
            }"
          >
            <SwiperSlide v-for="(item, key) in productStore.productDetail.imagesUrl" :key="key">
              <a @click="changeImage(item)">
                <div class="swiper_img rounded-0" style="height: 160px">
                  <img :src="item" :alt="productStore.productDetail.title" class="object-fit-cover" />
                </div>
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div class="col-lg-4 mt-3 mt-lg-5 px-4 px-lg-0">
        <h2>{{ productStore.productDetail.title }}</h2>
        <div class="mb-3">{{ productStore.productDetail.description }}</div>
        <div v-if="productStore.productDetail.origin_price !== productStore.productDetail.price">
          <p class="product_origin_price text-decoration-line-through mb-1">
            原價 NT$ {{ productStore.productDetail.origin_price }}
          </p>
        </div>
        <div v-if="productStore.productDetail.origin_price !== productStore.productDetail.price">
          <p class="mb-1 text-danger h5">特價 NT$ {{ productStore.productDetail.price }}</p>
        </div>
        <div v-if="productStore.productDetail.origin_price === productStore.productDetail.price">
          <p class="h5 mb-1">原價 NT$ {{ productStore.productDetail.price }}</p>
        </div>

        <hr class="w-auto" />
        <div>{{ productStore.productDetail.content }}</div>
        <div class="d-flex">
          <div class="input-group my-3">
            <button
              class="btn border-0"
              type="button"
              @click="changeQty(-1)"
              :disabled="cartStore.productsQty === 1"
            >
              <i class="bi bi-dash-lg"></i>
            </button>
            <input
              type="number"
              class="form-control text-center"
              v-model="cartStore.productsQty"
              min="1"
              readonly
            />
            <button class="btn border-0" type="button" @click="changeQty(1)">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          <div class="my-auto">
            <button
              type="button"
              @click.stop="toggleFavorite(productStore.productDetail)"
              class="btn btn-favorite colorHeart fs-3"
            >
              <i
                class="bi"
                :class="favoriteStore.favorite.includes(productStore.productDetail.id) ? 'bi-heart-fill' : 'bi-heart'"
                style="color: #8fc0a9"
              ></i>
            </button>
          </div>
        </div>
        <div class="row gx-lg-0 mx-0">
          <button
            type="button"
            class="btnHover col me-1 me-lg-3"
            @click="addToCart(productStore.productDetail.id, cartStore.productsQty, true, productStore.productDetail.title)"
          >
            <div>
              <span>立即購買</span>
              <span>立即購買</span>
            </div>
          </button>
          <button
            type="button"
            class="btnHover btnHover5 col ms-1 ms-lg-0 me-lg-1"
            @click="addToCart(productStore.productDetail.id, cartStore.productsQty, false, productStore.productDetail.title)"
          >
            <div>
              <span>加到購物車</span>
              <span>加到購物車</span>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="my-5">
      <h4 class="py-lg-3 fw-normal ms-3 ms-lg-0">看更多商品</h4>
      <SwiperProducts />
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/user/useProductStore'
import { useCartStore } from '@/stores/user/useCartStore'
import SwiperProducts from '@/components/SwiperProducts.vue'
import { useFavoriteStore } from '@/stores/user/useFavoriteStore'

const selectedImageUrl = ref('')
const route = useRoute()
const productStore = useProductStore()
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()

function changeImage(imageUrl) {
  selectedImageUrl.value = imageUrl
}

function changeQty(number) {
  cartStore.changeQty(number)
}

async function addToCart(id, qty, cartPage, title) {
  await cartStore.addToCart(id, qty, cartPage, title)
}

async function toggleFavorite(product) {
  favoriteStore.toggleFavorite(product)
}

onMounted(() => {
  productStore.getProductDetail(route.params.productId)
})
</script>
