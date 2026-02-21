import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSendEmailStore = defineStore('sendEmail', () => {
  const formSuccess = ref(false)

  function sendEmail() {
    formSuccess.value = true
  }
  return { formSuccess, sendEmail }
})
