<template>
  <div class="container-full-width">
    <Swiper
      :pagination="{
        dynamicBullets: true,
        clickable: true,
      }"
      :autoplay="{ delay: 6000, disableOnInteraction: false }"
      :modules="modules"
      :loop="true"
      class="swiperBanner"
    >
      <SwiperSlide class="slideBanner position-relative"
        ><div class="position-absolute slideBanner_text px-4 px-lg-0">
          <p class="fw-bold fs-4 text-white text-start">品味生活，從GuanTony開始。</p>
          <p class="fw-bold fs-4 text-white text-start">
            風格飲品 × 質感甜點，陪你品味生活每一刻。
          </p>
          <router-link
            to="/products/all"
            class="d-block fw-bold text-decoration-none fs-3 text-start"
            ><span class="slideBanner_text_link px-3 py-2">手刀點起來！</span></router-link
          >
        </div></SwiperSlide
      >
      <SwiperSlide class="slideBanner2"
        ><div class="mt-5 mt-xxl-2">
          <p class="fw-bold fs-4 mb-xxl-0">不只是飲品，是生活的儀式感。</p>
          <p class="fw-bold fs-4">讓平凡日常，多一點甜的驚喜。</p>
        </div>
        <router-link
          to="/products/all"
          class="d-block fw-bold text-decoration-none fs-3 position-absolute slideBanner_text_link2 py-2"
          >現在，咖啡一下？</router-link
        ></SwiperSlide
      >
      <SwiperSlide class="slideBanner3"
        ><div class="position-absolute slideBanner_text px-4 px-lg-0">
          <p class="fw-bold fs-4 text-white text-start">選不出來？沒關係，兩杯都點！</p>
          <p class="fw-bold fs-4 text-white text-start">
            咖啡醒神，果汁醒心，GuanTony懂你每天的需要。
          </p>
          <router-link
            to="/products/all"
            class="d-block fw-bold text-decoration-none fs-3 text-start"
            ><span class="slideBanner_text_link px-3 py-2"
              >點咖啡去，還是果汁先？</span
            ></router-link
          >
        </div></SwiperSlide
      >
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'

const modules = [Autoplay, Pagination]
</script>
