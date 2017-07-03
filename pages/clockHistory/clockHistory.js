var common = require('../../utils/util.js')
Page({
  data: {
    date: '',
    clockTimes: []
  },
  onLoad: function (options) {
    var date = new Date().toLocaleDateString().replace(/\//g, '-')
    var dateArray = date.split('-')
    if(parseInt(dateArray[1]) < 10) {
      dateArray[1] = '0' + dateArray[1]
    }
    if (parseInt(dateArray[2]) < 10) {
      dateArray[2] = '0' + dateArray[2]
    }
    var formattedDate = dateArray.join('-')
    this.setData({
      date: formattedDate
    })
  },
  bindDateChange: function (e) {
    console.log(e)
    this.setData({
      date: e.detail.value
    })
    this.requestClockHistory(e.detail.value)
  },
  requestClockHistory: function(date) {
    var that = this
    wx.request({
      url: common.base_url + 'app/attendance/findSignRecord',
      method: 'POST',
      data: common.json2Form({
        json: JSON.stringify({
          'attendanceDate': date,
          'token': wx.getStorageSync('userInfo').token
        })
      }),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (wx.hideLoading) {
          wx.hideLoading()
        } else {
          wx.hideNavigationBarLoading()
        }
        console.log(res)
        if (!res.data.ok) {
          wx.showToast({
            title: res.data.message,
            image: '../images/err.jpg',
            duration: 2000
          })
        }
        console.log(res)
        var times = res.data.times
        that.setData({
          clockTimes: times
        })
      },
      fail: function (res) {
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
  }
})