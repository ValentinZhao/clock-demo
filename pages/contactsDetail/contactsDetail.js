Page({
  data: {
    nameList: []
  },
  onLoad: function (options) {
    var depName = options.depname
    var persons = wx.getStorageSync('persons')
    var tempNameList = []
    persons.forEach((v) => {
      if(v.ORG_NAME == depName){
        tempNameList.push(v.USER_NAME)
      }
    })
    this.setData({
      nameList: tempNameList
    })
  }
})