var common = require('../../utils/util.js')
Page({

  data: {
    depList: [],
    peopleList: [],
    statusCode: ''
  },
  onLoad: function (options) {
    var that = this
    if(wx.showLoading){
      wx.showLoading({
        title: '正在获取通讯录'
      })
    } else {
      wx.showNavigationBarLoading()
    }
    wx.request({
      url: common.base_url + 'app/employee/contactBooks',
      method: 'POST',
      data: common.json2Form({
        json: JSON.stringify({
          'token': wx.getStorageSync('userInfo').token,
          'wx': common.wx_version
        })
      }),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        if (wx.hideLoading){
          wx.hideLoading()
        } else {
          wx.hideNavigationBarLoading()
        }
        console.log(res)
        if(!res.data.ok){
          wx.showToast({
            title: res.data.message,
            image: '../images/err.jpg',
            duration: 2000
          })
        }
        that.setData({
          depList: common.readDeps(res.data.orgTree, that.data.depList),
          peopleList: res.data.persons,
          statusCode: res.statusCode
        })
        wx.setStorageSync('persons', res.data.persons)
      },
      fail: function(res) {
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
  },
  listStaff: function(res) {
    console.log(res)
    //部门名字前面有标志的一个字符串并非部门名字本身，用正则解析之后的才是标准部门名
    var tempDepName = res.currentTarget.dataset.list.name 
    var depName = tempDepName.replace(/\u3000+■\s/g, '')
    var depStaff = []
    this.data.depList.forEach((v) => {
      if (v.name == tempDepName){
        common.readDepsNeatly(v, depStaff)
        wx.navigateTo({
          url: '../contactsDetail/contactsDetail?depname=' + depName
        })
      }
    })
  }
})