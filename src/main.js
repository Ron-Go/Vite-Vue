import { createApp } from 'vue';
import { createPinia } from 'pinia';

/* axios */
import axios from 'axios';
import VueAxios from 'vue-axios';

/* VeeValidate */
// 匯入 Form, Field, ErrorMessage
import { Form, Field, ErrorMessage } from 'vee-validate';
// 匯入defineRule
import { defineRule } from 'vee-validate';
// 匯入規則AllRules
import AllRules from '@vee-validate/rules';
// 匯入configure
import { configure } from 'vee-validate';
// 匯入localize, setLocale
import { localize, setLocale } from '@vee-validate/i18n';
// 匯入zhTW
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

/* sweetalert2 */
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import App from './App.vue';
import router from './router';

// 規則AllRules裡面全局定義所有可用規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
// 進行configure設定
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

// 全域註冊表單驗證元件 vForm、vField、vField
app.component('vForm', Form);
app.component('vField', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount("#app");
