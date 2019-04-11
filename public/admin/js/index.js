/**
 * Created by USER on 2019/4/11.
 */
$(function () {
  pieCharts();
  barCharts();
});
var barCharts =function () {
  // var data = [
  //   {name: '一月', value: 300},
  //   {name: '二月', value: 200},
  //   {name: '三月', value: 100},
  //   {name: '四月', value: 600},
  //   {name: '五月', value: 400}
  // ];
  var firstDom = document.querySelector('.picTable:first-child');
  var firstCharts = echarts.init(firstDom);
  var option = {
    title: {
      text: '2019年注册人数'
    },
    toolTip: {},
    legend: {
      data: '人数'
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {type : 'value'},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 2000, 3600, 1400, 1200, 2220]
    }]
  };
  firstCharts.setOption(option);
};
var pieCharts = function () {
  var secondDom = document.querySelector('.picTable:last-child');
  var secondCharts = echarts.init(secondDom);
  var secondOption = {
    title : {
      text: '品牌销售占比',
      subtext: '2019年10月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      /*series.name  a  */
      /*data.name  b */
      /*data.value  c */
      /*占比  d */
      formatter: "{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['李宁','耐克','阿迪','匡威','回力']
    },
    series : [
      {
        name: '销售情况',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'李宁'},
          {value:310, name:'耐克'},
          {value:234, name:'阿迪'},
          {value:135, name:'匡威'},
          {value:1548, name:'回力'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  secondCharts.setOption(secondOption);
};