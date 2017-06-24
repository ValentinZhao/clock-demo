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
/**
 * 递归读取orgTree
 */
var recurLevel = 0
function readDeps (orgTree, depList) {
  recurLevel++
  if(orgTree.childNodes.length == 0){
    for (let i = 0; i < recurLevel; i++) {
      orgTree.name = '->' + orgTree.name //根据递归等级塞箭头到名字前面实现缩进效果
    }
    depList.push(orgTree)
    recurLevel--
    return
  }
  for(let i = 0; i < recurLevel; i++){
    orgTree.name = '->' + orgTree.name //根据递归等级箭头到名字前面实现缩进效果
  }
  depList.push(orgTree)
  orgTree.childNodes.forEach((v) => {
    readDeps(v, depList)
  })
  recurLevel-- // 遍历结束相当于该层读完应退出一层
  return depList
}

// var base_url = 'http://192.168.7.83:8080/hrcloudj/'
var base_url = 'https://hr.yigewang.com.cn/'


module.exports = {
  formatTime: formatTime,
  base_url: base_url,
  json2Form: json2Form,
  gps2baidu: gps2baidu,
  readDeps: readDeps
}
