var common = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    myLocation: {
      longitude: '',
      latitude: ''
    },
    firstLocation: {
      longitude: '',
      latitude: ''
    },
    currentTime: '',
    markers: [{
      iconPath: "../images/marker_red.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../images/marker_red.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  clockIn: function () {
    var that = this;
    var date = new Date()
    var token = wx.getStorageSync('userInfo').token
    if (wx.showLoading) {
      wx.showLoading({
        title: '正在打卡'
      })
    } else {
      wx.showNavigationBarLoading()
    }
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          myLocation: {
            longitude: res.longitude,
            latitude: res.latitude
          }
        })
        wx.request({
          url: common.base_url + 'app/attendance/sign',
          method: 'POST',
          data: common.json2Form({
            json: JSON.stringify({
              'lat': that.data.myLocation.latitude,
              'lng': that.data.myLocation.longitude,
              'platform': 'ios',
              'token': token,
              'wx': common.wx_version
            })
          }),
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            console.log(res)
            if (wx.hideLoading) {
              // wx.hideLoading()
            } else {
              wx.hideNavigationBarLoading()
            }
            if (res.data.ok) {
              wx.showToast({
                title: '打卡成功：\n' + res.data.attendanceDate + '\n' + res.data.time,
                image: 'success',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: res.data.message,
                image: '../images/err.jpg',
                duration: 2000
              })
            }
          },
          fail: (res) => {
            if (wx.hideLoading) {
              wx.hideLoading()
            } else {
              wx.hideNavigationBarLoading()
            }
            wx.showToast({
              title: res.errMsg,
              image: '../images/err.jpg',
              duration: 2000
            })
          }
        })
      }
    })
    
  },
  onLoad: function () {
    this.mapCtx = wx.createMapContext('clockMap');
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          firstLocation: {
            longitude: res.longitude,
            latitude: res.latitude
          },
          myLocation: {
            longitude: res.longitude,
            latitude: res.latitude
          }
        })
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  regionchange: function () {
    setTimeout(this.moveToLocation, 500)
  },
  showClockHistory: function () {
    wx.navigateTo({
      url: '../clockHistory/clockHistory'
    })
  },
  point2pointDistance: function(){
    function OD(a, b, c) {
      while (a > c) a -= c - b;
      while (a < b) a += c - b;
      return a;
    }
    function SD(a, b, c) {
      b != null && (a = Math.max(a, b));
      c != null && (a = Math.min(a, c));
      return a;
    }
    function getDistance(a_lat, a_lng, b_lat, b_lng) {
      var a = Math.PI * OD(a_lat, -180, 180) / 180;
      var b = Math.PI * OD(b_lat, -180, 180) / 180;
      var c = Math.PI * SD(a_lng, -74, 74) / 180;
      var d = Math.PI * SD(b_lng, -74, 74) / 180;
      return 6370996.81 * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b - a));
    }

    //使用并保留小数点后两位
    var m = getDistance(106.486654, 29.490295, 106.581515, 29.615467).toFixed(2);
    //获取到的单位是 米
    alert(m);
  } 
})
