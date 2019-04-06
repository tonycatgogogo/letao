/**
 * Created by USER on 2019/4/2.
 */
$(function () {
  $('body').on('tap', '.btn_login', function () {
    var params = {
      username: $.trim($('[name="name"]').val()),
      password: $.trim($('[name="pass"]').val())
    };
    if (!params.username || !params.password) {
      mui.toast('请输入用户名或密码');
      return false
    }
    getLoginData(params, function (data) {
      if (data.success) {
        var returnUrl = location.search.replace('?returnUrl=','');
        if(returnUrl){
          location.href = returnUrl;
        }else{
          location.href = HT.userUrl;
        }
      }else if(data.error) {
        mui.toast(data.message);
      }
      $('.btn_login').html('登录')
    })
  })
});
// var getLoginData = function (data, callback) {
//   HT.loginAjax({
//     type: 'post',
//     url: '/user/login',
//     data: data,
//     dataType: 'json',
//     beforeSend: function () {
//       $('.btn_login').html('正在登录...');
//     },
//     success: function (data) {
//       callback && callback(data)
//     }
//   })
// };