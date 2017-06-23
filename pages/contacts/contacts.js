var common = require('../../utils/util.js')
Page({

  data: {
    firstDepList: [],
    statusCode: ''
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: common.base_url + 'app/employee/contactBooks',
      method: 'POST',
      data: common.json2Form({
        json: JSON.stringify({
          'token': wx.getStorageSync('userInfo').token
        })
      }),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          firstDepList: res.data.orgTree.childNodes,
          statusCode: res.statusCode
        })
      },
      fail: function(res) {

      }
    })
  }
})