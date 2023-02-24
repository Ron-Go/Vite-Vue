<template lang="">
  <div class="container">
    <div class="row vh-100 d-flex flex-column align-items-center">
      <div class="col-6 col-sm-6 col-md-4 col-lg-3 mt-auto mb-auto">
        <!-- 套用vee-VeeValidate -->
        <v-form v-slot="{ errors }" @submit="login.signin()">
          <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
          <div class="form-floating mb-3">
            <v-field
              type="email"
              name="email"
              class="form-control"
              id="account"
              :class="{
                'is-invalid': errors['email'],
                'is-valid': login.adminData.username !== '' && !errors['email'],
              }"
              placeholder="name@example.com"
              rules="email|required"
              v-model="login.adminData.username"
            ></v-field>
            <label for="account">Email address</label>
            <error-message
              name="email"
              class="invalid-feedback"
            ></error-message>
          </div>
          <div class="form-floating">
            <v-field
              type="password"
              name="password"
              class="form-control"
              id="password"
              :class="{
                'is-invalid': errors['password'],
                'is-valid':
                  login.adminData.password !== '' && !errors['password'],
              }"
              placeholder="Password"
              :rules="isPassword"
              v-model="login.adminData.password"
            ></v-field>
            <label for="password">Password</label>
            <error-message
              name="password"
              class="invalid-feedback"
            ></error-message>
          </div>
          <button type="submit" class="btn btn-lg btn-primary mt-3 w-100">
            登入
          </button>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script setup>
// 匯入loginStore
import loginStore from '@/stores/loginStore.js';
// 匯入表單驗證
import { isPassword } from '@/mixins/validateRule.js';

const login = loginStore();
</script>
