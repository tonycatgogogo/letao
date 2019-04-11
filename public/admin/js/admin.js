/**
 * Created by USER on 2019/4/11.
 */
//1 进度条不显示转圈效果
NProgress.configure({
  showSpinner: false
});
$(window).ajaxStart(function () {
  NProgress.start()
});
$(window).ajaxComplete(function () {
  NProgress.done()
});
$('[data-menu]').on('click', function () {
  $('.ad_aside').toggle();
  $('.ad_section').toggleClass('menu');
});
//二级菜单的显示和隐藏
$('.menu [href="javascript:;"]').on('click', function () {
  var $this = $(this);
  var $child = $this.siblings('.child');
  $child.slideToggle();
});

/*退出功能*/
$('[data-logout]').on('click', function () {
  /*1.准备模态框*/
  var logoutModal = '<div class="modal fade" id="logoutModal">'+
      '<div class="modal-dialog modal-sm">'+
      '<div class="modal-content">'+
      '<div class="modal-header">'+
      '<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>'+
      '<h4 class="modal-title">温馨提示</h4>'+
      '</div>'+
      '<div class="modal-body">'+
      '<p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span> 您确定要退出后台管理系统吗？</p>'+
      '</div>'+
      '<div class="modal-footer">'+
      '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
      '<button type="button" class="btn btn-primary">确定</button>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>';
  $('body').append(logoutModal);
  var $logout = $('#logoutModal');
  $logout.modal('show');
  $logout.off('click','.btn-primary').on('click','.btn-primary', function () {
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      data:'',
      dataType:'json',
      success:function (data) {
        setTimeout(function () {
          if(data.success){
            location.href = 'login.html'
          }
        },500)
      }
    })
  });
});