/**
 * Created by USER on 2019/4/11.
 */
$(function () {
  /*前端校验功能  bootstrap validator
   * 用这个类似于mui.toast
   * */
  $('#login').bootstrapValidator({
    /*提示的图标*/
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      /*配置校验规则*/
      username: {
        /*规则*/
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          /*设置错误信息 和规则无关 和后台校验有关系*/
          callback: {
            message: '用户名错误'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 18,
            message: '密码在6-18个字符内'
          },
          callback: {
            message: '密码不正确'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    /*禁用默认提交的事件 因为要使用ajax提交而不是默认的提交方式*/
    e.preventDefault();
    var $form = $(e.target);
    console.log($form);
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $form.serialize(),
      dataType: 'json',
      success: function (data) {
        if(data.success) {
          location.href = 'index.html'
        }else{
          /*登录不成功*/
          /*8.恢复可提交的按钮*/
          $form.data('bootstrapValidator').disableSubmitButtons(false);
          /*9.指定某一个表单元素的错误提示*/
          /* NOT_VALIDATED, VALIDATING, INVALID or VALID */
          if(data.error == 1000){
            $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
          }else if(data.error == 1001){
            $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
          }
        }
      }
    })
  });
  $('[type="reset"]').on('click',function () {
    $('#login').data('bootstrapValidator').resetForm();
  })
});