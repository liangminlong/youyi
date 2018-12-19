// pages/home/home.js
// const netUtil=require('../../utils/netutil');
import netUtil from '../../utils/netutil';
import Config from '../../utils/config';
import HomeChannel from '../channel/homechannel';
var homeChannel = new HomeChannel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    result:null,
    searchIcon:'../image/search_icon.png',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    //0.显示加载的进度条
    wx.showLoading({
      title: '加载中...',
    })
    //1.发起网络请求： getHomeList
    homeChannel.getHomeList("home").then(function (res) {
      //2.拿到请求的结果
      console.log(res);
      if (res.data != undefined) {
        //4.保存数据到data中
        _this.setData({
          result: res.data
        })
      } else {
        wx.showToast({
          title: res.error
        })
      }
      //3.关闭显示加载的进度条
      wx.hideLoading();
    }, function (error) {

    });

    console.log('发起网络请求之后调用');

    // //1.发起网络请求
    // netUtil.fetch(Config.HOME_URL).then(function(res){
    //     //2.拿到请求的结果
    //     console.log(res.data);
    //     if (res.data != undefined) {
    //       //4.保存数据到data中
    //       _this.setData({
    //         result: res.data
    //       })
    //     } else {
    //       wx.showToast({
    //         title: res.error
    //       })
    //     }
    //     //3.关闭显示加载的进度条
    //     wx.hideLoading();
    // },function(error){

    // });

    //1.发起网络请求
    // netUtil.getHomeData(Config.HOME_URL,function(res){
    //     //2.拿到请求的结果
    //     console.log(res.data);
    //     if (res.data != undefined){
    //       //4.保存数据到data中
    //       _this.setData({
    //         result: res.data.data
    //       })
    //     }else{
    //       wx.showToast({
    //         title: res.error
    //       })
    //     }
    //     //3.关闭显示加载的进度条
    //     wx.hideLoading();
        
    // })
  },

  /**
   * 拿到首页的数据
   */
  getHomeData:function(url,callback){
    //1.发起网络请求
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        callback(res);
      },
      fail:function(error){
        // callback(error);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})