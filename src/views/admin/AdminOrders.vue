<template>
  <VueLoading :active="adminOrdersStore.isLoading"
    ><section><span class="loader-18"></span></section
  ></VueLoading>
  <div class="container py-5 mx-auto">
    <h3 class="text-center">訂單列表</h3>
    <div class="d-none d-lg-block">
      <table class="table mt-5">
        <thead>
          <tr>
            <th></th>
            <th>建立日期</th>
            <th>訂單編號</th>
            <th>商品明細</th>
            <th class="text-center">金額</th>
            <th class="text-center">付款狀態</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="(item, key) in adminOrdersStore.orders" :key="key">
          <tr>
            <td class="text-center align-middle">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelOrderModal(item)"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </td>
            <td class="align-middle">{{ $filters.date(item.create_at) }}</td>
            <td class="align-middle">{{ item.id }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} - {{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-center">
              ${{ $filters.currency(Math.round(item.total)) }}
            </td>
            <td>
              <div class="form-check form-switch">
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid" class="text-success">付款完成</span>
                  <span v-else class="text-danger">尚未付款</span>
                </label>
                <br />
                <input
                  class="form-check-input mx-auto"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
              </div>
            </td>
            <td class="align-middle">
              <div class="btn-group">
                <button
                  class="btn btn-outline-success btn-sm"
                  @click="openModal(item)"
                >
                  檢視
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-lg-none">
      <div
        class="mx-2 my-3 px-2 border rounded-3"
        v-for="(item, key) in adminOrdersStore.orders"
        :key="key"
      >
        <div class="row mt-3">
          <div class="col-3">
            <h6 class="mb-0">建立日期</h6>
            <p class="mb-0">{{ $filters.date(item.create_at) }}</p>
          </div>
          <div class="col-7">
            <h6 class="mb-0">訂單編號</h6>
            <p class="mb-0">{{ item.id }}</p>
          </div>
          <div class="col-2 d-flex justify-content-end align-items-start">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDelOrderModal(item)"
            >
              <i class="bi bi-x-lg"></i>
            </button>
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
            <p class="mb-0 ms-3">
              ${{ $filters.currency(Math.round(item.total)) }}
            </p>
          </div>
          <div class="col-7 d-flex justify-content-end align-items-center">
            <button
              class="btn btn-outline-success btn-sm me-3"
              type="button"
              @click.prevent="openModal(item)"
            >
              檢視
            </button>
            <div class="form-check form-switch ps-0">
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid" class="text-success">付款完成</span>
                <span v-else class="text-danger">尚未付款</span>
              </label>
              <br />
              <input
                class="form-check-input mx-auto"
                type="checkbox"
                :id="`paidSwitch${item.id}`"
                v-model="item.is_paid"
                @change="updatePaid(item)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <OrderModal
      :order="adminOrdersStore.tempOrder"
      ref="orderModal"
    />
    <DelModal :item="adminOrdersStore.tempOrder" ref="delModal" @del-item="delOrder" />
    <Pagination :pages="paginationStore.pagination" @emit-pages="handlePageChange" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePaginationStore } from '@/stores/shared/usePaginationStore'
import { useAdminOrdersStore } from '@/stores/admin/useAdminOrdersStore'
import DelModal from "@/components/DelModal.vue";
import OrderModal from "@/components/OrderModal.vue";
import Pagination from "@/components/PagePagination.vue";

const paginationStore = usePaginationStore()
const adminOrdersStore = useAdminOrdersStore()

const orderModal = ref(null)
const delModal = ref(null)
const current_page = ref()

const  openModal=(item) =>{
      adminOrdersStore.setTempOrder(item)
      orderModal.value?.showModal()
    }

async function getOrders(page) {
  current_page.value = page
  await adminOrdersStore.getOrders(page)
  paginationStore.setPagination(page, 'admin')
}

const openDelOrderModal = (item) => {
  adminOrdersStore.setTempOrder(item)
  delModal.value?.showModal()
}

const updatePaid = async (item) => {
  const result = await adminOrdersStore.updatePaid(item)
  if (result?.success) {
    orderModal.value?.hideModal()
  }
}

const delOrder = async () => {
  await adminOrdersStore.delOrder()
  delModal.value?.hideModal()
  adminOrdersStore.getOrders(current_page.value)
}

function handlePageChange(page) {
  getOrders(page)
}

onMounted(() => {
  getOrders(1)
})
</script>
