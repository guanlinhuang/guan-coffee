<template>
  <VueLoading :active="orderStore.isLoading"
    ><section><span class="loader-18"></span></section
  ></VueLoading>
  <div class="order_search">
    <div class="container mainContainer" style="padding-top: 100px; padding-bottom: 100px">
      <h3 class="text-center">訂單查詢</h3>
      <div class="py-4 py-lg-5">
        <v-form @submit="searchOrder">
          <div class="row row-cols-1 justify-content-center align-items-center">
            <div class="col-10 col-lg-3 px-0 mb-3 mb-lg-0">
              <v-field
                id="orderId"
                class="form-control w-100"
                name="search"
                type="text"
                placeholder="請輸入Email or 電話"
                v-model="orderStore.search"
              ></v-field>
            </div>
            <div class="col col-lg-2 px-0 d-flex justify-content-center">
              <button class="btnHover ms-3" type="submit">
                <div>
                  <span>查詢</span>
                  <span>查詢</span>
                </div>
              </button>
            </div>
          </div>
        </v-form>
        <div
          v-if="orderStore.searchState && orderStore.filterOrder.length === 0"
          class="text-center my-5"
        >
          <div>
            <p>查無資料，請重新查詢。</p>
          </div>
        </div>
        <div v-else-if="orderStore.searchState && orderStore.filterOrder.length !== 0" class="my-5">
          <div class="d-none d-lg-block">
            <table class="table my-3 table-hover">
              <thead>
                <tr>
                  <th>建立日期</th>
                  <th>訂單編號</th>
                  <th>商品明細</th>
                  <th>總金額</th>
                  <th>付款狀態</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-for="item in orderStore.filterOrder" :key="item.id" class="searchTbody">
                <tr class="align-middle">
                  <td class="fw-bolder">
                    {{ $filters.date(item.create_at) }}
                  </td>
                  <td>{{ item.id }}</td>
                  <td>
                    <ul class="list-unstyled">
                      <li v-for="product in item.products" :key="product.id">
                        - {{ product.product.title }} - {{ product.qty }}
                        {{ product.product.unit }}
                      </li>
                    </ul>
                  </td>
                  <td>${{ $filters.currency(Math.round(item.total)) }}</td>
                  <td>
                    <span v-if="!item.is_paid" class="text-danger">尚未付款</span>
                    <span v-else class="text-success">付款完成</span>
                  </td>
                  <td>
                    <button
                      v-if="item.is_paid"
                      class="btn btn-outline-success btn-sm"
                      @click.prevent="payOrder(item.id)"
                    >
                      檢視
                    </button>
                    <button
                      v-else
                      class="btn btn-outline-danger btn-sm"
                      type="button"
                      @click.prevent="payOrder(item.id)"
                    >
                      檢視、付款
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-lg-none">
            <div
              class="mx-2 my-3 px-2 border rounded-3"
              v-for="item in orderStore.filterOrder"
              :key="item.id"
            >
              <div class="row mt-3">
                <div class="col-4">
                  <h6 class="mb-0">建立日期</h6>
                  <p class="mb-0">{{ $filters.date(item.create_at) }}</p>
                </div>
                <div class="col-8">
                  <h6 class="mb-0">訂單編號</h6>
                  <p class="mb-0">{{ item.id }}</p>
                </div>
              </div>
              <div class="py-3 border-top border-bottom mt-3">
                <h6 class="mb-0">商品明細</h6>
                <ul class="list-unstyled mb-0">
                  <li v-for="product in item.products" :key="product.id">
                    - {{ product.product.title }} - {{ product.qty }}
                    {{ product.product.unit }}
                  </li>
                </ul>
              </div>
              <div class="row mt-3 mb-3">
                <div class="col-5 d-flex align-items-center">
                  <h6 class="mb-0">總金額</h6>
                  <p class="mb-0 ms-3">${{ $filters.currency(Math.round(item.total)) }}</p>
                </div>
                <div class="col-7 d-flex justify-content-end align-items-center">
                  <p v-if="!item.is_paid" class="text-danger me-3 mb-0">尚未付款</p>
                  <p v-else class="text-success me-3 mb-0">付款完成</p>
                  <button
                    v-if="item.is_paid"
                    class="btn btn-outline-success btn-sm"
                    @click.prevent="payOrder(item.id)"
                  >
                    檢視
                  </button>
                  <button
                    v-else
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    @click.prevent="payOrder(item.id)"
                  >
                    檢視、付款
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOrderStore } from '@/stores/user/useOrderStore'

const orderStore = useOrderStore()

function searchOrder() {
  orderStore.searchOrder()
}

function payOrder(id) {
  orderStore.payOrder(id)
}

onMounted(() => {
  orderStore.getOrderAll()
})
</script>
