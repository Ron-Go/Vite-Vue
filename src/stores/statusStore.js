import { defineStore } from "pinia";
import axios from "axios";
/* sweet alert2 */
import Swal from "sweetalert2";

export default defineStore("statusStore", () => {
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

  // 登出
  function logout() {
    this.Swal.fire({
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
        axios
          .post(`${url}/logout`)
          .then((res) => {
            this.Swal.fire(
              res.data.message,
              '',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                // 轉跳login頁面
                this.router.push('/login');
              }
            });
          })
          .catch((err) => {
            this.Swal.fire(
              err.response.data.message,
              '',
              'error'
            );
          });
      }
    });
  }
  return {
    swAlert,
    logout,
  };
});
