<template>
  <header class="header my-5">
    <nav class="navbar navbar-light navbar-expand-lg fixed-top">
      <div class="container-fluid">
        <router-link class="navbar-brand d-lg-none mx-2 p-0" to="/dashboard/products"
          ><img src="https://i.imgur.com/L5VIrdW.png" alt="logo" style="height: 40px"
        /></router-link>
        <div class="fs-4 p-1 mb-0 bg-danger text-white d-lg-none">管理員後台</div>
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
          <div class="offcanvas-header d-flex justify-content-end d-lg-none">
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
                    to="/dashboard/products"
                    class="nav-link text-white border-underline"
                    @click.prevent="closeOffcanvas"
                    >產品列表</router-link
                  >
                </li>
                <li class="nav-item my-2 my-lg-0">
                  <router-link
                    to="/dashboard/orders"
                    class="nav-link text-white border-underline"
                    @click.prevent="closeOffcanvas"
                    >訂單列表</router-link
                  >
                </li>
                <li class="nav-item d-none d-lg-block">
                </li>
                <li class="nav-item my-2 my-lg-0">
                  <router-link
                    to="/dashboard/coupons"
                    class="nav-link text-white border-underline"
                    @click.prevent="closeOffcanvas"
                    >優惠券列表</router-link
                  >
                </li>
                <li class="nav-item my-2 my-lg-0">
                  <router-link
                    to="/"
                    class="nav-link text-white border-underline"
                    @click.prevent="closeOffcanvas"
                    >用戶端</router-link
                  >
                </li>
                <li class="nav-item d-lg-none">
                  <router-link
                    to="/login"
                    class="nav-link text-white border-underline"
                    @click.prevent="logout"
                    >登出</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="position-absolute end-0 d-flex align-items-center d-none d-lg-block">
            <div class="d-flex">
              <div class="fs-4 p-1 mb-0 me-3 bg-danger text-white ">管理員後台</div>
              <button type="button" @click.prevent="logout" class="btn btn-outline-light me-5">
                &ensp;登出&ensp;
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useOffcanvas } from '@/composables/offcanvas'

const router = useRouter()

const logout = async () => {
  const api = `${import.meta.env.VITE_APP_API}logout`
  const res = await axios.post(api)
  if (res.data.success) {
    router.push('/login')
  }
}
const { closeOffcanvas } = useOffcanvas()
</script>
