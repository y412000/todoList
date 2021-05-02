/**
 * 確認輸入的時間格式是否正確
 * @param {string} value 輸入的時間內容
 * @returns
 */
function isTimeFormat(value) {
  const reg = new RegExp(
    /^([1-9]\d{3})\/(0?[1-9]|1[0-2])\/(0?[1-9]|[1-2][0-9]|3[0-1])$/
  );
  return value.match(reg);
}

/**
 * 確認輸入的日期是否為正確時間
 * @param {string} y year
 * @param {string} m month
 * @param {string} d dat
 * @returns {boolean}
 */
function isTimeValid(y, m, d) {
  const date = new Date(`${y}/${m}/${d}`);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return year == y && month == parseInt(m) && day == parseInt(d);
}

/**
 * 將毫秒轉換回日期格式
 * @param {number} ms 毫秒時間
 * @returns 日期
 */
function getDate(ms) {
  const d = new Date(ms);

  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

/**
 * 將字串跳脫
 * @param {string} unsafe 任意字串
 * @returns {string} 已跳脫字串
 */
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

window._uuid = () => {
  var d = Date.now();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export { isTimeFormat, isTimeValid, escapeHtml, getDate};
