var common = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本', checked: 'true' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    radioItems: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    companyLists: common._COMPANYLIST,
    hidden: false
  },
  radioChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
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
    // options.companyList.forEach((v,i,a) => {
    //   a[i] = JSON.stringify(v)
    // })
    console.log(options.companyList)
    console.log(companyList)
  }
})