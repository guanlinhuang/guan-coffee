<template>
  <div class="store">
    <div class="container py-5 mainContainer">
      <h3 class="text-center">門市資訊</h3>
      <div class="store_btn my-4 my-lg-5 row row-cols-2 row-cols-lg-6 gx-1 gx-lg-3 mx-1 mx-lg-0">
        <div class="col">
          <button
            type="button"
            class="btnHover2 w-100 mb-1 mb-lg-0"
            @click.prevent="storeFilter('台中創始店'), changeClass(1)"
            :class="{ active: isActive === 1 }"
            value="台中創始店"
          >
            台中創始店<span></span><span></span><span></span><span></span>
          </button>
        </div>
        <div class="col">
          <button
            type="button"
            class="btnHover2 w-100 mb-1 mb-lg-0"
            @click.prevent="storeFilter('台北門市'), changeClass(2)"
            :class="{ active: isActive === 2 }"
            value="台北門市"
          >
            台北門市<span></span><span></span><span></span><span></span>
          </button>
        </div>
        <div class="col">
          <button
            type="button"
            class="btnHover2 w-100 mb-1 mb-lg-0"
            @click.prevent="storeFilter('新北門市'), changeClass(3)"
            :class="{ active: isActive === 3 }"
            value="新北門市"
          >
            新北門市<span></span><span></span><span></span><span></span>
          </button>
        </div>
        <div class="col">
          <button
            type="button"
            class="btnHover2 w-100 mb-1 mb-lg-0"
            @click.prevent="storeFilter('桃園門市'), changeClass(4)"
            :class="{ active: isActive === 4 }"
            value="桃園門市"
          >
            桃園門市<span></span><span></span><span></span><span></span>
          </button>
        </div>
        <div class="col">
          <button
            type="button"
            class="btnHover2 w-100 mb-1 mb-lg-0"
            @click.prevent="storeFilter('台中旗艦門市'), changeClass(5)"
            :class="{ active: isActive === 5 }"
            value="台中旗艦門市"
          >
            台中旗艦門市<span></span><span></span><span></span><span></span>
          </button>
        </div>
        <div class="col">
          <button
            type="button"
            class="btnHover2 w-100 mb-1 mb-lg-0"
            @click.prevent="storeFilter('高雄門市'), changeClass(6)"
            :class="{ active: isActive === 6 }"
            value="高雄門市"
          >
            高雄門市<span></span><span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="store_info mb-5 mx-2">
        <div v-if="storeListStore.name === '台中創始店'">
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <table class="store_detail table">
                <thead>
                  <tr>
                    <th colspan="2"><h5>台中創始店</h5></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">地址</th>
                    <td>台中市北屯區昌平路二段45之8號</td>
                  </tr>
                  <tr>
                    <th scope="row">電話</th>
                    <td>04-1234-5678</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-nowrap">支付方式</th>
                    <td>信用卡、Apple Pay、Line Pay、街口支付、全支付</td>
                  </tr>
                  <tr>
                    <th scope="row">營業時間</th>
                    <td>10:00 ~ 19:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-5">
              <div class="store_map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d490.97145021086664!2d120.68305818918164!3d24.191849705038244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346917bc7876b4b3%3A0xdd17b57821821806!2zNy1FTEVWRU4g5piM55ub6ZaA5biC!5e0!3m2!1szh-TW!2stw!4v1735986363591!5m2!1szh-TW!2stw"
                  width="100%"
                  height="300px"
                  style="border: 0"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="storeListStore.name === '台北門市'">
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <table class="store_detail table">
                <thead>
                  <tr>
                    <th colspan="2"><h5>台北門市</h5></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">地址</th>
                    <td>台北市信義區信義路五段20號B1樓</td>
                  </tr>
                  <tr>
                    <th scope="row">電話</th>
                    <td>02-1234-5678</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-nowrap">支付方式</th>
                    <td>信用卡、Apple Pay、Line Pay、街口支付、全支付</td>
                  </tr>
                  <tr>
                    <th scope="row">營業時間</th>
                    <td>09:00 ~ 23:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-5">
              <div class="store_map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d903.7595789086616!2d121.5623531118035!3d25.03277373464955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abc0a56e780d%3A0x43f613ef704f59c1!2zNy1FTEVWRU4g6LK_5o236ZaA5biC!5e0!3m2!1szh-TW!2stw!4v1735986990948!5m2!1szh-TW!2stw"
                  width="100%"
                  height="300px"
                  style="border: 0"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="storeListStore.name === '新北門市'">
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <table class="store_detail table">
                <thead>
                  <tr>
                    <th colspan="2"><h5>新北門市</h5></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">地址</th>
                    <td>新北市板橋區文化路一段135號</td>
                  </tr>
                  <tr>
                    <th scope="row">電話</th>
                    <td>02-1234-5678</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-nowrap">支付方式</th>
                    <td>信用卡、Apple Pay、Line Pay、街口支付、全支付</td>
                  </tr>
                  <tr>
                    <th scope="row">營業時間</th>
                    <td>09:00 ~ 23:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-5">
              <div class="store_map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.5794675926068!2d121.46211660257383!3d25.014401699210005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a81bd0176c7f%3A0xb2004af963575007!2zNy1FTEVWRU4o5paw5p2_5qmL6ZaA5biCKQ!5e0!3m2!1szh-TW!2stw!4v1735987122869!5m2!1szh-TW!2stw"
                  width="100%"
                  height="300px"
                  style="border: 0"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="storeListStore.name === '桃園門市'">
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <table class="store_detail table">
                <thead>
                  <tr>
                    <th colspan="2"><h5>桃園門市</h5></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">地址</th>
                    <td>桃園市蘆竹區中山路152號</td>
                  </tr>
                  <tr>
                    <th scope="row">電話</th>
                    <td>03-1234-5678</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-nowrap">支付方式</th>
                    <td>信用卡、Apple Pay、Line Pay、街口支付、全支付</td>
                  </tr>
                  <tr>
                    <th scope="row">營業時間</th>
                    <td>10:00 ~ 22:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-5">
              <div class="store_map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2822.6337688294707!2d121.29765586259263!3d25.058499452747622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a06551e9c4f1%3A0xbb3d448aa1725513!2zNy1FTEVWRU4g6JiG5bGx6ZaA5biC!5e0!3m2!1szh-TW!2stw!4v1735987170612!5m2!1szh-TW!2stw"
                  width="100%"
                  height="300px"
                  style="border: 0"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="storeListStore.name === '台中旗艦門市'">
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <table class="store_detail table">
                <thead>
                  <tr>
                    <th colspan="2"><h5>台中旗艦門市</h5></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">地址</th>
                    <td>台中市西屯區文心路二段566號</td>
                  </tr>
                  <tr>
                    <th scope="row">電話</th>
                    <td>04-1234-5678</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-nowrap">支付方式</th>
                    <td>信用卡、Apple Pay、Line Pay、街口支付、全支付</td>
                  </tr>
                  <tr>
                    <th scope="row">營業時間</th>
                    <td>09:00 ~ 23:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-5">
              <div class="store_map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2578.6245669700775!2d120.6467099762242!3d24.15730268580954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d924acfc7ab%3A0x503eff5e4256bdf0!2zNy1FTEVWRU4g6ZqG5b-D6ZaA5biC!5e0!3m2!1szh-TW!2stw!4v1735987616966!5m2!1szh-TW!2stw"
                  width="100%"
                  height="300px"
                  style="border: 0"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="storeListStore.name === '高雄門市'">
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <table class="store_detail table">
                <thead>
                  <tr>
                    <th colspan="2"><h5>高雄門市</h5></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">地址</th>
                    <td>高雄市苓雅區光華一路226號1樓</td>
                  </tr>
                  <tr>
                    <th scope="row">電話</th>
                    <td>07-1234-5678</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-nowrap">支付方式</th>
                    <td>信用卡、Apple Pay、Line Pay、街口支付、全支付</td>
                  </tr>
                  <tr>
                    <th scope="row">營業時間</th>
                    <td>10:00 ~ 23:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-5">
              <div class="store_map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11280.153762391868!2d120.3161922977988!3d22.632348974547487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e05b91ce88453%3A0xc40cc74d653407c3!2zNy1FTEVWRU4g5YWJ5bCa6ZaA5biC!5e0!3m2!1szh-TW!2stw!4v1735987442138!5m2!1szh-TW!2stw"
                  width="100%"
                  height="300px"
                  style="border: 0"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import{useStoreListStore}from'@/stores/user/useStoreListStore'
const storeListStore=useStoreListStore()

function storeFilter(useName){
  storeListStore.storeFilter(useName)
}

function changeClass(index) {
  storeListStore.changeClass(index)
}
</script>
