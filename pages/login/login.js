var common = require('../../utils/util.js');// 一个../就是退出一层目录

Page({
  data: {
    userName: '',
    password: ''
  },
  onLoad: function (options) {
    if(wx.getStorageSync('userInfo')){
      wx.switchTab({
        url: '../index/index'
      })
    }
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
        image: '../images/err.jpg',
        duration: 2000
      })
      wx.hideNavigationBarLoading()
      return
    }
    wx.request({
      url: common.base_url + 'init/app/login',
      method: 'POST',
      data: common.json2Form({
        json: JSON.stringify({
          'password': password,
          'userId': username
        })}),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if(res.data.ok){
          if (res.data.companyList) { // 若该登陆人有多个公司信息，则进入公司选择页面
            var mUrl = '../selectCompany/selectCompany?companyList='
            var companyList = res.data.companyList
            companyList.forEach((v, i, a) => {
              a[i] = JSON.stringify(v)
            })
            mUrl += companyList
            mUrl += '&userId=' + username + '&password=' + password
            wx.navigateTo({
              url: mUrl
            })
            return
          }
          wx.hideNavigationBarLoading()
          if (!wx.getStorageSync('userInfo')) {
            wx.setStorageSync('userInfo', res.data)
          }
          wx.switchTab({ // 登陆人只有一个公司信息则直接进入打卡页面
            url: '../index/index',
          })
        } else {
          wx.showToast({
            title: res.data.message,
            image: '../images/err.jpg',
            duration: 2000
          })
          wx.hideNavigationBarLoading()
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
  }
  })