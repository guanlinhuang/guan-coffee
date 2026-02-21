<template>
  <footer class="footer">
    <div class="container py-4">
      <div class="row row-cols-1 row-cols-md-2 mt-lg-5 d-lg-flex justify-content-around">
        <div class="col col-lg-2 ms-3 ms-md-0">
          <router-link to="/"
            ><img src="https://i.imgur.com/L5VIrdW.png" alt="logo" style="height: 100px"
          /></router-link>
          <div class="footer_followUs d-flex mt-3">
            <div class="followBtn">
              <a href="#" class="ps-0 p-2 text-white d-block"
                ><i class="bi bi-facebook fs-1"></i
              ></a>
            </div>
            <div class="followBtn">
              <a href="#" class="p-2 ms-1 text-white d-block"
                ><i class="bi bi-instagram fs-1"></i
              ></a>
            </div>
            <div class="followBtn">
              <a href="https://line.me/ti/p/OwNL1F9kBd" class="p-2 ms-1 text-white d-block"
                ><i class="bi bi-line fs-1"></i
              ></a>
            </div>
          </div>
        </div>
        <div class="col col-lg-6 row flex-row-reverse">
          <div class="col-lg-3 text-white mb-3 text-md-end py-4 py-md-0">
            <router-link to="/aboutus" class="nav-link py-2">- 關於我們</router-link>
            <router-link to="/products/all" class="nav-link py-2">- 所有商品</router-link>
            <router-link to="/UserOrderSearch" class="nav-link py-2">- 訂單查詢</router-link>
            <router-link to="/storelist" class="nav-link py-2">- 門市資訊</router-link>
          </div>
          <div class="col-lg-7 text-md-end text-white mb-5 mb-lg-0">
            <ul class="list-unstyled">
              <li class="py-2">
                <a href="tel:04-12345678" class="text-white">04-1234-5678</a>
              </li>
              <li class="py-2">
                <a href="mailto:guantony.service@gmail.com" class="text-white"
                  >guantony.service@gmail.com</a
                >
              </li>
              <li class="py-2">
                <a
                  href="https://maps.app.goo.gl/1fbwTvNMmPDQgeAp8"
                  target="_blank"
                  class="text-white"
                  >台中市北屯區昌平路二段45之8號</a
                >
              </li>
            </ul>
            <router-link
              target="_blank"
              to="/dashboard/products/all"
              class="text-white text-decoration-none"
              >管理員後台</router-link
            >
          </div>
        </div>
      </div>
      <div class="text-center text-white pt-4">
        <p class="mb-0">本網站由GuanTony工作室設計 © 2025版權所有</p>
        <p class="mb-0">【 本網站為個人練習作品用，非商業使用 】</p>
      </div>
    </div>
  </footer>
</template>
