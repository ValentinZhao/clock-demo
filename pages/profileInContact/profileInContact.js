Page({
  data: {
    perInfo: {},
    hasRole: false,
    hasPhone: false,
    hasEmail: false,
    placeholder: '暂无信息'
  },
  onLoad: function (options) {
    var perInfo = JSON.parse(options.perinfo)
    var hasRole = false
    var hasPhone = false
    var hasEmail = false
    if (perInfo.ROLE_NAME){
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