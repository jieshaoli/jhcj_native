// 防抖函数
export function _debounce(fn, wait) {
  let timer = null;
  return function () {
    var args = arguments;
    let now = !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
    }, wait);
    if (now) {
      fn.call(this, args);
    }
  };
}
//节流函数
export function _throttling(fn, wait) {
  let last = 0;
  return function () {
    let args = arguments;
    let that = this;
    let now = Date.now();
    if (now - last > wait) {
      fn.call(that, args);
      last = now;
    }
  };
}

