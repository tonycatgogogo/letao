/**
 * Created by USER on 2019/3/30.
 */
$(function () {
  var $mEdit = $('.mui-table-view');
  mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: false, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  });
  /*初始化上下拉*/
  /*1.初始化页面  自动下拉刷新*/
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",
      down: {
        auto: true,
        callback: function () {
          var that = this;
          setTimeout(function () {
            getCartData(function (data) {
              /*渲染页面*/
              console.log(data);
              $('.mui-table-view').html(template('cart', data));
              that.endPulldownToRefresh();
              /*注册刷新事件 防止多次绑定  先解绑再次绑定*/
              $('.fa-refresh').off('tap').on('tap', function () {
                that.pulldownLoading()
              })
            })
          }, 500)
        }
      }
    }
  });
  /*2.侧滑的时候  点击删除  弹出对话框 确认框*/
  $mEdit.on('tap', 'mui-icon-compose', function () {
    var id = $(this).parent().attr('data-id');
    var item = HT.getItemById(window.data.data, id);
    var html = template('edit', item);
    mui.confirm(html.replace(/\n/g, ''), '商品编辑', ['确认', '取消'], function (e) {
      if (e.index == 0) {
        var size = $('.btn_size.active').html();
        var num = $('.p_number input').val();
        HT.loginAjax({
          type: 'post',
          url: '/cart/updateCart',
          data: {
            id: id,
            size: size,
            num: num
          },
          dataType: 'JSON',
          success: function (data) {
            if (data.success == true) {
              /*窗口关闭*/
              /*列表更新*/
              item.num = num;
              item.size = size;
              $('.mui-table-view').html(template('cart', window.data))
            }
          }
        })
      } else {
      }
    })
  });
  var $body = $('body');
  $body.on('tap', '.btn-size', function () {
    $(this).addClass('active').siblings().removeClass('active')
  });
  $body.on('tap', '.p_number span', function () {
        var $input = $(this).siblings('input');
        var currNum = $input.val();
        var maxNum = parseInt($input.attr('data-max'));
        if ($(this).hasClass('jian')) {
          if (currNum <= 1) {
            mui.toast('请至少选择一样商品');
            return false
          }
          currNum--
        } else {
          if (currNum > maxNum) {
            mui.toast('库存不足');
            return false
          }
          currNum++
        }
      $input.val(currNum);
      });
  $mEdit.on('tap', 'mui-icon-trash', function () {
    var $this = $(this);
    var id = $this.parent().attr('data-id');
    mui.confirm('您确定删除商品？', '商品删除', ['确认', '取消'], function (e) {
      if (e.index == 0) {
        HT.loginAjax({
          type:'get',
          url:'/cart/deleteCart',
          data:{
            id:id
          },
          dataType:'json',
          success:function (data) {
            if(data.success == true){
              $this.parent().remove();
              setAmount()
            }
          }
        })
      } else {
        //TODO
      }
    })
  });
  /*5.点击复选框  计算总金额 */
  $mEdit.on('change', ['type=checkbox'], function () {
    setAmount()
  })
});
var setAmount = function () {
  var $checkedBox = $('[type=checkbox]:checked');
  var amountSum = 0;
  $checkedBox.each(function (i,item) {
    var id = $(this).attr('data-id');
    var item = HT.getItemById(window.cartData.data,id);
    var num = item.num;
    var price = item.price;
    var amount = num * price;
    amountSum += amount;
  });
  if(Math.floor(amountSum * 100)%10){
    amountSum = Math.floor(amountSum * 100)/100;
  }else{
    amountSum = Math.floor(amountSum * 100)/100;
    amountSum = amountSum.toString()+'0';
  }

  console.log(amountSum);
  $('#cartAmount').html(amountSum);
};
var getCartData = function (callback) {
  HT.loginAjax({
    type: 'get',
    url: '/cart/queryCartPaging',
    data: {
      page: 1,
      pageSize: 100
    },
    dataType: 'json',
    success: function (data) {
      window.cartData = data;
      callback && callback(data)
    }
  })
};