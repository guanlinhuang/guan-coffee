import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap/dist/css/bootstrap.min.css' // 載入 Bootstrap 的樣式：按鈕、排版、grid、字體等
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // 載入 Bootstrap 的互動功能：Modal、Tooltip、Dropdown 等（含 Popper.js）
import 'bootstrap-icons/font/bootstrap-icons.css'

import VueLoading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

import { currency, date } from '@/composables/filters'

import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate' // 引入 Vee Validate 元件跟功能
import { all as AllRules } from '@vee-validate/rules' // 引入 Vee Validate 全部驗證規則
import { localize, setLocale } from '@vee-validate/i18n' // 引入 Vee Validate 多國語系功能
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json' // 引入 Vee Validate 繁體中文語系檔

// 吐司元件
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// 自己的 SCSS放最後，才不會被覆蓋
import '@/assets/all.scss'

// Vee Validate 表單驗證語法開始
// 定義規則（加入全部規則）
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

// 加入 Vee Validate 繁體中文語系檔
// *將當前 Vee Validate 語系設定為繁體中文
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 指欄位輸入內容時，會立即進行驗證（即邊寫邊判斷）
})

// *設定預設語系
setLocale('zh_TW')

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.config.globalProperties.$filters = {
  currency,
  date,
}
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('VueLoading', VueLoading)
app.use(Vue3Toastify, {
  position: 'top-center',
  pauseOnHover: false,
  autoClose: 2500,
  dangerouslyHTMLString: true,
})

app.mount('#app')
