function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}  

var base_url = 'http://192.168.7.118/hrcloudj/'

var _USERNAME = '';

var _COMPANYLIST = [];

module.exports = {
  formatTime: formatTime,
  base_url: base_url,
  json2Form: json2Form,
  _USERNAME: _USERNAME,
  _COMPANYLIST: _COMPANYLIST
}
