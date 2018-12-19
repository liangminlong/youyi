import config from '../../utils/config';
import util from '../../utils/netutil';
import regeneratorRuntime from '../modules/regenerator-runtime/runtime';
// ES6的语法定义一个HomeChannel类
export default class DetailChannel {
  //构造器
  constructor(options) {
    this.options = options;
    // 定义内存缓存
    this.cache = {
      detailData: []
    };
  }
  /***
   * 根据moduleCode从缓存中查找对应的数据
   */
  findDetailCache(code) {
    let item = this.cache.detailData.find((item, index) => {
      return item.code === code;
    });
    if (item) {
      return item.list;
    }
    else {
      return null;
    }
  }
  /**
   * 获取详情页面的数据，传入模块的号码
   */
  async getDetailData(moduleCode,goodId) {
    //1.先从内存缓存找数据
    let data = this.findDetailCache(moduleCode);
    //2.如果缓存中没有数据
    if (data==null) {
      let url = config.DETAIL_URL + '?goodId=' + goodId;
      console.log(url)
      try {
 
        //3.发起网络请求。responseData是一个promise对象
        //这个是异步执行，等待这行代码执行完，下面的代码才执行
        const responseData = await util.fetch(url);
          console.log(responseData)
          data = responseData;
          //4.将数据缓存在内存中
          this.cache.detailData.push({ code: moduleCode, data });
      }catch (error) {
        console.error(error);
      }
    }

    //5.返回结果
    return data;
  
  }


}