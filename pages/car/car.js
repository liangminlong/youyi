// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   * cars:购物车数据
   * allMoney：总价
   * counts:购买数量
   */
  data: {
    cars:[],
    allMoney:0,
    counts:0,
  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },



  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    //1.获取本地的购物车的数据
    var cars = wx.getStorageSync('cars');
    console.log(cars);
    //2.计算合计和结算数
    var allMoney=0;
    var counts=0;
    for(var i=0;i<cars.length;i++){
       var car=cars[i];
       if(car.checked){
         counts++;
         allMoney += car.numbers * car.price;
       }
    }
    this.setData({
      cars: cars,
      counts: counts,
      allMoney: allMoney,
    })
  },

  /**
   * 点击了全选
   */
  selectedAllGoods:function(e){
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var vaules = e.detail.value;
    //全选
    if(vaules.length>0){
      console.log('全选')
      this.selectAllGoods(true);
    //取消全选
    }else{
      console.log('取消全选');
      this.selectAllGoods(false);
    }

    //2.计算合计和结算数
    this.changeMoney();

  },

  /**
   * 是否选中所有的商品
   */
  selectAllGoods:function(isChecked){
    var cars=this.data.cars;
    for(var i=0;i<cars.length;i++){
      //1.修改数组中的数据
      cars[i].checked = isChecked;
    }
    //2.刷新页面
    this.setData({
      cars:cars,
    })
    //3.更新本地数据
    wx.setStorage({
      key: 'cars',
      data: cars,
    })
  },

  /***
   * 计算合计
   */
  changeMoney:function(){
    var allMoney = 0;
    var counts = 0;
    var cars = this.data.cars;
    for (var i = 0; i < cars.length; i++) {
      var car = cars[i];
      if (car.checked) {
        counts++;
        allMoney += car.numbers * car.price;
      }
    }
    this.setData({
      counts: counts,
      allMoney: allMoney,
    })
  },

  /**
   * 监听每一个item的点击事件
   */
  selectedItemGoods:function(e){
    //1.获取所有选中的商品
    var selectGoods = e.detail.value;
    var cars = this.data.cars;
    //2.让所有的商品默认不选中
    for (var i = 0; i < cars.length; i++) {
      //默认不选中
      cars[i].checked = false;
    }
    //3.遍历选中的商品
    for (var i = 0; i < selectGoods.length; i++) {
      var index = selectGoods[i];
      //选中
      cars[index].checked = true;
    }
    //4.刷新页面
    this.setData({
      cars: cars,
    })
    //5.更新本地数据
    wx.setStorage({
      key: 'cars',
      data: cars,
    })
    //6.更新合计
    this.changeMoney();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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