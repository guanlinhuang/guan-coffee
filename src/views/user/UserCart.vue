<template>
  <VueLoading :active="cartStore.isLoading"
    ><section><span class="loader-18"></span></section
  ></VueLoading>
  <div class="container userCart mainContainer">
    <div class="pt-3" v-if="cartStore.cart.total !== 0">
      <div class="shopping_process d-flex justify-content-center align-items-center mx-4">
        <div class="text-center mx-3">
          <i class="bi bi-cart-check fs-3"></i>
          <div class="row row-cols-1 row-cols-lg-2">
            <div class="col px-0"><p class="mb-0">商品</p></div>
            <div class="col px-0"><p class="mb-0">確認</p></div>
          </div>
        </div>
        <div class="process_gray_line"></div>
        <div class="process_gray text-center mx-3">
          <i class="bi bi-pen fs-3"></i>
          <div class="row row-cols-1 row-cols-lg-2">
            <div class="col px-0"><p class="mb-0">資料</p></div>
            <div class="col px-0"><p class="mb-0">填寫</p></div>
          </div>
        </div>
        <div class="process_gray_line"></div>
        <div class="process_gray text-center mx-3">
          <i class="bi bi-cash-coin fs-3"></i>
          <div class="row row-cols-1 row-cols-lg-2">
            <div class="col px-0"><p class="mb-0">資料</p></div>
            <div class="col px-0"><p class="mb-0">確認</p></div>
          </div>
        </div>
        <div class="process_gray_line"></div>
        <div class="process_gray text-center mx-3">
          <i class="bi bi-cart-check-fill fs-3"></i>
          <div class="row row-cols-1 row-cols-lg-2">
            <div class="col px-0"><p class="mb-0">訂單</p></div>
            <div class="col px-0"><p class="mb-0">完成</p></div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-lg-5">
        <div class="col col-lg-7 me-4 d-none d-lg-block">
          <table class="mx-auto table align-middle">
            <thead>
              <tr class="text-center">
                <th>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openDelProductModalAll()"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </th>
                <th></th>
                <th class="text-start" style="width: 250px">商品</th>
                <th>數量</th>
                <th>單價</th>
                <th>總價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartStore.carts" :key="item.id">
                <td class="text-center">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openDelProductModal(item)"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </td>
                <td style="width: 70px">
                  <div style="width: 70px; height: 100px">
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                      class="w-100 h-100 object-fit-cover"
                    />
                  </div>
                </td>
                <td class="align-top">
                  <a
                    class="productName text-decoration-none text-dark"
                    @click="getProductPage(item.product.id)"
                    >{{ item.product.title }}</a
                  >
                </td>
                <td style="width: 150px">
                  <div class="input-group">
                    <button
                      class="btn border-0"
                      type="button"
                      @click="changeQty(-1, item)"
                      :disabled="item.qty === 1"
                    >
                      <i class="bi bi-dash-lg"></i>
                    </button>
                    <input
                      type="number"
                      class="form-control text-center"
                      @change="updateCart(item)"
                      v-model.number="item.qty"
                      min="1"
                      readonly
                    />
                    <button class="btn border-0" type="button" @click="changeQty(1, item)">
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>
                </td>
                <td class="text-center">
                  ${{ $filters.currency(Math.round(item.product.price)) }}
                </td>
                <td class="text-center">${{ $filters.currency(Math.round(item.total)) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-end">
            <router-link to="/products/all" type="button" class="mt-3 py-2 btnHover">
              <div>
                <span>繼續選購</span>
                <span>繼續選購</span>
              </div>
            </router-link>
          </div>
        </div>
        <div class="col col-lg-4 d-none d-lg-block">
          <div class="border px-3 pb-3">
            <div class="d-flex justify-content-between align-items-center my-3">
              <p class="mb-0">商品總價</p>
              <p class="fs-5 mb-0">NT${{ $filters.currency(Math.round(cartStore.cart.total)) }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="input-group mb-3 w-100">
                <input
                  type="text"
                  class="form-control noline"
                  placeholder="請輸入優惠碼"
                  v-model="couponStore.couponCode"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline"
                  type="button"
                  id="button-addon2"
                  @click="addCouponCode"
                >
                  套用優惠碼
                </button>
              </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between align-items-center">
              <p class="mb-0">總金額</p>
              <p class="mb-0 fs-3 text-success">
                NT${{ $filters.currency(Math.round(cartStore.cart.final_total)) }}
              </p>
            </div>
            <div v-if="cartStore.cart.final_total !== cartStore.cart.total">
              <p class="mb-0 text-end text-danger">(已套用優惠券)</p>
            </div>
            <div>
              <router-link to="/order" type="button" class="mt-3 py-2 btnHover btnHover5 w-100">
                <div>
                  <span>下一步</span>
                  <span>下一步</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 mt-lg-0">
        <div class="d-lg-none">
          <table class="mx-auto table align-middle">
            <thead>
              <tr class="text-end">
                <th></th>
                <th>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openDelProductModalAll()"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartStore.carts" :key="item.id">
                <td style="width: 70px">
                  <div style="width: 70px; height: 100px">
                    <img
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                      class="w-100 h-100 object-fit-cover"
                    />
                  </div>
                </td>
                <td>
                  <a
                    class="productName text-decoration-none text-dark"
                    @click="getProductPage(item.product.id)"
                    >{{ item.product.title }}</a
                  >
                  <div class="d-flex mt-4">
                    <div class="input-group" style="width: 100px; height: 30px">
                      <button
                        class="btn border-0 p-1"
                        type="button"
                        @click="changeQty(-1, item)"
                        :disabled="item.qty === 1"
                      >
                        <i class="bi bi-dash"></i>
                      </button>
                      <input
                        type="number"
                        class="form-control text-center noline p-0"
                        @change="updateCart(item)"
                        v-model.number="item.qty"
                        min="1"
                        readonly
                      />
                      <button class="btn border-0 p-1" type="button" @click="changeQty(1, item)">
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                    <p class="my-auto ms-3">${{ item.total }}</p>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm ms-auto"
                      @click="openDelProductModal(item)"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-block d-lg-none">
          <div class="px-2 pb-3">
            <div class="d-flex justify-content-between align-items-center my-3">
              <p class="mb-0">商品總價</p>
              <p class="fs-5 mb-0">NT${{ $filters.currency(Math.round(cartStore.cart.total)) }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="input-group mb-3 w-100">
                <input
                  type="text"
                  class="form-control noline"
                  placeholder="請輸入優惠碼"
                  v-model="couponStore.couponCode"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline"
                  type="button"
                  id="button-addon2"
                  @click="addCouponCode"
                >
                  套用優惠碼
                </button>
              </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between align-items-center">
              <p class="mb-0">總金額</p>
              <p class="mb-0 fs-3 text-success">
                NT${{ $filters.currency(Math.round(cartStore.cart.final_total)) }}
              </p>
            </div>
            <div v-if="cartStore.cart.final_total !== cartStore.cart.total">
              <p class="mb-0 text-end text-danger">(已套用優惠券)</p>
            </div>
            <div class="row gx-2">
              <div class="col-4">
                <router-link
                  to="/products/all"
                  type="button"
                  class="mt-3 py-2 btnHover w-100 d-block"
                  style="min-width: 0px"
                >
                  <div>
                    <span>繼續選購</span>
                    <span>繼續選購</span>
                  </div>
                </router-link>
              </div>
              <div class="col-8">
                <router-link
                  to="/order"
                  type="button"
                  class="mt-3 py-2 btnHover btnHover5 w-100 d-block"
                >
                  <div>
                    <span>下一步</span>
                    <span>下一步</span>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text-center my-5" style="padding-top: 150px; padding-bottom: 250px">
        <p class="fs-4 ls">您的購物車目前是空的唷！</p>
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
    <DelModal :item="product" ref="delModal" @del-item="delProduct" />
  </div>
</template>


<script setup>
import DelModal from '@/components/DelModal.vue'
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/user/useCartStore'
import { useProductStore } from '@/stores/user/useProductStore'
import { useCouponStore } from '@/stores/user/useCouponStore'

const cartStore = useCartStore()
const productStore = useProductStore()
const couponStore = useCouponStore()

const delModal = ref(null)
const product = ref({})
const tempProduct = ref({})

function changeQty(number, item) {
  item.qty += number
  cartStore.updateCart(item)
}

function openDelProductModalAll() {
  product.value.title = '所有商品'
  delModal.value?.showModal()
}

function openDelProductModal(item) {
  tempProduct.value = { ...item }
  product.value = tempProduct.value.product
  delModal.value?.showModal()
}

async function delProduct() {
  try {
    await cartStore.deleteCart(
      product.value.title === '所有商品' ? { title: '所有商品' } : tempProduct.value
    )
    delModal.value?.hideModal()
  } catch (err) {
    console.error('刪除失敗', err)
  }
}

function getProductPage(id) {
  productStore.getProductPage(id)
}

function addCouponCode() {
  couponStore.addCouponCode()
}

onMounted(() => {
  cartStore.getCart()
})
</script>
