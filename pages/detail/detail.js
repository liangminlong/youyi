// pages/detail/detail.js
//导入网络请求的类
import DetailChannel from '../channel/detailchannel.js';
import { formatTimeTemp} from '../../utils/util.js';
//实例化网络请求的类
let detailChannel = new DetailChannel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailData:null,
    tabIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.拿到前一个页面传递过来的数据
    var goodId = options.goodId;
    console.log(goodId);
    //2.发起网络请求
    detailChannel.getDetailData('detail', goodId).then((res)=>{
      //3.拿到请求的结果
      console.log(res.data);
      //4.将里面的时间戳格式化

      this.setData({
        detailData: res.data,
      })
    },(error)=>{
      //4.处理网络请求异常
      console.log(error);
    })
  },

  onBindTap1:function(){
      this.setData({
        tabIndex:0,
      })
  },
  onBindTap2: function () {
    this.setData({
      tabIndex: 1,
    })
  },

  /**
   * 点击添加购物车
   */
  addToCar:function(){
    //1.拿到商品信息
    var goodInfo=this.data.detailData;
    var newGood={
      id: goodInfo.goodsid,
      name: goodInfo.title,
      price: goodInfo.price,
      numbers:2,
      checked:true,
    }

    //2.把商品信息保存到本地
    var goods=[];
    //2.1从本地获取数据
    goods = wx.getStorageSync('cars');
    var hasGoods=this.hasGoods(goods, goodInfo.goodsid);
    // 如果该商品已经加过购物车就直接返回
    if (hasGoods){
        wx.showToast({
          title: '已加购物车',
        })
        return ;
    }
    // console.log(goods.length);
    if (goods.length==0){
      goods=[];
    }
    goods.push(newGood);
    wx.setStorage({
      key: 'cars',
      data: goods,
      success:function(){
        wx.showToast({
          title: '加购物车成功',
        })
      }
    })
  },

  /**
   * 是否存在某个商品
   */
  hasGoods(goods,newGoodsId){
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];
      if (good.id == newGoodsId) {  
        return true
      }
    }
    return false;
  }

})