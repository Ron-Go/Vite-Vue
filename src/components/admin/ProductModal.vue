<template>
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header text-white"
          :class="{
            'bg-success': admin.operateMode === 'add',
            'bg-primary': admin.operateMode === 'edit',
          }">
          <h5 id="productModalLabel" class="modal-title">
            <span class="fs-5" v-if="admin.operateMode === 'add'">新增產品</span>
            <span class="fs-5" v-else-if="admin.operateMode === 'edit'">修改產品</span>
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="admin.tempData.imageUrl">
                </div>
                <img class="img-fluid" :src="admin.tempData.imageUrl" alt="">
              </div>
              <label for="floatingInput" class="form-label">上傳檔案</label>
              <div class="d-flex mb-3">
                  <input type="file" class="form-control uploadEl" id="floatingInput">
                  <button type="button" class="btn btn-primary ms-2" @click="admin.uploadFile()">upload</button>
              </div>
              <div v-if="Array.isArray(admin.tempData.imagesUrl)" class="mb-3">
                <p class="fs-6 fw-bolder text-start mb-2">商品副圖網址</p>
                <template v-for="(item , key) in admin.tempData.imagesUrl" :key="'img' + key">
                    <img class="img-fluid" :src="admin.tempData.imagesUrl[key]" alt="">
                    <label class="form-label w-100" for="url">副圖網址{{`${key + 1}`}}
                      <input type="text" id="url" class="form-control mb-3"
                        v-model="admin.tempData.imagesUrl[key]"
                        :placeholder="`輸入副圖網址${key + 1}`">
                    </label>
                </template>
                <!-- localProduct.imagesUrl沒有資料
                或者localProduct.imagesUrl當下這筆已有資料
                才可再新增下一筆 -->
                <button type="button"
                  v-if="!admin.tempData.imagesUrl.length || admin.tempData.imagesUrl[admin.tempData.imagesUrl.length - 1]" class="btn btn-primary w-100 mb-3"
                  @click="admin.tempData.imagesUrl.push('')">新增</button>
                <button type="button"
                  class="btn btn-outline-danger w-100"
                  @click="admin.tempData.imagesUrl.pop('')">刪除最後一個</button>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="admin.tempData.title">
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="admin.tempData.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="admin.tempData.unit">
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="admin.tempData.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model.number="admin.tempData.price">
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述" v-model="admin.tempData.description">
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="description" type="text" class="form-control"
                          placeholder="請輸入說明內容" v-model="admin.tempData.content">
                </textarea>
              </div>
              <div class="mb-3">
                <div class="row align-items-center">
                  <div class="mb-3 mb-md-0 col-md-6 d-flex align-items-center">
                    <label class="form-label me-3 mb-0" for="rating">評等</label>
                    <select class="form-select border w-75" id="rating" v-model.number="admin.tempData.rating">
                      <option value="" disabled>選擇評等</option>
                      <template v-for="(value, key) in 5" :key="'option' + key">
                        <option :value="value">{{`${value}`}}</option>
                      </template>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <div class="form-check">
                      <input id="is_enabled" class="form-check-input" type="checkbox" v-model="admin.tempData.is_enabled">
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary"
            :class="{ 
              'bg-success': admin.operateMode === 'add',
              'bg-primary': admin.operateMode === 'edit',
              }"
            data-bs-dismiss="modal" @click="admin.confirmProduct()">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 匯入loginStore
import adminStore from '@/stores/admin/adminStore';
// 匯入生命週期onMounted、onUpdated
import { onMounted, onUpdated } from 'vue';

export default{
  setup() {
    const admin = adminStore();
    onUpdated(() => {
      admin.uploadEl = document.querySelector('.uploadEl');
    });
    return {
      admin,
    };
  },
};
</script>
