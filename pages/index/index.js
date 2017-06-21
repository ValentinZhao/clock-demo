//index.js
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
        console.log(res)
        that.setData({
          myLocation: {
            longitude: res.longitude,
            latitude: res.latitude
          },
          currentTime: date.toLocaleDateString()
        })
      }
    })
    
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
