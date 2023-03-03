/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed } from 'vue';
import axios from "axios";
// 匯入StatusStore
import statusStore from '@/stores/statusStore.js';

export default defineStore("loginStore", () => {
  // 輸入欄位
  let adminData = reactive({
    username: '',
    password: '',
  });
  
  // API URL and PATH
  const url = import.meta.env.VITE_URL;
  const path = import.meta.env.VITE_PATH;
  
  // 建立router實體，router若放在函式signin()作用域內會有問題
  const router = useRouter();
  // 登入
  async function signin() {
    const status = statusStore();
    try {
      const res1 = await axios.post(`${url}/admin/signin`, adminData);
      cleanInputValue();
      const { expired, message, token } = res1.data;
      // 把token、expired存入cookie
      document.cookie = `myToken = ${token}; expires = ${new Date(expired)};`;
      await status.swAlert('center', 'success', message, false, false);
      // 轉跳admin頁面
      router.push('/admin/products'); 
    } catch (err) {
      cleanInputValue();
      const { message } = err.response.data;
      await status.swAlert('center', 'error', message, false, false);
    }
  }

  // 清除輸入欄
  function cleanInputValue() {
    adminData.username = '';
    adminData.password = '';
  }
  return {
    adminData,
    signin,
  };
});
