/**
 * Created by USER on 2019/4/7.
 */
$(function () {
  getUserIndexData(function (data) {
    var mobile = data.mobile || '暂无';
    $('.mui-media-body').html(data.username + '<p class="mui-ellipsis">绑定手机:' + mobile + '</p>')
  });
  $('body').on('tap', '.btn_outLogin', function () {
        getLoginOutData(function (data) {
          if(data.success){
            location.href = HT.loginUrl
          }
        })
      }
  )
});
var getUserIndexData = function (callback) {
  HT.loginAjax({
    type: 'get',
    url: '/user/queryUserMessage',
    data: '',
    dataType: 'json',
    success: function (data) {
      callback && callback(data)
    }
  })
};
var getLoginOutData =function (callback) {
  HT.loginAjax({
    type: 'get',
    url: '/user/logout',
    data: '',
    dataType: 'json',
    beforeSend:function(){
      $('.btn_outLogin').html('正在退出...');
    },
    success: function (data) {
      callback && callback(data)
    }
  })
};