// 1.获取首页的数据
const getHomeData = ( url , callback ) => {
  //1.发起网络请求
  wx.request({
    url: url,
    method: 'GET',
    success: function (res) {
      callback(res);
    },
    fail: function (error) {
      callback(error);
    }
  })

}

// 2.一个公用的网络请求函数：返回的结果是一个Promise对象
const fetch = (url, options) => {
  //处理 options 没有被定义或者为null
  options = options || {};
  return new Promise(function (resolve, reject) {
    wx.request({
      url,
      method: options.method || 'GET',
      data: options.body || {},
      header: options.headers || { 'content-type': 'application/json' },
      dataType: options.dataType || 'json',
      success: function (res) {
        //获取成功后调用resolve函数处理结果
        console.log("2")
        resolve(res.data);
      },
      fail: reject
    });
  });
}
module.exports={
  getHomeData:getHomeData,
  fetch: fetch
}