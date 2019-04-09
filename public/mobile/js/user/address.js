/**
 * Created by USER on 2019/4/8.
 */
$(function () {
  mui('.mui-scroll-wrapper').scroll({
    scrollY:true,
    scrollX:false,
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: false, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  });
  getAddressData(function (data) {
    window.data = data;
    $('.mui-scroll').html(template('addressTpl',{model:data}))
  });
  $('body').on('tap', '.mui-btn-red', function () {
    deleteAddress($(this).attr('data-id'),function () {
      mui.toast('删除成功');
      getAddressData(function (data) {
        window.data = data;
        $('.mui-scroll').html(template('addressTpl',{model:data}))
      });
    })
  })
});
var getAddressData = function (callback) {
  HT.loginAjax({
    type: 'get',
    url: '/address/queryAddress',
    data: '',
    dataType: 'json',
    success: function (data) {
      callback && callback(data)
    }
  })
};
var deleteAddress =function (id,callback) {
  HT.loginAjax({
    type: 'get',
    url: '/address/deleteAddress',
    data: {id:id},
    dataType: 'json',
    success: function (data) {
      callback && callback(data)
    }
  })
};