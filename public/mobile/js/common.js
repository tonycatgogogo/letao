/**
 * Created by USER on 2019/3/27.
 */
window.HT = {};
HT.getParamsByUrl = function () {
  var params = {};
  var search = location.search.length>0 ? location.search.substring(1):"";
  if(search) {
    search = search.replace('?','');
    var arr = search.length ? search.split("&") : [];
    arr.forEach(function (item,i) {
      var itemArr = item.split('=');
      itemArr[0] = decodeURIComponent(itemArr[0]);
      itemArr[1] = decodeURIComponent(itemArr[1]);
      params[itemArr[0]] = itemArr[1];
    })
  }
  return params;
};
HT.getItemById = function (arr,id) {
  var obj = null;
  arr.forEach(function (item,i) {
    if(item.id == id){
      obj = item;
    }
  });
  return obj;
};
HT.loginUrl = '/mobile/user/login.html';
HT.cartUrl = '/mobile/user/cart.html';
HT.userUrl = '/mobile/user/index.html';
HT.loginAjax = function (params) {
  /*params====> {} */
  $.ajax({
    url:params.url || '#',
    type:params.type || 'get',
    data:params.data || '',
    dataType:params.dataType ||'json',
    beforeSend:function(){
      params.beforeSend && params.beforeSend();
    },
    success:function (data) {
      /*未登录的处理 {error: 400, message: "未登录！"}
       所有的需要登录的接口 没有登录返回这个数据*/
      if(data && data.error == 400){
        location.href = HT.loginUrl+'?returnUrl=' + location.href;
        return false
      }else {
        setTimeout(function(){
          params.success && params.success(data);
        },1000);
      }
    },
    error:function () {
      mui.toast('服务繁忙')
    }
  })
};