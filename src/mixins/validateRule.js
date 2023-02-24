/* VeeValidate表單驗證rules */

// 驗證手機號碼
export function isPhone(value) {
  const startRule = /^[0]*[9]/; // 驗證開頭是否為09
  const lengthRule = /\d{10}$/; // 驗證是否為數字，以及是否有10個字元
  return startRule.test(value)
    ? lengthRule.test(value)
      ? true
      : "手機號碼為數字，共10碼"
    : "手機號碼開頭為09";
}

// 驗證登入密碼
export function isPassword(value) {
  // ^[a-zA-Z]：開頭為字母
  // \w：任何數字字元字母底線，等於[A-Za-z0-9_]
  // {8}$：長度9個字元之間
  const pwdRule = /^[a-zA-Z]\w{8}$/;
  return pwdRule.test(value) ? true : '密碼為字母開頭，長度9字元';
}
