// placeholder提示
export const placeholderTips = {
  courseTemplate:
    "https://syxcxvideo.oss-cn-shanghai.aliyuncs.com/curriculum/curriculum-template.xlsx", // 课程导入模板地址
  CurriculumArrtTemplate:
    "https://syxcxvideo.oss-cn-shanghai.aliyuncs.com/curriculum/curriculum-arrtime-template.xlsx", // 排课导入模板地址
  CurriculumContractTemplate:
    "https://syxcxvideo.oss-cn-shanghai.aliyuncs.com/curriculum/contract-template.xlsx", //合同导入模板地址
  CurriculumStuTemplate:
    "https://syxcxvideo.oss-cn-shanghai.aliyuncs.com/curriculum/student-template.xlsx", //学员导入模板地址
  content: "请输入内容",
  number: "请输入数值"
};

//可带小数的数字正则，小数位数不需要校验
export function validateNumberA(rule, value, callback) {
  var reg = /^\d+(\.\d+)?$/;
  if (value === "" || value == null) {
    callback();
  } else if (!reg.test(value)) {
    callback(new Error("请输入正确的数字"));
  } else {
    callback();
  }
}



// 选择项内容
export function validateTemplate(rule, value, callback) {
  if (value === "") {
    callback(new Error("请选择内容"));
  } else {
    callback();
  }
}
// 选择项时间
export function validateTime(rule, value, callback) {
  if (value === "") {
    callback(new Error("请选择时间"));
  } else {
    callback();
  }
}
// 必选输入内容
export function validateTemplateContent(rule, value, callback) {
  if (value === "") {
    callback(new Error("请输入内容"));
  } else {
    callback();
  }
}
//  不能为空  图片
export function validateTemplatePicture(rule, value, callback) {
  if (value === "") {
    callback(new Error("请上传图片"));
  } else {
    callback();
  }
}

// 学号 validateStudentNumber
export function validateStudentNumber(rule, value, callback) {
  // var reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,15}$/;
  var reg = /^[0-9a-zA-Z]{1,20}$/;
  if (value === "") {
    callback(new Error("请输入学号"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入1~20位半角英数字"));
  } else {
    callback();
  }
}

// 姓名  只能中英文，数字，下划线，减号
export function validateName(rule, value, callback) {
  var reg = /^[\u4E00-\u9FA5A-Za-z0-9-_]{1,20}$/;
  if (value === "") {
    callback(new Error("请输入姓名"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入1~20位全角文字或半角英数字"));
  } else {
    callback();
  }
}
// 姓名  只能中英文，数字，下划线，减号 可为空
export function validateName2(rule, value, callback) {
  var reg = /^[\u4E00-\u9FA5A-Za-z0-9-_]{1,20}$/;
  if (value === "" || value == null) {
    callback();
  } else if (!reg.test(value)) {
    callback(new Error("请输入1~20位全角文字或半角英数字"));
  } else {
    callback();
  }
}
// 手机号 或者电话 特殊   8到10 和12到14 纯数字可加- 11位必须标准
export function validatePhoneMerchant(rule, value, callback) {
  var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
  let reg2 = /^[0-9-]{8,10}$/;
  let reg3 = /^[0-9-]{12,14}$/;
  if (value === "") {
    callback(new Error("请输入手机号码或者电话"));
  } else if (!reg.test(value) && !reg2.test(value) && !reg3.test(value)) {
    callback(
      new Error(
        "请输入11位手机号或电话号码（例： 021-1234-5678，4001-123-456，0371-1234-5678）"
      )
    );
  } else {
    callback();
  }
}

// 手机号 或者电话 特殊   8到10 和12到14 纯数字可加- 11位必须标准 可为空
export function validatePhoneMerchantk(rule, value, callback) {
  var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
  let reg2 = /^[0-9-]{8,10}$/;
  let reg3 = /^[0-9-]{12,14}$/;
  if (value === "") {
    callback();
  } else if (!reg.test(value) && !reg2.test(value) && !reg3.test(value)) {
    callback(
      new Error(
        "请输入11位手机号或电话号码（例： 021-1234-5678，4001-123-456，0371-1234-5678）"
      )
    );
  } else {
    callback();
  }
}
// 手机号
export function validatePhone(rule, value, callback) {
  var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入11位正确的手机号码"));
  } else {
    callback();
  }
}
// 手机号 可为空
export function validatePhone2(rule, value, callback) {
  var reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
  if (value === "" || value == null) {
    callback();
  } else if (!reg.test(value)) {
    callback(new Error("请输入11位正确的手机号码"));
  } else {
    callback();
  }
}
// 身份证号码
export function validateIDCard(rule, value, callback) {
  var reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
  if (value === "" || value == null) {
    callback();
  } else if (!reg.test(value)) {
    callback(new Error("请输入正确的身份证号码"));
  } else {
    callback();
  }
}
// 邮箱
export function validateEmail(rule, value, callback) {
  var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
  if (value === "" || value == null) {
    callback();
  } else if (!reg.test(value)) {
    callback(new Error("请输入正确的邮箱"));
  } else {
    callback();
  }
}
// 卡号 英数字
export function validateCardNumber(rule, value, callback) {
  // var reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,15}$/;
  var reg = /^[0-9a-zA-Z]{1,20}$/;
  if (value === "") {
    callback(new Error("请输入卡号"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入1~20位半角英数字"));
  } else {
    callback();
  }
}
// 编号 可加 -
export function validateUuid(rule, value, callback) {
  // var reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,15}$/;
  var reg = /^[0-9a-zA-Z-.]{1,20}$/;
  if (value === "") {
    callback(new Error("请输入编号"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入1~20位半角英数字，可包含-或."));
  } else {
    callback();
  }
}

/*限制  正数且最多保留两位小数 */
export function validateNumber(rule, value, callback) {
  // var reg = /^(\d+|\d+\.\d{1,2})$/;  // 含0
  var reg = /^(\+?[1-9][0-9]*|\d+\.\d{1,2})$/;
  if (value === "") {
    callback(new Error("请输入数值"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入正数且最多保留两位小数"));
  } else if (Number(value) > 1000000) {
    // 金额限制长度 8位
    callback(new Error("金额限制大小低于 100 0000"));
  } else {
    callback();
  }
}
/*  正整数 */
export function validateNumInt(rule, value, callback) {
  var reg = /^(\+?[1-9][0-9]*)$/;
  if (value === "") {
    callback(new Error("请输入数值"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入正整数"));
  } else {
    callback();
  }
}
/*  空或者正整数 */
export function validateNumEmpty(rule, value, callback) {
  var reg = /^(\+?[1-9][0-9]*)$/;
  if (value === "" || value == null) {
    callback();
  } else if (!reg.test(value)) {
    callback(new Error("请输入正整数"));
  } else {
    callback();
  }
}
/* 名称  */
export function validateOtherName(rule, value, callback) {
  // var reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,15}$/;
  var reg = /^.{1,20}$/;
  if (value === "") {
    callback(new Error("请输入名称"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入内容在1~20字符"));
  } else {
    callback();
  }
}

/* 用户账号  字母、数字、下划线组成的4-15个字符，并以字母开头*/
export function validateUserName(rule, value, callback) {
  let reg = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/;
  if (value === "") {
    callback(new Error("账号不能为空"));
  } else if (!reg.test(value)) {
    callback(
      new Error("请输入字母、数字、下划线组成的4-16个字符，并以字母开头")
    );
  } else {
    callback();
  }
}

/* 用户密码  只能输入6-15个字母、数字、下划线*/

export function validateUserPassword(rule, value, callback) {
  let reg = /^((\w){6,15}|(\w){32})$/;
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入6-15个字母、数字、下划线"));
  } else {
    callback();
  }
}

/*  0或者正整数 */
export function validateNum(rule, value, callback) {
  var reg = /^(0|\+?[1-9][0-9]*)$/;
  if (value === "") {
    callback(new Error("请输入数值"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入0或者正整数"));
  } else {
    callback();
  }
}

/*  空或者纯数字 */
export function validateTemplateID(rule, value, callback) {
  var reg = /^(\+?[1-9][0-9]*)$/;
  if (value === "" || value == null) {
    callback();
  } else if (!reg.test(value)) {
    callback(new Error("银盒子ID默认为纯数字"));
  } else {
    callback();
  }
}
/*限制  空正数且最多保留两位小数 */
export function validateNumberI(rule, value, callback) {
  // var reg = /^(\d+|\d+\.\d{1,2})$/; // 不含0
  var reg = /^(\+?[1-9][0-9]*|\d+\.\d{1,2})$/;
  if (value === "" || value == null) {
    callback();
  } else if (!reg.test(value)) {
    callback(new Error("请清空不填或者正数且最多保留两位小数"));
  } else if (Number(value) > 1000000) {
    // 金额限制长度 8位
    callback(new Error("金额限制大小低于 100 0000"));
  } else {
    callback();
  }
}
/*限制  0正数且最多保留两位小数 */
export function validateNumberII(rule, value, callback) {
  // var reg = /^(\d+|\d+\.\d{1,2})$/;  // 不含0
  var reg = /^(0|\+?[1-9][0-9]*|\d+\.\d{1,2})$/;
  if (value === "") {
    callback(new Error("请输入数值"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入0或者正数且最多保留两位小数"));
  } else if (Number(value) > 1000000) {
    // 金额限制长度 8位
    callback(new Error("金额限制大小低于 100 0000"));
  } else {
    callback();
  }
}

export function isAbsolutePath(path) {
  return /^(https?|tel|mailto)/.test(path);
}
