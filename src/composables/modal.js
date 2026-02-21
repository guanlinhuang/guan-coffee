import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

export function useModal(modalRef) {
  const modalInstance = ref(null)

  const showModal = () => modalInstance.value?.show()
  const hideModal = () => modalInstance.value?.hide()

  onMounted(() => {
    if (modalRef.value) {
      modalInstance.value = new Modal(modalRef.value)
    }
  })

  return {
    showModal,
    hideModal,
  }
}
