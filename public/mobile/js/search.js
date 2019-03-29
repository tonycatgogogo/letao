/**
 * Created by USER on 2019/3/27.
 */
$(function () {
  // 页面初始化
  $('.ht_search input').val('');
  $('.ht_history').html(template('searchTpl',{model: getSearchData()}));
  //搜索框注册绑定事件
  $('.ht_search .search_btn').on('tap',function () {
    var key = $.trim($('input').val());
    if(!key) {
      mui.toast('请输入关键字');
      return false;
    }
    console.log(key);
    location.href = 'searchList.html?key='+key;
  });
  // 清空按钮注册绑定事件
  $('.ht_search .icon_clear').on('tap',function(){
    /*清空*/
    localStorage.clear();
    $('.ht_history').html(template('searchTpl',{model: getSearchData()}));
  });
  //删除按钮注册事件
  $('.ht_search .icon_delete').on('tap',function(){
    /*删除*/
    removeSearchData($(this).parent().find('[data-key]').attr('data-key'));
    $('.ht_history').html(template('searchTpl',{model: getSearchData()}));
  });
  $('[data-key]').on('tap',function(){
        location.href = 'searchList.html?key='+key+$(this).attr('data-key');
      })
});
//获取搜索记录
var getSearchData = function () {
  return JSON.parse(localStorage.getItem('leTaoSearchHistory') || '[]')
};
/*添加搜索记录*/
var addSearchData = function(key){
  var list = getSearchData();

  $.each(list,function(i,item){
    if(item == key){
      list.splice(i,1);
    }
  });

  list.push(key);

  /*最多记录10条*/
  if(list.length > 10){
    list.splice(0,list.length-10);
  }

  localStorage.setItem('leTaoSearchHistory',JSON.stringify(list));
};
/*删除搜索记录*/
var removeSearchData = function(key){
  var list = getSearchData();
  $.each(list,function(i,item){
    if(item == key){
      list.splice(i,1);
    }
  });
  localStorage.setItem('leTaoSearchHistory',JSON.stringify(list));
};