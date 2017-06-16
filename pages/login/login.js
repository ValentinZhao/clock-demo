var common = require('../../utils/util.js');// 一个../就是退出一层目录

Page({
  data: {
    userName: '',
    password: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录',
    })
  },
  bindInputUser: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  bindInputPsw: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  userLogin: function () {
    var username = this.data.userName
    var password = this.data.password
    var temp = ['../../utils/avatar.jpg']
    wx.showNavigationBarLoading()
    if(!username || !password){
      wx.showToast({
        title: '输入不能为空',
        icon: 'loading',
        duration: 2000
      })
      wx.hideNavigationBarLoading()
      return
    }
    wx.uploadFile({
      url: common.base_url + 'init/app/login',
      filePath: temp[0],
      name: 'json',
      formData: {
        "appInfo": "手机：NX507J__4.4.2",
        'App': "5.3__38",
        'Patch': "0",
        'DeviceId': '00000000-03b8-85d8-0b8c-dc9600000000',
        'Sha1': "FA:AB:7C:6F:C5:BB:02:8D:EE:FC:AA:9F:2E:9D:A3:3B:E0:BF:CD:A3",
        "platform": "android",
        'password': password,
        'userId': username
      },
      success: function (res) {
        console.log(res.data)
        wx.hideNavigationBarLoading()
      },
      fail: (res) => {
        console.log(res.errMsg)
        console.log(res.header)
        wx.hideNavigationBarLoading()
      }
    })
  },
  formLogin: function () {
    // var username = this.data.userName
    // var password = this.data.password
    // wx.showNavigationBarLoading()
    // if (!username || !password) {
    //   wx.showToast({
    //     title: '输入不能为空',
    //     icon: 'loading',
    //     duration: 2000
    //   })
    //   wx.hideNavigationBarLoading()
    //   return
    // }
    // wx.chooseImage({
    //   count: 3,
    //   success: function(res) {
    //     var tempPaths = res.tempFilePaths
    //     wx.uploadFile({
    //       url: common.base_url + 'init/app/login',
    //       filePath: tempPaths[0],
    //       name: 'json',
    //       formData: {
    //         "appInfo": "手机：NX507J__4.4.2",
    //         'App': "5.3__38",
    //         'Patch': "0",
    //         'DeviceId': '00000000-03b8-85d8-0b8c-dc9600000000',
    //         'Sha1': "FA:AB:7C:6F:C5:BB:02:8D:EE:FC:AA:9F:2E:9D:A3:3B:E0:BF:CD:A3",
    //         "platform": "android",
    //         'password': password,
    //         'userId': username
    //       },
    //       success: function (res) {
    //         console.log(res)
    //         wx.hideNavigationBarLoading()
    //       },
    //       fail: (res) => {
    //         console.log(res)
    //         wx.hideNavigationBarLoading()
    //       }
    //     })
    wx.switchTab({
      url: '../index/index',
    })
      },
  })