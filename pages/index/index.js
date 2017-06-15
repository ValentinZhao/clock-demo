//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello',
    name: '',
    userInfo: {},
    myLocation: {
      longitude: '',
      latitude: ''
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showGreet: function() {
    this.setData({
      name: this.data.userInfo.nickName
    })
  },
  locatemyself: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        that.setData({
          myLocation: {
            longitude: res.longitude,
            latitude: res.latitude
          }
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
