<template>
  <div
    class="modal fade"
    id="delModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span v-if="item.title">刪除 {{ props.item.title }}</span>
            <span v-else>刪除 訂單編號 {{ props.item.id }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger" v-if="item.title">{{ props.item.title }}</strong>
          <span v-else>訂單編號 <strong class="text-danger">{{ props.item.id }}</strong></span>
          (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('del-item')">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useModal } from '@/composables/modal'

const modalRef = ref(null)
const { showModal, hideModal } = useModal(modalRef)

defineExpose({
  showModal,
  hideModal,
})

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})
</script>
