Page({
  toNew: function () {
    wx.navigateTo({
      url: "../order/new/new"
    })
  },
  toProcess: function () {
    wx.navigateTo({
      url: "../order/process/process"
    })
  },
  toDeliver: function () {
    wx.navigateTo({
      url: "../order/deliver/deliver"
    })
  },
  toSent: function () {
    wx.navigateTo({
      url: "../order/sent/sent"
    })
  },
  toLogin: function () {
    wx.navigateTo({
      url: "../login/login"
    })
  },
  toHistory: function () {
    wx.navigateTo({
      url: "../order/history/history"
    })
  },
    toReturn: function () {
    wx.navigateTo({
      url: "../order/return/return"
    })
  },
})
