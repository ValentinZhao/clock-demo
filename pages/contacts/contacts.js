var common = require('../../utils/util.js')
Page({

  data: {
    depList: [],
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
        var a = []
        console.log(res)
        that.setData({
          depList: common.readDeps(res.data.orgTree, a),
          statusCode: res.statusCode
        })
      },
      fail: function(res) {

      }
    })
  },
  showDep: function() {
    console.log(this.data.depList)
    console.log(this.data.statusCode)
  }
})