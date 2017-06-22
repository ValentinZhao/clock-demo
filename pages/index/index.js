var bmap = require('../../libs/bmap-wx.js')
var common = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    name: '',
    userInfo: {},
    myLocation: {
      longitude: '',
      latitude: ''
    },
    currentTime: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  locatemyself: function () {
    var that = this;
    var date = new Date()
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          myLocation: {
            longitude: res.longitude,
            latitude: res.latitude
          },
          currentTime: date.toLocaleDateString()
        })
        common.gps2baidu(res.latitude, res.longitude, (res1) => {
          console.log(res1)
        })
      }
    })
  },
  onLoad: function () {
    var that = this
    var BMap = new bmap.BMapWX({
      ak: 'PPeAdMQzr9xCpySCRTQKoqH6TinLHa0s'
    }); 
    var fail = function (data) {
      console.log(data)
    }; 
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    } 
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      placeData: {
        title: '名称：' + data[i].title + '\n',
        address: '地址：' + data[i].address + '\n',
        telephone: '电话：' + data[i].telephone
      }
    });
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
