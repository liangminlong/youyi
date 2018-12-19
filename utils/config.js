var host ='http://47.93.30.78:8080';
const Config ={
  HOST: host,
  HOME_URL: host+'/XiaoMiShop/home',
  DETAIL_URL: host + '/XiaoMiShop/detail',
}
//使用：export default 到处的，要使用import from 导入
//使用module.exports={} 导出的，要使用require 导入
export default Config;