var common = require('../../utils/util.js')

Page({
  userLogout: () => {
    wx.removeStorageSync('userInfo')
    wx.redirectTo({
      url: '../login/login',
      success: (res) => {
        wx.showToast({
          title: '退出成功',
          icon: 'success',
          duration: 1000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '退出失败',
          image: '../images/err.jpg',
          duration: 2000
        })
      }
    })
  }
})