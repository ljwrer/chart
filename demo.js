/**
 * Created by Ray on 2016/10/14.
 */
var atom = require('./atom/atom');
var Chart = require('./ori/ori');
var _ = require('lodash');
var data0 = ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'];
var data1 = ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他'];
var data2 = [
    { value: 335, name: '直达', selected: true },
    { value: 679, name: '营销广告' },
    { value: 1548, name: '搜索引擎' }
];
var data3 = [
    { value: 335, name: '直达' },
    { value: 310, name: '邮件营销' },
    { value: 234, name: '联盟广告' },
    { value: 135, name: '视频广告' },
    { value: 1048, name: '百度' },
    { value: 251, name: '谷歌' },
    { value: 147, name: '必应' },
    { value: 102, name: '其他' }
];
var data4 = [
    { value: 335, name: '直接访问' },
    { value: 310, name: '邮件营销' },
    { value: 234, name: '联盟广告' },
    { value: 135, name: '视频广告' },
    { value: 1548, name: '搜索引擎' }
];
atom.set('tooltip.common', function() {
    return {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    }
});
var pieHidden = atom.reducer('pie', 'radius', {
    labelLine: atom.get('labelLine.hidden')()
});
var option1 = {
    tooltip: atom.get('tooltip.common')(),
    legend: atom.get('legend.left')(data0),
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
var api1 = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({
                option:option1,
                notMerge:true
            })
        }, 2000)
    })
};

var option2 = {
    tooltip: atom.get('tooltip.common')(),
    legend: atom.get('legend.left')(data1),
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
        atom.get('pie.radius')({
            name: '访问来源',
            start: 40,
            end: 55,
            data: data3
        })
    ]
};
var api2 = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({
                option:option2
            })
        }, 3000)
    });
};

var chart1 = document.getElementById('chart1');
var chart2 = document.getElementById('chart2');
var Pie;
Pie = Chart.extend({
    type:'pie'
});
var pie = new Pie();
pie.init(chart1, {
    api: api1
});
pie.instance.on('click', function(params) {
    console.log(params)
});
pie.instance.on('legendselectchanged', function(params) {
    console.log(params)
});
setTimeout(function () {
    pie.once('updated',function () {
        setTimeout(function () {
            pie.update({api: api1})
        },5000)
    })
    pie.update({api:api2,loading:false});
},5000);
_.assign(window,{pie:pie})

