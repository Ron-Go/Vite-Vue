<template lang="">
  <!-- v-if條件：取得產品資料 && 通過登入驗證(token) -->
  <div v-if="admin.tempProducts.length && admin.checkResult" class="container px-0">
    <div class="container mt-5">
      <div class="row">
        <div class="col-3 me-auto">
          <div class="d-flex align-items-center me-auto">
            <label class="form-label me-3 mb-0 w-25" for="category">分類</label>
            <select class="form-select border selectEl" id="category" @change="admin.selectOnChange">
              <option value="" selected disabled>選擇分類</option>
              <template v-for="(item, key) in admin.AllCategory" :key="'option' + key">
                <option :value="item">{{`${item === '' ? '不分類' : item }`}}</option>
              </template>
            </select>
          </div>
        </div>
        <div class="col-2 text-end">
          <button class="btn btn-success" @click="addItem()">
            建立新的產品
          </button>
        </div>
      </div>
    </div>
    <table class="table table-hover mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120" @click="admin.itemSort('origin_price')">
            原價
          </th>
          <th width="120" @click="admin.itemSort('price')">
            售價
          </th>
          <th width="120" @click="admin.itemSort('rating')">
            評等
          </th>
          <th width="100" @click="admin.itemSort('is_enabled')">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in admin.tempProducts" :key="'key' + key">
          <td width="120">{{ item.category }}</td>
          <td width="100">{{ item.title }}</td>
          <td class="" width="120">{{ item.origin_price }}</td>
          <td class="" width="120">{{ item.price }}</td>
          <td>
            <template
              v-for="(star , key) in admin.tempProducts[key].rating" :key="'star' + key">
                <span class="text-warning">&star;</span>
            </template>
          </td>
          <td>
            <span 
            :class="{ 
              'text-success': item.is_enabled,
              'text-danger': !item.is_enabled 
            }"
            @click="admin.changeStatus(item)">{{item.is_enabled ? '啟用' : '未啟用'}}</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="editItem(item)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="status.swDelect(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-component :pagination="admin.pagination"></pagination-component>
  </div>
  <product-modal></product-modal>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
// 匯入bootstrap Modal
import Modal from 'bootstrap/js/src/modal.js';
// 匯入productModal
import productModal from './ProductModal.vue';
// 匯入productModal
import paginationComponent from './PaginationComponent.vue';
// 匯入生命週期onMounted
import { onMounted, onUpdated } from 'vue';
// 匯入adminStore
import adminStore from '@/stores/admin/adminStore.js';
// 匯入statusStore
import statusStore from '@/stores/statusStore.js';


const admin = adminStore(); // 建立adminStore實體
const status = statusStore(); // 建立statusStore實體

// 開啟modal視窗
const openModal = () => {
  const productModal = new Modal(document.getElementById('productModal'));
  productModal.show();
};

// 新增商品
const addItem = () => {
  admin.operateMode = '';
  admin.tempData = {
    imagesUrl: [],
  };
  openModal();
  admin.operateMode = 'add';
};
// 修改商品
const editItem = (item) => {
  admin.operateMode = '';
  admin.tempData = {};
  openModal();
  admin.operateMode = 'edit';
  // 把代入的產品資料，傳到adminStore
  admin.tempData = { ...item };
};

// 掛載組件後調用
onMounted(() => {
  // 檢查登入狀態
  admin.checkStatus();
  // 取得所有產品分類
  admin.getAllCategory();
});
// 重新渲染後調用
onUpdated(() => {
  // 取得分類select選單DOM
  admin.selectEl = document.querySelector('.selectEl');
});
</script>

<style lang=""></style>
