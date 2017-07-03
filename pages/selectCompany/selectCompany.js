var common = require('../../utils/util.js');
Page({
  data: {
    username: '',
    password: '',
    companyLists: [],
    choosenCompanyInfo: '',
    hidden: false
  },
  radioChange: function (e) {
    var companyCode = e.detail.value
    this.setData({
      choosenCompanyInfo: companyCode
    })
    console.log(e.detail.value)
  },
  onLoad: function (options) {
    var companyList = options.companyList.split('},')
    for(let i = 0; i < companyList.length; i++){
      if (i == companyList.length - 1) {
        continue
      }
      companyList[i] += '}'
    }
    companyList.forEach((v,i,a) => {
      a[i] = JSON.parse(v)
    })
    console.log(companyList)
    this.setData({
      companyList: companyList,
      username: options.userId,
      password: options.password
    })
  },
  userLogin: function () {
    var companyInfo = this.data.choosenCompanyInfo.split(',')
    var username = this.data.username
    var password = this.data.password
    wx.showNavigationBarLoading()
    wx.request({
      url: common.base_url + 'init/app/login',
      method: 'POST',
      data: common.json2Form({
        json: JSON.stringify({
          'userId': username,
          'password': password,
          'companyCode': companyInfo[0],
          'selectUser': companyInfo[1]
        })
      }),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res)
        wx.hideNavigationBarLoading()
        if(res.data.ok){
          if (!wx.getStorageSync('userInfo')){
            wx.setStorageSync('userInfo', res.data)
          }
          wx.switchTab({
            url: '../index/index'
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
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: res.data.message,
          image: '../images/err.jpg',
          duration: 2000
        })
      }
    })
  }
})