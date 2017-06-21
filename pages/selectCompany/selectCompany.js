var common = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyLists: [],
    choosenCompanyInfo: [],
    hidden: false
  },
  radioChange: function (e) {
    var companyCode = e.detail.value
    // var changed = {}
    // for (var i = 0; i < this.data.companyLists.length; i++) {
    //   if (checked.indexOf(this.data.companyLists[i].name) !== -1) {
    //     changed['companyLists[' + i + '].checked'] = true
    //   } else {
    //     changed['companyLists[' + i + '].checked'] = false
    //   }
    // }
    this.setData({
      choosenCompanyCode: companyCode
    })
    console.log(e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
      companyList: companyList
    })
  }
})