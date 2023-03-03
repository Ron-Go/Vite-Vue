import { defineStore } from "pinia";
import { useRouter, useRoute } from 'vue-router'
import axios from "axios";
// 匯入adminStore
import adminStore from '@/stores/admin/adminStore.js';
/* sweet alert2 */
import Swal from "sweetalert2";
/* vue3-loading-overlay */
// 匯入useLoading
import { useLoading } from 'vue3-loading-overlay';

export default defineStore("statusStore", () => {
  // 建立router實體
  const router = useRouter();

  // API URL and PATH
  const url = import.meta.env.VITE_URL;
  const path = import.meta.env.VITE_PATH;

  // alert、toast提示
  function swAlert(pos, icon, title, showConfirmBtn, toast) {
    // 用Promise base包起來，調用的時候加上await轉為同步
    return new Promise((resolve, reject) => {
      resolve(
        Swal.fire({
          position: pos, // 出現位置
          icon: icon,
          title: title,
          showConfirmButton: showConfirmBtn,
          timer: 2500, // 出現時間
          toast: toast, // false: toast; true: alert
        })
      );
    });
  }

  function swDelect(product) {
    Swal.fire({
      title: `刪除產品『${product.title}』?`,
      text: "資料刪除後，將無法恢復！",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確認刪除',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}/api/${path}/admin/product/${product.id}`)
          .then((res) => {
            Swal.fire(res.data.message, "你的資料已被刪除", "success");
            const admin = adminStore();  // 建立adminStore實體
            // 資料刪除後再重新取得產品資料(category代入分類選單的值)
            axios
              .get(
                `${url}/api/${path}/admin/products/?category=${admin.selectEl.value}`
              )
              .then((res) => {
                // 取得對應分類選單的產品資料
                admin.tempProducts = res.data.products;
              })
              .catch((err) => {
                swAlert('center', 'error', err.response.data.message, false, true);
              })
          })
          .catch((err) => {
            Swal.fire(err.response.data.message, "你的資料尚未被刪除", "error");
          });
      }
    })
  }

  // 登出
  function logout() {
    Swal.fire({
      title: `是否『登出』後台`,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確認登出',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(url);
        axios
          .post(`${url}/logout`)
          .then((res) => {
            Swal.fire(res.data.message, "", "success").then((result) => {
              if (result.isConfirmed) {
                // 轉跳login頁面
                router.push('/login');
              }
            });
          })
          .catch((err) => {
            console.dir(err);
            Swal.fire(err.response.data.message, "", "error");
          });
      }
    });
  }

  // vue-loading-overlay
  const loading = (containerDom) => {
    // const fullPage = false;
    // 建立vue-loading-overlay實體並帶入物件參數（閉包私有方法）
    const loader = useLoading({
      // Optional parameters
      container: containerDom.value,
      canCancel: false,
      // onCancel: onCancel,
      loader: 'Bars', //spinner/dots/bars
      color: 'green',
      width: 50,
      height: 50,
      backgroundColor: '#ffffff',
      //isFullPage: true,
      opacity: 0.8,
      zindex: 999,
    });
    return {
      show: () => {
        loader.show();
      },
      hide: () => {
        setTimeout(() => {
          loader.hide();
        }, 1000);
      },
    };
  };
  return {
    swAlert,
    swDelect,
    logout,
    loading,
  };
});
