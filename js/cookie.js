

function $cookie(name){
  switch(arguments.length){
    case 1:
      return getCookie(name);
      break;
    case 2:
      arguments[1] == null ? removeCookie(name) : setCookie(name, arguments[1], {});
      break;
    case 3:
      setCookie(...arguments);
      break;
    default:
      throw new Error("传入的参数有错");
      break;
  }
}

function setCookie(name, value, {expires, path, domain, secure}){
  //编码存储
  var cookieStr = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  if(expires){
    cookieStr += ";expires=" + afterOfDate(expires);
  }
  if(path){
    cookieStr += ";path=" + path;
  }
  if(domain){
    cookieStr += ";domain=" + domain;
  }
  if(secure){
    cookieStr += ";secure";
  }
  //设置document.cookie
  document.cookie = cookieStr;

}
//获取n天后的时间
function afterOfDate(n){
  var d = new Date();
  var day = d.getDate();
  d.setDate(day + n);
  return d;
}
//本质上就是一个字符串的处理。
function getCookie(name){
  var cookieStr = decodeURIComponent(document.cookie);
  var cookieArr = cookieStr.split("; ");
  var index = cookieArr.findIndex(item => item.indexOf(name) > -1);
  if(index == -1){
    return null;
  }else{
    return cookieArr[index].substring(name.length + 1);
  }
}
function removeCookie(name){
  document.cookie = encodeURIComponent(name) + "=;expires=" + new Date(0);
}
