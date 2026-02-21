<template>
  <div class="backstage_bg">
    <div class="container pt-5 vh-100">
      <v-form class="row justify-content-center" v-slot="{ errors }" @submit="signIn">
        <div class="col-md-4">
          <h1 class="text-center my-5">管理員後台</h1>
          <div class="mb-3 mx-4 mx-sm-0">
            <label for="email" class="form-label">Email:&ensp;</label>
            <v-field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="user.username"
            ></v-field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3 mx-4 mx-sm-0">
            <label for="password" class="form-label">Password:&ensp;</label>
            <v-field
              id="password"
              name="password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors['password'] }"
              placeholder="請輸入 Password"
              rules="required"
              v-model="user.password"
            ></v-field>
            <ErrorMessage name="password" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="text-center mt-4">
            <button class="btnHover btnHover6 btn btn-outline-dark" type="submit">
              <div>
                <span>登入 </span>
                <span>登入</span>
              </div>
            </button>
          </div>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { useAdminLoginStore } from '@/stores/admin/useAdminLoginStore'
import { storeToRefs } from 'pinia'
const adminLoginStore = useAdminLoginStore()
const { user } = storeToRefs(adminLoginStore)

async function signIn() {
  await adminLoginStore.signIn()
}
</script>
