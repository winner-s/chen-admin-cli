export default {
  // 格式：2019-01-20 12:34:24
  // 引入 import timeFormat from "@u/timeFormat";
  // 例子  window.console.log(timeFormat.formatTime("2019-07-16T09:27:43.000+0000"));
  // 例子  window.console.log(timeFormat.formatTime(标准时间"));
  formatTime: function(data) {
    if (!data) {
      return "";
    }
    var newTime = new Date(+new Date(data) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "");
    return newTime;
  },

  // 格式：2019-01-20 08 精确到小时
  hoursTime: function(val) {
    if (!val) {
      return "";
    }
    let date = new Date(val);
    var month = zeroFill(date.getMonth() + 1); // 月
    var day = zeroFill(date.getDate()); // 日
    var hour = zeroFill(date.getHours()); // 时

    // 当前时间
    var curTime =
      date.getFullYear() + "-" + month + "-" + day + " " + hour + ":00:00";
    return curTime;
    /**
     * 补零
     */
    function zeroFill(i) {
      if (i >= 0 && i <= 9) {
        return "0" + i;
      } else {
        return i;
      }
    }
  },
  // 格式：2019-01-20
  currentTime: function(val) {
    if (!val) {
      return "";
    }
    var date = new Date(val);
    var month = zeroFill(date.getMonth() + 1); // 月
    var day = zeroFill(date.getDate()); // 日

    // 当前时间
    var curTime = date.getFullYear() + "-" + month + "-" + day;
    return curTime;
    /**
     * 补零
     */
    function zeroFill(i) {
      if (i >= 0 && i <= 9) {
        return "0" + i;
      } else {
        return i;
      }
    }
  },
  // 格式：2019-01-20
  nowCurrentTime: function() {
    var date = new Date();
    var month = zeroFill(date.getMonth() + 1); // 月
    var day = date.getDate(); // 日
    // 当前时间
    var curTime = date.getFullYear() + "-" + month + "-" + day;
    return curTime;
    /**
     * 补零
     */
    function zeroFill(i) {
      if (i >= 0 && i <= 9) {
        return "0" + i;
      } else {
        return i;
      }
    }
  },
  // 格式：18:00
  minuteTime: function(val) {
    if (!val) {
      return "";
    }
    let date = new Date(val);
    var hours = zeroFill(date.getHours()); // 小时
    var minutes = zeroFill(date.getMinutes()); // 分钟

    // 当前时间
    var curTime = hours + ":" + minutes;
    return curTime;
    /**
     * 补零
     */
    function zeroFill(i) {
      if (i >= 0 && i <= 9) {
        return "0" + i;
      } else {
        return i;
      }
    }
  },
  //  当期时间2018-09-30获取当前时间的时间戳
  formatTimestamp: function(val) {
    if (!val) {
      return "";
    }
    return new Date(Date.parse(val.replace("/-/g", "/"))).getTime();
  },
  // 通过日期获取周几 '2019-11-22'  获取  2019-11-22（五）
  formatDay: function(val) {
    var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
    if (!val) {
      return "";
    }
    return val + " ( " + weekArray[new Date(val).getDay()] + " )";
  },
  // 获取当前时间  格式：'2019-11-22'
  defaultTime: function() {
    let date = new Date();
    let year = date.getFullYear();
    let Month = date.getMonth() + 1;
    if (Month < 10) {
      Month = `0${Month}`;
    }
    let Day = date.getDate();
    if (Day < 10) Day = `0${Day}`;
    // 从今天开始显示一周
    return `${year}-${Month}-${Day}`;
  },
  // 获取 下周时间的最后一天  格式：'2019-11-22'
  lastWeekday: function() {
    // 获取 下周时间的最后一天
    var now = new Date();
    var year = now.getFullYear(); //getYear()+1900=getFullYear()
    var month = now.getMonth() + 1; //0-11表示1-12月
    var day = now.getDate();
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    now = year + "-" + month + "-" + day;
    // 或者当月的天数
    var nowSize = new Date(year, parseInt(month), 0).getDate(); //当月月总天数
    let nowDay = parseInt(day) + 6; // 加6天
    if (parseInt(nowDay) > nowSize) {
      //如果是12月份，且12月份时间不够，则取下一年的1月份
      // 时间不够调用下一个月份的时间 月份加1
      if (parseInt(month) == 12) {
        year = parseInt(year) + 1;
        month = "01";
      } else {
        month = parseInt(month) + 1;
      }
      nowDay = "0" + (parseInt(nowDay) - nowSize);
      return year + "-" + month + "-" + nowDay;
    } else {
      // 正常情况
      return year + "-" + month + "-" + nowDay;
    }
  },
  // 获取前一周第一天的时间  格式：'2019-11-22'
  preWeekDay() {
    var now = new Date();
    var year = now.getFullYear(); //getYear()+1900=getFullYear()
    var month = now.getMonth() + 1; //0-11表示1-12月
    var day = now.getDate();
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    now = year + "-" + month + "-" + day;
    // 或者上月的天数
    let preMonth = parseInt(month) - 1;
    if (parseInt(preMonth) < 1) {
      preMonth = "12";
    }
    var preSize = new Date(year, parseInt(preMonth), 0).getDate(); //上月总天数
    let nowDay = parseInt(day) - 6; // 减6天
    if (parseInt(nowDay) < 1) {
      nowDay = preSize + parseInt(nowDay);
      //如果是1月份，且一月份时间不够，则取上一年的12月份
      if (parseInt(month) == 1) {
        year = parseInt(year) - 1;
      }
      return year + "-" + preMonth + "-" + nowDay;
    } else {
      // 正常情况
      return year + "-" + month + "-" + nowDay;
    }
  },
  // 获取今年上月的今天 如果没有今天 则获取上月的最后一天  格式：'2019-11-22'
  preMonthDay: function() {
    var now = new Date();
    var year = now.getFullYear(); //getYear()+1900=getFullYear()
    var month = now.getMonth() + 1; //0-11表示1-12月
    var day = now.getDate();
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    let preMonth = parseInt(month) - 1;
    if (parseInt(preMonth) < 1) {
      preMonth = "12";
    }
    var preSize = new Date(year, parseInt(preMonth), 0).getDate(); //上月总天数
    // 如果是1月份  则为上一年的12月，年份退一年
    if (parseInt(month) == 1) {
      return parseInt(year) - 1 + "-12-" + day;
    }
    //上月总天数<本月日期，比如3月的31日，在2月中没有31
    if (parseInt(preSize) < parseInt(day)) {
      return year + "-" + preMonth + "-" + preSize;
    } else {
      // 正常情况下
      return year + "-" + preMonth + "-" + day;
    }
  },
  // 获取今年下月的今天 如果没有今天 则获取下月的最后一天  格式：'2019-11-22'
  lastMonthday: function() {
    var now = new Date();
    var year = now.getFullYear(); //getYear()+1900=getFullYear()
    var month = now.getMonth() + 1; //0-11表示1-12月
    var day = now.getDate();
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    now = year + "-" + month + "-" + day;
    // 下月信息
    let lastMonth = parseInt(month) + 1;
    if (parseInt(lastMonth) > 12) {
      lastMonth = "01";
    }
    var lastSize = new Date(year, parseInt(lastMonth), 0).getDate(); //下月总天数
    //如果是12月份，则取下一年的1月份
    if (parseInt(month) == 12) {
      return parseInt(year) + 1 + "-01-" + day;
    }
    //下月总天数<本月日期，比如1月的31日，在2月中没有30
    if (parseInt(lastSize) < parseInt(day)) {
      return year + "-" + lastMonth + "-" + lastSize;
    } else {
      // 正常情况下
      return year + "-" + lastMonth + "-" + day;
    }
  },
  formatFloat: function(f, digit) {
    /**
     * js计算丢精度的问题
     */
    var m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
  }
};
