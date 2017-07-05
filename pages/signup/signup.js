var common = require('../../utils/util.js')
Page({
  data: {
    username: '',
    verifyCode: '',
    password: '' 
  },
  bindInputUser: function(e) {
    this.setData({
      username: e.detail.value
    })
  },
  bindVerifyCode: function(e) {
    this.setData({
      verifyCode: e.detail.value
    })
  },
  bindInputPsw: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  userSignup: function() {
    wx.showNavigationBarLoading()
    if(!this.data.username){
      wx.showToast({
        title: '手机号不能为空',
        image: '../images/err.jpg',
        duration: 2000
      })
      wx.hideNavigationBarLoading()
      return
    } else if (!this.data.verifyCode) {
      wx.showToast({
        title: '验证码不能为空',
        image: '../images/err.jpg',
        duration: 2000
      })
      wx.hideNavigationBarLoading()
      return
    } else if (!this.data.password) {
      wx.showToast({
        title: '密码不能为空',
        image: '../images/err.jpg',
        duration: 2000
      })
      wx.hideNavigationBarLoading()
      return
    }
    var username = this.data.username
    var verifyCode = this.data.verifyCode
    var password = this.data.password
    wx.request({
      url: common.base_url + 'init/app/goRegister',
      method: 'POST',
      data: common.json2Form({
        json: JSON.stringify({
          'mobileNo': username,
          'password': password,
          'verifcatCode': verifyCode,
          'wx': common.wx_version
        })
      }),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideNavigationBarLoading()
        if (res.data.ok) {
          console.log(res)
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.message,
            image: '../images/err.jpg',
            duration: 2000
          })
          return
        }
      },
      fail: (res) => {
        wx.showToast({
          title: res.errMsg,
          image: '../images/err.jpg',
          duration: 2000
        })
        wx.hideNavigationBarLoading()
        return
      }
    })
  },
  getVerifyCode: function() {
    wx.showNavigationBarLoading()
    if (!this.data.username) {
      wx.showToast({
        title: '手机号不能为空',
        image: '../images/err.jpg',
        duration: 2000
      })
      wx.hideNavigationBarLoading()
      return
    }
    var username = this.data.username
    wx.request({
      url: common.base_url + 'init/app/sendSms',
      method: 'POST',
      data: common.json2Form({
        json: JSON.stringify({
          'mobileNo': username,
          'smsType': 'regist',
          'type': 'regist',
          'wx': common.wx_version
        })
      }),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.ok) {
          console.log(res)
        } else {
          wx.showToast({
            title: res.data.message,
            image: '../images/err.jpg',
            duration: 2000
          })
          return
        }
        wx.hideNavigationBarLoading()
      },
      fail: (res) => {
        wx.showToast({
          title: res.errMsg,
          image: '../images/err.jpg',
          duration: 2000
        })
        wx.hideNavigationBarLoading()
        return
      }
    })
  }
})