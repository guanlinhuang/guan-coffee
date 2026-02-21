<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-cambridge-blue text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單資訊</span>
          </h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-5">
              <h4>客戶資料</h4>
              <table class="table">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                  <tr>
                    <th>留言</th>
                    <td v-if="tempOrder.message">{{ tempOrder.message }}</td>
                    <td v-else>無</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-7">
              <h4>訂單細節</h4>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>
                      {{ new Date(order.create_at * 1000).toLocaleString() }}
                    </td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{ new Date(order.paid_date * 1000).toLocaleString() }}
                      </span>
                      <span v-else>-</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success">付款完成</strong>
                      <span v-else class="text-danger">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>${{ $filters.currency(Math.round(tempOrder.total)) }}</td>
                  </tr>
                </tbody>
              </table>
              <h4>商品明細</h4>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>{{ item.qty }} {{ item.product.unit }}</td>
                    <td class="text-end">${{ $filters.currency(Math.round(item.final_total)) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btnHover" data-bs-dismiss="modal">
            <div>
              <span>關閉視窗</span>
              <span>關閉視窗</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch} from 'vue'
import { useModal } from '@/composables/modal'
const modalRef = ref(null)
const { showModal, hideModal } = useModal(modalRef)

defineExpose({
  showModal,
  hideModal,
})

const props = defineProps({
  order:{
  type:Object,
    default: () => ({}),
  }
})

const tempOrder=ref({})
const isPaid=ref(false)

watch(
  () => props.order,
  () => {
    tempOrder.value = props.order
    isPaid.value = tempOrder.value.is_paid
  }
)

</script>
