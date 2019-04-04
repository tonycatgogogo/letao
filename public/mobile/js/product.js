/**
 * Created by USER on 2019/3/30.
 */
$(function () {
  var id = HT.getParamsByUrl().productId;
  console.log(id);
  getProductData(id,function (data) {
    // 先清除加载动画
    $('.loading').remove();
    console.log(data);
    $('.mui-scroll').html(template('detail',data));
    mui('.mui-slider').slider({
      interval:2000
    });
    mui('.mui-scroll-wrapper').scroll({
      indicators:false
    });
    // 为尺码添加选择按钮
    $('.btn_size').on('tap',function () {
      $(this).addClass('active').siblings().removeClass('active')
    });
    // 为数量注册点击事件
    $('.p_number span').on('tap',function () {
      var $input = $(this).siblings('input');
      var $currNum = $input.val();
      console.log($currNum);
      var $maxNum = parseInt($input.attr('data-max'));
      console.log($maxNum);
      if($(this).hasClass('jian')){
        if($currNum == 0){
          return false;
        }
        $currNum--
      }else{
        if($currNum < $maxNum){
          $currNum++
        }else {
          /*消息框点击的时候会消失 正好和加号在一块  (击穿 tap,点击穿透)*/
          setTimeout(function () {
            mui.toast('库存不足')
          },100);
          return false;
        }
      }
      $input.val($currNum);
    });
    // 加入购物车
    $('.btn_addCart').on('tap',function () {
      var $size = $('.btn_size.active');
      var $num = $('.p_number input').val();
      if(!$size.length) {
        mui.toast('请选择尺码');
        return false
      }
      if($num<=0) {
        mui.toast('请选择数量');
        return false
      }
      // 提交数据
      HT.loginAjax({
        url:'/cart/addCart',
        type:'post',
        data:{
          productId:id,
          size:$size.html(),
          num:$num
        },
        dataType:'json',
        success:function (data) {
          if(data.success == true){
            /*弹出提示框*/
            /*content*/
            /*title*/
            /*btn text []*/
            /*click btn callback */
            mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function(e){
              if(e.index == 0){
                location.href = HT.cartUrl;
              }else{

              }
            })
          }
        }
      })
    })
  })
});
var getProductData = function (productId,callback) {
  $.ajax({
    url:'/product/queryProductDetail',
    type:'get',
    data:{
      id:productId
    },
    dataType:'json',
    success:function (data) {
      setTimeout(function () {
        callback&&callback(data)
      },500)
    }
  })
};