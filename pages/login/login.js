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
        if(res.data.companyList){
          var mUrl = '../selectCompany/selectCompany?companyList='
          var companyList = res.data.companyList
          companyList.forEach((v, i, a) => {
            a[i] = JSON.stringify(v)
          })
          wx.navigateTo({
            url: mUrl + companyList,
          })
          return
        }
        wx.hideNavigationBarLoading()
        wx.switchTab({
          url: '../index/index',
        })
      },
      fail: (res) => {
        console.log(res.errMsg)
        console.log(res.header)
        wx.hideNavigationBarLoading()
      }
    })
  },
  companyLogin: () => {
    var mUrl = '../selectCompany/selectCompany?companyList='
    // var companyList = res.data.companyList
    var companyList = [
      {
        USER_NAME: '赵子亮',
        COMPANY_NAME: 'ZTE',
        COMPANY_CODE: 'T020067'
      },
      {
        USER_NAME: '赵子亮',
        COMPANY_NAME: 'TENCENT',
        COMPANY_CODE: 'T020037'
      },
      {
        USER_NAME: '赵子亮',
        COMPANY_NAME: 'BAIDU',
        COMPANY_CODE: 'T020034'
      }
    ]
    companyList.forEach((v, i, a) => {
      a[i] = JSON.stringify(v)
    })
    wx.navigateTo({
      url: mUrl + companyList
    })
  }
  })