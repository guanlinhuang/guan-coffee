<template>
  <div class="Smallsidebar d-none d-lg-block d-flex flex-column align-items-center">
    <div class="followUs mb-2 me-2 position-relative rounded-circle">
      <a
        href="#"
        class="text-white d-block position-absolute start-50 translate-middle"
        style="top: 27px"
        ><i class="bi bi-facebook"></i
      ></a>
    </div>
    <div class="followUs mb-2 me-2 position-relative rounded-circle">
      <a
        href="#"
        class="text-white d-block position-absolute start-50 translate-middle"
        style="top: 27px"
        ><i class="bi bi-instagram"></i
      ></a>
    </div>
    <div class="followUs mb-2 me-2 position-relative rounded-circle">
      <a
        href="https://line.me/ti/p/OwNL1F9kBd"
        class="text-white d-block position-absolute start-50 translate-middle"
        style="top: 28px"
        ><i class="bi bi-line"></i
      ></a>
    </div>
    <div class="addCart mb-2 me-2 position-relative rounded-circle">
      <router-link
        to="/cart"
        class="nav-link text-white position-relative position-absolute start-50 translate-middle"
        style="top: 28px"
        ><i class="bi bi-cart3"></i
        ><span
          v-if="carts.length !== 0"
          class="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
          style="font-size: 13px; top: 5px"
          >{{ totalQty }}
          <span class="visually-hidden">unread messages</span>
        </span></router-link
      >
    </div>
    <div class="addFavorite mb-2 me-2 position-relative rounded-circle">
      <router-link
        to="/favorite"
        class="text-white position-absolute start-50 translate-middle"
        style="top: 28px"
        ><i class="bi bi-suit-heart-fill"></i
      ></router-link>
    </div>
  </div>
  <div class="Smallsidebar d-lg-none">
    <div class="addCart mb-2 me-2 position-relative rounded-circle">
      <router-link
        to="/cart"
        class="nav-link text-white position-relative position-absolute start-50 translate-middle"
        style="top: 28px"
        ><i class="bi bi-cart3"></i
        ><span
          v-if="carts.length !== 0"
          class="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
          style="font-size: 13px; top: 5px"
          >{{ totalQty }}
          <span class="visually-hidden">unread messages</span>
        </span></router-link
      >
    </div>
    <div class="addFavorite mb-2 me-2 position-relative rounded-circle">
      <router-link
        to="/favorite"
        class="text-white position-absolute start-50 translate-middle"
        style="top: 28px"
        ><i class="bi bi-suit-heart-fill"></i
      ></router-link>
    </div>
  </div>
  <div></div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/user/useCartStore'
import { storeToRefs } from 'pinia'
const cartStore = useCartStore()
const { carts } = storeToRefs(cartStore)

async function getCart() {
  await cartStore.getCart()
}
const totalQty = computed(() => {
  let total = 0
  if (Array.isArray(carts.value)) {
    carts.value.forEach((item) => {
      total += item.qty
    })
  }
  return total
})

onMounted(() => {
  getCart()
})
</script>
