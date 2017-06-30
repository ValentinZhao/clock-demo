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
        tempNameList.push(v)
      }
    })
    this.setData({
      nameList: tempNameList
    })
  },
  showProfile: function(event) {
    var perid = event.currentTarget.dataset.perid
    var commonid = event.currentTarget.dataset.commonid
    var persons = wx.getStorageSync('persons')
    var selected = {}
    persons.forEach((v) => {
      if(!v.PER_ID){
        if (!v.COMMON_USER_ID){
          wx.showToast({
            title: '查无此人！'
          })
          return
        } else {
          if (v.COMMON_USER_ID == commonid){
            selected = v
          }
        }
      } else {
        if (v.PER_ID == perid) {
          selected = v
        }
      }
    })
    wx.navigateTo({
      url: '../profileInContact/profileInContact?perinfo=' + JSON.stringify(selected)
    })
  }
})