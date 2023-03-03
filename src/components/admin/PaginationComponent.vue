<template lang="">
  <!-- v-for用.total_pages去渲染所有頁數 -->
  <!-- 點擊頁數、前一頁、後一頁，透過emit觸發外層根元件『同一個』methods -->
  <!-- 點擊頁數，把頁數作為參數用emit代入外層根元件methods，取得對應頁數的商品資料 -->
  <!-- 點擊前一頁、後一頁，把當前頁數current_page加減後，作為參數用emit代入外層根元件methods -->

  <ul class="pagination">
    <li class="page-item" :class="{ disabled: !pagination.has_pre }">
      <a class="page-link" href="#" aria-label="Previous"
      @click.prevent="admin.changePage(pagination.current_page - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li v-for="(page, key) in pagination?.total_pages" :key="'key' + page" class="page-item">
      <a class="page-link" href="#"
      :class="{ active: pagination.current_page === page}"
      @click.prevent="admin.changePage(page)">
        {{ page }}
      </a>
    </li>
    <li class="page-item" :class="{ disabled: !pagination.has_next }">
      <a class="page-link" href="#" aria-label="Next"
      @click.prevent="admin.changePage(pagination.current_page + 1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
// 匯入adminStore
import adminStore from '@/stores/admin/adminStore';

// adminStore實體
const admin = adminStore();

// defineProps()接收外層傳入的資料
const props = defineProps({
  pagination: Object,
});

// 離開<script setup>根目錄的props會失去響應性
// 所以需要reactive定義資料
let { pagination } = reactive(props);

// 深層監聽adminStore實體，有變動時更新pagination
watch(
  admin,
  (newValue) => {
    pagination = newValue.pagination;
  },
  { deep: true }
);
</script>
<style lang=""></style>