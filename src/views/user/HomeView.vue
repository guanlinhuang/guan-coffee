<template>
  <SwiperBanner />
  <div class="bg-white py-5">
    <h3 class="py-3 text-center">熱銷商品</h3>
    <SwiperProducts />
  </div>
  <div class="about homeView_about">
    <div class="container-fluid about_box position-relative">
      <div class="about_text position-absolute">
        <div class="about_text_opacity">
          <h3 class="text-center pt-4 pb-2">關於我們</h3>
          <p class="text-break mx-5 pb-4" style="text-align: justify">
            &emsp;&emsp;GuanTony，這個品牌名稱源自創辦人名字「冠」的羅馬拼音及英文名「Tony」，合併成一個活招牌，象徵著創辦人對於健康飲品的堅持與初心。這個初衷，就是捧著一杯新鮮榨製的健康果汁，為那些渴望天然、無負擔飲品的人們提供一個健康選擇，讓每一位顧客都能品嚐到純粹與自然的美味。
            1994年，創辦人從一條繁忙的城市街道上的小店舖起步，在10多年間持續獲得周邊鄰居的好評，更是吸引各地遊客前來品嚐。
          </p>
        </div>
        <div class="d-flex justify-content-center">
          <router-link to="/aboutUs" class="btnHover"
            ><div>
              <span>看更多</span>
              <span>看更多</span>
            </div></router-link
          >
        </div>
      </div>
    </div>
  </div>
  <div class="line_news py-5 bg-white">
    <div class="container">
      <div class="row d-block d-lg-flex justify-content-center">
        <div class="addLine col col-lg-4">
          <h4 class="text-center mb-3">加入LINE</h4>
          <div class="line mx-auto"></div>
        </div>
        <div class="addNews col col-lg-5 mt-5 mt-lg-0">
          <v-form class="p-2" ref="form" v-slot="{ errors }" @submit="sendEmail">
            <h4 class="mb-3 text-center">訂閱電子報</h4>
            <div class="w-100 mb-3">
              <v-field
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                aria-label="請輸入 Email"
              /><ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
              <div v-if="SendEmailStore.formSuccess" class="text-center my-2">
                <div>
                  <p class="text-success">訂閱成功</p>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <button class="btnHover" type="submit">
                <div>
                  <span>訂閱</span>
                  <span>訂閱</span>
                </div>
              </button>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SwiperBanner from '@/components/SwiperBanner.vue'
import SwiperProducts from '@/components/SwiperProducts.vue'

import { useSendEmailStore } from '@/stores/user/useSendEmailStore'
const SendEmailStore = useSendEmailStore()

function sendEmail() {
  SendEmailStore.sendEmail()
}
</script>
