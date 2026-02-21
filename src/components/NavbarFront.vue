<template>
  <header class="header">
    <div class="container-full-width fixed-top">
      <div class="coupon d-flex justify-content-center align-items-center w-100">
        <p class="mb-0">輸入優惠碼 Guan2025，結帳享8折</p>
      </div>
      <nav class="navbar navbar-light navbar-expand-lg">
        <div class="container">
          <router-link to="/" class="navbar-brand d-lg-none mx-2 p-0" href="#"
            ><img src="https://i.imgur.com/L5VIrdW.png" alt="logo" style="height: 40px"
          /></router-link>
          <button
            class="navbar-toggler d-lg-none p-0 pe-2 text-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <i class="bi bi-filter-right"></i>
          </button>
          <div
            class="offcanvas offcanvas-end justify-content-center text-white"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div
              class="offcanvas-header offcanvas-header_fornt d-flex justify-content-end d-lg-none"
            >
              <button
                type="button"
                class="text-reset border-0 text_bg"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                id="closeOffcanvas"
              >
                <i class="bi bi-x-lg fs-3"></i>
              </button>
            </div>
            <div class="offcanvas-body justify-content-center">
              <div>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                  <li class="nav-item my-2 my-lg-0">
                    <router-link
                      to="/aboutus"
                      class="nav-link text-white border-underline"
                      @click.prevent="closeOffcanvas"
                      >關於我們</router-link
                    >
                  </li>
                  <li class="nav-item my-2 my-lg-0">
                    <router-link
                      to="/products/all"
                      class="nav-link text-white border-underline"
                      @click.prevent="closeOffcanvas"
                      >所有商品</router-link
                    >
                  </li>
                  <li class="nav-item d-none d-lg-block">
                    <router-link to="/" class="nav-link mx-4 p-0"
                      ><img src="https://i.imgur.com/L5VIrdW.png" alt="logo" style="height: 40px"
                    /></router-link>
                  </li>
                  <li class="nav-item my-2 my-lg-0">
                    <router-link
                      to="/UserOrderSearch"
                      class="nav-link text-white border-underline"
                      @click.prevent="closeOffcanvas"
                      >訂單查詢</router-link
                    >
                  </li>
                  <li class="nav-item my-2 my-lg-0">
                    <router-link
                      to="/storelist"
                      class="nav-link text-white border-underline"
                      @click.prevent="closeOffcanvas"
                      >門市資訊</router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useOffcanvas } from '@/composables/offcanvas'

const { closeOffcanvas } = useOffcanvas()
</script>
