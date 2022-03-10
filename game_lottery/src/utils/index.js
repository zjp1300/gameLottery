// 转换为webp
export function getWebpUrl(url) {
  let webpUrl = url
  if(isWebpConfiger() && webpUrl){
      webpUrl = url+'?imageView2/0/format/webp'
      console.log('该图片转换为web，图片地址'+webpUrl)
  }
  return webpUrl
}
// 判断是否可以使用webp
export function isWebpConfiger(){
  // const webpSupport = Platform.isAndroid() || (Platform.isIOS() && Platform.osVersion >= 14); // 是否支持webp
  // return webpSupport
  return true
}