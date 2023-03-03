import { defineStore } from 'pinia';
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed } from 'vue';
/* sweet alert2 */
import Swal from "sweetalert2";
import axios from "axios";

// 匯入statusStore
import statusStore from '@/stores/statusStore';

export default defineStore('adminStore', () => {
  // 建立router實體
  const router = useRouter();

  const checkResult = ref(null);
  // 遠端取得的products資料
  const tempProducts = ref([]);

  // API URL and PATH
  const url = import.meta.env.VITE_URL;
  const path = import.meta.env.VITE_PATH;

  // 新增產品資料
  const tempData = ref({});
  // 所有產品分類
  const AllCategory = ref(['']);

  // 模式新增'add'或修改'edit'
  const operateMode = ref('');
  const pagination = ref({});

  // 分類選單Dom
  let selectEl = null;
  // 上傳檔案input Dom
  let uploadEl = null;

  // 取得所有產品分類
  function getAllCategory() {
    axios
      .get(`${url}/api/${path}/admin/products/all`)
      .then((res) => {
        // 取得所有商品物件資料
        const allProducts = res.data.products;
        // 取得所有商品物件屬性
        const allAttr = Object.keys(allProducts);
        // 所有商品物件屬性，進行forEach
        allAttr.forEach((value) => {
          let repeatNum = 0;
          // 陣列AllCategory進行forEach
          AllCategory.value.forEach((item) => {
            // 陣列AllCategory的每個item，跟allProducts[value].category做比對
            item === allProducts[value].category
              ? repeatNum++
              : (repeatNum += 0);
          });
          // 如果都沒有相同的，就把allProducts[value].category『push』到所有產品分類AllCategory
          repeatNum === 0 ? AllCategory.value.push(allProducts[value].category) : "";
        });
      })
      .catch((err) => {
        const status = statusStore(); // 建立statusStore實體
        const { message } = err.response.data;
        status.swAlert('center', 'error', message, false, false);
      });
  }

  // 取得全部商品
  const getProducts = (category = '') => {
    axios
      .get(`${url}/api/${path}/admin/products/?category=${category}`)
      .then((res) => {
        // 取得對應分類選單的產品資料、分頁資料
        tempProducts.value = res.data.products;
        pagination.value = res.data.pagination;
      })
      .catch((err) => {
        const status = statusStore(); // 建立statusStore實體
        const { message } = err.response.data;
        status.swAlert('center', 'error', message, false, false);
      });
  };

  // 驗證登入
  const checkStatus = async () => {
    // 從cookie取得token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    try {
      // 驗證登入狀態
      const res1 = await axios.post(`${url}/api/user/check`);
      // 取得驗證確認
      checkResult.value = res1.data.success;
      // 取得資料
      getProducts();
    } catch (error) {
      const { message } = error.response.data;
      const status = statusStore(); // 建立statusStore實體
      await status.swAlert('center', 'error', message, false, false);
      // 轉跳login頁面
      router.push('/login');
    }
  };

  // 改變分類取得商品資料
  const selectOnChange = (e) => {
    // change行為得到select的值，代入
    getProducts(e.target.value);
  };

  // 新增產品資料至遠端
  const add = async (tempData) => {
    const status = statusStore();
    try {
      // 新增商品內容
      const res1 = await axios.post(`${url}/api/${path}/admin/product`, { data: tempData });
      // 取得資料，代入category參數（根據分類選單的值）
      getProducts(selectEl.value);
      // 跳出狀態提示
      status.swAlert('top-end', 'success', res1.data.message, false, true);
    } catch (error) {
      status.swAlert('top-end', 'error', error.response.data.message, false, true);
    }
  };

  // 更改產品遠端資料
  const put = async (id, putData) => {
    const status = statusStore(); // 建立statusStore實體
    try {
      // 修改商品內容
      const res1 = await axios.put(`${url}/api/${path}/admin/product/${id}`, { data: putData });
      // 取得資料，代入category參數（根據分類選單的值）
      getProducts(selectEl.value);
      // 跳出狀態提示
      await status.swAlert('top-end', 'success', res1.data.message, false, true);
    } catch (error) {
      status.swAlert('top-end', 'error', error.response.data.message, false, true);
    };
  };

  // 上傳檔案
  const uploadFile = () => {
    if (this.uploadEl.value === '') return;
    // 取得檔案格式資料
    const file = this.uploadEl.files[0];
    // 用表單形式將檔案上傳
    // 內建的FormData格式，用來產生表單格式，跟我們要上傳的表單格式是一致的
    const formData = new FormData();
    // 把file附加到FormData（new FormData() ）
    formData.append('file-to-upload', file);
    axios
      .post(`${this.api.url}/api/${this.api.path}/admin/upload`, formData)
      .then((res) => {
        Swal.fire({
          title: `上傳成功`,
          // 加上html元素input、button
          html: `<input class="form-control imageUrl" id="imageUrl" type="text" value="1234">`,
          didOpen: () => {
            // 選取<input>元素，把上傳圖片後回傳的imageUrl，賦予給<input>value值
            document.querySelector('.imageUrl').value = res.data.imageUrl;
          },
          // text: '',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '複製圖片位置 ',
          cancelButtonText: '取消'
        }).then((result) => {
          // 點擊confirmButton按鈕，複製<input>的value值
          if (result.isConfirmed) {
            // 選取<input>元素
            const input = document.querySelector('.imageUrl');
            // 使用Clipboard API，複製<input>的value值
            navigator.clipboard.writeText(input.value);
            // 清除file input欄位檔案資料
            this.uploadEl.value = '';
          }
        });
      })
      .catch((err) => {
        this.Swal.fire("上傳失敗", err.message, "error");
      });
  };

  // 換頁
  const changePage = (page) => {
    // 取得全部商品
    axios
      .get(`${url}/api/${path}/admin/products/?page=${page}`)
      .then(res => {
        // 取得全部商品
        tempProducts.value = res.data.products;
        // 取得分頁資料
        pagination.value = res.data.pagination;
      })
      .catch(err => {
        const status = statusStore(); // 建立statusStore實體
        status.swAlert('top-end', 'error', err.response.data, false, true);
      })
  };

  // 變更啟用狀態
  const changeStatus = (item) => {
    const { id } = item;
    const itemData = { ...item };
    // 更改產品is_enable的布林值
    itemData.is_enabled = !itemData.is_enabled;
    put(id, itemData);
  };

  // 確認產品
  const confirmProduct = () => {
    const { id } = this.tempData;
    if (this.operateMode === 'edit') {
      this.put(id, this.tempData);
    } else if (this.operateMode === 'add') {
      this.add(this.tempData);
    }
  };

  // 產品列表項目排序
  const itemSort = (attr) => {
    this.tempProducts.sort((a, b) => {
      return b[attr] - a[attr];
    });
  };

  return {
    checkResult,
    tempProducts,
    AllCategory,
    operateMode,
    pagination,
    tempData,
    checkStatus,
    getProducts,
    getAllCategory,
    selectOnChange,
    add,
    put,
    uploadFile,
    changePage,
  };
});
