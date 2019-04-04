/**
 * Created by USER on 2019/3/28.
 */
$(function () {
  mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: false, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true//是否启用回弹
  });
  /*1.页面初始化的时候：关键字在输入框内显示*/
  /*获取关键字*/
  var urlParams = HT.getParamsByUrl();
  var $input = $('input').val(urlParams.key || '');
  console.log(urlParams);
  console.log($input);
  /*2.页面初始化的时候：根据关键字查询第一页数据4条*/
  /*下拉刷新配置自动执行  重复操作*/
  // getSearchData({
  //   proName: urlParams.key,
  //   page: 1,
  //   pageSize: 4
  // }, function (data) {
  //   $('.ht_product').html(template('list', data));
  // });
  /*3.用户点击搜索的时候 根据新的关键字搜索商品 重置排序功能*/
  $('.ht_search a').on('tap', function () {
    var key = $.trim($input.val());
    if (!key) {
      mui.toast('请输入关键字');
      return false;
    }
    getSearchData({
      proName: key,
      page: 1,
      pageSize: 4
    }, function (data) {
      $('.ht_product').html(template('list', data));
    });
  });
  /*4.用户点击排序的时候  根据排序的选项去进行排序（默认的时候是 降序  再次点击的时候 升序）*/
  $('.ht_orderBar a').on('tap', function () {
    var $this = $(this);
    if (!$this.hasClass('active')) {
      $this.addClass('active').siblings().removeClass('active')
          .find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
    } else {
      if ($this.find('span').hasClass('fa-angle-down')) {
        $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up')
      } else {
        $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
      }
    }
    var order = $this.attr('data-order');
    var orderVal = $this.find('span').hasClass('fa-angle-up') ? 1 : 2;
    var key = $.trim($input.val());
    if (!key) {
      mui.toast('请输入关键字');
      return false;
    }
    var params = {
      proName: key,
      page: 1,
      pageSize: 4
    };
    params[order] = orderVal;
    getSearchData(params, function (data) {
      $('.ht_product').html(template('list', data));
    });
  });
  /*5.用户下拉的时候  根据当前条件刷新 上拉加载重置  排序功能也重置 */
  /*6.用户上拉的时候  加载下一页（没有数据不去加载了）*/
  mui.init({
    pullRefresh: {
      container: '#refreshContainer',
      down: {
        auto: true,
        callback: function () {
          var that = this;
          var key = $.trim($input.val());
          if (!key) {
            mui.toast('请输入关键字');
            return false;
          }
          $('.ht_orderBar a').removeClass('active').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
          getSearchData({
            proName: key,
            page: 1,
            pageSize: 4
          }, function (data) {
            setTimeout(function () {
              $('.ht_product').html(template('list', data));
              /*注意：停止下拉刷新*/
              that.endPulldownToRefresh();
              /*上拉加载重置*/
              that.refresh(true);
            }, 500)
          });
        }
      },
      up: {
        callback: function () {
          window.page++;
          var that = this;
          var key = $.trim($input.val());
          if (!key) {
            mui.toast('请输入关键字');
            return false;
          }
          var $this = $('.ht_orderBar a.now');
          var order = $this.attr('data-order');
          var orderVal = $this.find('span').hasClass('fa-angle-up') ? 1 : 2;
          var params = {
            proName: key,
            page: window.page,
            pageSize: 4
          };
          params[order] = orderVal;
          getSearchData(params, function (data) {
            setTimeout(function () {
              $('.ht_product').append(template('list', data));
              if(data.data.length){
                that.endPullupToRefresh();
              }else{
                that.endPullupToRefresh(true);
              }
            }, 500)
          });
        }
      }
    }
  })
});
var getSearchData = function (params, callback) {
  $.ajax({
    url: '/product/queryProduct',
    type: 'get',
    data: params,
    dataType: 'json',
    success: function (data) {
      window.page = data.page;
      callback && callback(data);
    }
  })
};