Page({
  data: {
    perInfo: {},
    hasRole: false,
    hasPhone: false,
    hasEmail: false,
    placeholder: '暂无信息'
  },
  onLoad: function (options) {
    var perid = options.perid.match(/\w+/)
    var persons = wx.getStorageSync('persons')
    var perInfo = {}
    persons.forEach((v) => {
      if(v.PER_ID == perid){
        perInfo = v;
        return
      }
    })
    var hasRole = false
    var hasPhone = false
    var hasEmail = false
    if (perInfo.POSITION_NAME){
      hasRole = true
    }
    if(perInfo.EMAIL){
      hasEmail = true
    }
    if (perInfo.MOBILE_NO){
      hasPhone = true
    }
    this.setData({
      perInfo: perInfo,
      hasRole: hasRole,
      hasPhone: hasPhone,
      hasEmail: hasEmail
    })
  }
})