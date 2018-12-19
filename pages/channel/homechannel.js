//导入url配置文件
import config from '../../utils/config';
//导入网络请求的工具类
import util from '../../utils/netutil';
//导入一个第三方库: regenerator
//（ES7语法中的async \ await 需要依赖这个库）
// http://www.php.cn/xiaochengxu-361183.html
import regeneratorRuntime from '../modules/regenerator-runtime/runtime';

// ES6的语法定义一个HomeChannel类
export default class HomeChannel {
  //构造器
  constructor(options) {
    this.options = options;
    // 定义内存缓存
    this.cache = {
      homeListData: []
    };
  }
  
  /***
   * 根据moduleCode从缓存中查找对应的数据
   */
  findHomeListCache(code) {
    let item = this.cache.homeListData.find((item, index) => {
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
   * 获取首页的数据，传入模块的号码
   */
  getHomeData(moduleCode){
   //1.先从内存缓存找数据
   let data = this.findHomeListCache(moduleCode);
   //2.如果缓存中没有数据
   if (data == null) {
     let url = config.HOME_URL;
     console.log(url)
     try {
       //3.发起网络请求。responseData是一个promise对象
       //这个是异步执行，很有可能这行代码还没执行完，下面的代码就执行完了
       const responseData = util.fetch(url);
       data = responseData;
       //4.将数据缓存在内存中
       this.cache.homeListData.push({ code: moduleCode, data });
     }catch (error) {
       console.error(error);
     }


   }
   //data 就是 responseData 是promise对象
   return data;
 }

  /**
   * 获取首页的数据，传入模块的号码
   */
  async getHomeList(moduleCode) {
    //1.先从内存缓存找数据
    let data = this.findHomeListCache(moduleCode);
    //2.如果缓存中没有数据
    if (data==null) {
      let url = config.HOME_URL;
      console.log(url)
      try {
        console.log("1")
        //3.发起网络请求。responseData是一个promise对象
        //这个是异步执行，等待这行代码执行完，下面的代码才执行
        const responseData = await util.fetch(url);
        console.log("3")
          // console.log(responseData)
          data = responseData;
          //4.将数据缓存在内存中
          this.cache.homeListData.push({ code: moduleCode, data });
      }catch (error) {
        console.error(error);
      }
    }

    //5.返回结果
    return data;
  }


}