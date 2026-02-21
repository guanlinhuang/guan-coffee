<template>
  <VueLoading :active="adminCouponsStore.isLoading"
    ><section><span class="loader-18"></span></section
  ></VueLoading>
  <div class="container py-5 mx-auto">
    <h3 class="text-center">優惠券列表</h3>
    <div class="text-end mt-4 me-2">
      <button class="btnHover btnHover5" @click="openCouponModal(true)">
        <div>
          <span>建立優惠券</span>
          <span>建立優惠券</span>
        </div>
      </button>
    </div>
    <div class="d-none d-lg-block">
      <div class="row">
        <div class="col-9 mx-auto">
          <table class="table align-middle text-center">
            <thead>
              <tr>
                <th></th>
                <th>優惠券名稱</th>
                <th>優惠碼</th>
                <th>折扣百分比</th>
                <th>到期日</th>
                <th>是否啟用</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) in adminCouponsStore.coupons" :key="key">
                <td class="text-center">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openDelCouponModal(item)"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </td>
                <td>{{ item.title }}</td>
                <td>{{ item.code }}</td>
                <td>{{ item.percent }}%</td>
                <td>{{ $filters.date(item.due_date) }}</td>
                <td>
                  <span v-if="item.is_enabled === 1" class="text-success"
                    >啟用</span
                  >
                  <span v-else class="text-danger">未啟用</span>
                </td>
                <td>
                  <div class="btn-group">
                    <button
                      class="btnHover"
                      @click="openCouponModal(false, item)"
                    >
                      <div>
                        <span>編輯</span>
                        <span>編輯</span>
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="d-lg-none">
      <div
        class="mx-2 my-3 px-2 border rounded-3"
        v-for="(item, key) in adminCouponsStore.coupons"
        :key="key"
      >
        <div class="row mt-3">
          <div class="col-8">
            <h5 class="mb-0 lh-base">
              {{ item.title
              }}<span
                v-if="item.is_enabled === 1"
                class="text-success fs-6 ms-3"
                >啟用</span
              >
              <span v-else class="text-danger fs-6 ms-3">未啟用</span>
            </h5>
          </div>
          <div class="col-4 d-flex justify-content-end align-items-start">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDelCouponModal(item)"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
        <div class="py-3 border-top border-bottom mt-3">
          <div class="row">
            <div class="col">
              <h6>優惠碼</h6>
              <p class="mb-0">{{ item.code }}</p>
            </div>
            <div class="col">
              <h6>折扣百分比</h6>
              <p class="mb-0">{{ item.percent }}%</p>
            </div>
            <div class="col">
              <h6>到期日</h6>
              <p class="mb-0">{{ $filters.date(item.due_date) }}</p>
            </div>
          </div>
        </div>
        <div class="mt-3 mb-3 d-flex justify-content-end">
          <button
            class="btnHover p-1"
            @click="openCouponModal(false, item)"
            style="min-width: 100px"
          >
            <div>
              <span>編輯</span>
              <span>編輯</span>
            </div>
          </button>
        </div>
      </div>
    </div>
    <CouponModal
      :coupon="adminCouponsStore.tempCoupon"
      ref="couponModal"
      @update-coupon="updateCoupon"
    />
    <DelModal :item="adminCouponsStore.tempCoupon" ref="delModal" @del-item="delCoupon" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CouponModal from "@/components/CouponModal.vue";
import DelModal from "@/components/DelModal.vue";
import { useAdminCouponsStore } from '@/stores/admin/useAdminCouponsStore'
const adminCouponsStore = useAdminCouponsStore()

const couponModal = ref(null)
const delModal = ref(null)

async function getCoupons() {
  await adminCouponsStore.getCoupons()
}

function openCouponModal(status, item) {
  adminCouponsStore.openCouponModal(status, item)
  couponModal.value?.showModal()
}

async function updateCoupon(tempCoupon) {
 await adminCouponsStore.updateCoupon(tempCoupon)
 couponModal.value?.hideModal()
}

function openDelCouponModal(item) {
      adminCouponsStore.openDelCouponModal(item)
      delModal.value?.showModal()
    }

async function delCoupon() {
  await adminCouponsStore.delCoupon(adminCouponsStore.tempCoupon)
  delModal.value?.hideModal()
}



onMounted(()=>{
  getCoupons()
})
</script>
