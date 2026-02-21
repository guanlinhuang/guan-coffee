<template>
  <div class="bg-white">
    <div class="container SwiperProducts">
      <Swiper
        class="product-swiper"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :modules="modules"
        :loop="true"
        :spaceBetween="3"
        :slidesPerView="2"
        :breakpoints="{
          992: { slidesPerView: 6, spaceBetween: 30 },
        }"
      >
        <SwiperSlide v-for="item in getProducts" :key="item.id">
          <div class="position-relative text-center product h-100 mb-4 mb-lg-0">
            <a @click="getProductPage(item.id)">
              <div
                v-if="item.origin_price !== item.price"
                class="onSale position-absolute text-white bg-danger py-1 px-3 d-none d-lg-block"
                style="z-index: 5"
              >
                特 價
              </div>
              <div class="swiper_img">
                <img :src="`${item.imageUrl}`" :alt="item.title" class="object-fit-cover" />
              </div>
              <div>
                <p class="my-1 fw-normal mx-2">{{ item.title }}</p>
                <div class="price text-center">
                  <div v-if="item.origin_price !== item.price">
                    <p class="mb-0 mb-lg-1 text-danger">NT$ {{ item.price }}</p>
                  </div>
                  <div v-if="item.origin_price === item.price">
                    <p class="mb-0 mb-lg-1">NT$ {{ item.price }}</p>
                  </div>
                  <div v-if="item.origin_price !== item.price">
                    <p
                      class="product_origin_price mb-0 mb-lg-3 text-decoration-line-through"
                      style="font-size: 13px"
                    >
                      NT$ {{ item.origin_price }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </SwiperSlide>
        <button class="swiper-button-next btn btn-light"></button>
        <button class="swiper-button-prev btn btn-light"></button>
      </Swiper>
      <div class="d-flex justify-content-center">
        <router-link to="/products/all" class="btnHover"
          ><div>
            <span>看更多</span>
            <span>看更多</span>
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { computed, onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/user/useProductStore'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const modules = [Autoplay, Navigation, Pagination]
const productStore = useProductStore()
const id = ref(null)

const getProducts = computed(() =>
  productStore.products.filter((e) => e.id !== id.value).sort(() => Math.random() - 0.5)
)

function getProductPage(id) {
  productStore.getProductPage(id)
  productStore.getProductDetail(id)
}

onMounted(() => {
  productStore.getProducts()
})
</script>
