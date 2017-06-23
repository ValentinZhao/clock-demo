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

function gps2baidu (lat, long, callback) {
  
  wx.request({
    url: 'http://api.map.baidu.com/geoconv/v1/?coords=' + long
    + ',' + lat + '&from=1&to=5&ak=EfFhe5vnkGwGGc0fKwkSvmOL2aczFyZ6',
    success: (res) => {
      if(typeof callback == 'function'){
        callback(res)
      }
    },
    fail: (res) => {
      if (typeof callback == 'function') {
        callback(res)
      }
    }
  })
}

function readDeps (orgTree, depList) {
  depList.push(orgTree)
  if(!orgTree.childNodes){
    depList.push(orgTree)
    return
  }
  orgTree.childNodes.forEach((v) => {
    readDeps(v, depList)
  })
  return depList
}

var base_url = 'http://192.168.7.83:8080/hrcloudj/'
// var base_url = 'https://hr.yigewang.com.cn/'


module.exports = {
  formatTime: formatTime,
  base_url: base_url,
  json2Form: json2Form,
  gps2baidu: gps2baidu,
  readDeps: readDeps
}
