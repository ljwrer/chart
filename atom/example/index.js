/**
 * Created by Ray on 2016/10/12.
 */

  "use strict";
  var _ = require('lodash');
  var unit = require('../unit/index');
  var echarts = require('echarts');
  var data0 = ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'];
  var data1 = ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他'];
  var data2 = [
    {value: 335, name: '直达', selected: true},
    {value: 679, name: '营销广告'},
    {value: 1548, name: '搜索引擎'}
  ];
  var data3 = [
    {value: 335, name: '直达'},
    {value: 310, name: '邮件营销'},
    {value: 234, name: '联盟广告'},
    {value: 135, name: '视频广告'},
    {value: 1048, name: '百度'},
    {value: 251, name: '谷歌'},
    {value: 147, name: '必应'},
    {value: 102, name: '其他'}
  ];
  var data4 = [
    {value: 335, name: '直接访问'},
    {value: 310, name: '邮件营销'},
    {value: 234, name: '联盟广告'},
    {value: 135, name: '视频广告'},
    {value: 1548, name: '搜索引擎'}
  ];
  unit.set('tooltip.common', function () {
    return {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    }
  });
  var pieHidden = unit.reducer('pie', 'radius', {
    labelLine: unit.get('labelLine.hidden')()
  });
  var option1 = {
    tooltip: unit.get('tooltip.common')(),
    legend: unit.get('legend.left')(data0),
    series: [pieHidden({
      name: '访问来源',
      start: 50,
      end: 70,
      data: data4
    }, {
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      }
    })]
  };
  var option2 = {
    tooltip: unit.get('tooltip.common')(),
    legend: unit.get('legend.left')(data1),
    series: [
      pieHidden({
        name: '访问来源',
        end: 30,
        data: data2
      }, {
        label: {
          normal: {
            position: 'inner'
          }
        },
      }),
      unit.get('pie.radius')({
        name: '访问来源',
        start: 40,
        end: 55,
        data: data3
      })
    ]
  };
  var chart1 = document.getElementById('chart1');
  var chart2 = document.getElementById('chart2');
  var pie1 = echarts.init(chart1);
  var pie2 = echarts.init(chart2);
  pie1.setOption(option1);
  pie2.setOption(option2);
  window.addEventListener('resize', _.debounce(function () {
    pie1.resize();
    pie2.resize();
  }, 300));






