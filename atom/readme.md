# atom
>function/PlainObject->action->unit->atom

#structure
<pre>
│  atom.js
│  
├─abstract --两个父类
│      factory.js
│      unit.js
│      
├─action --一些action
│      legendAction.js
│      pieAction.js
│      
├─example
│      index.js
│      
├─generator
│      factoryGenerator.js --生成factory
│      index.js
│      unitGenerator.js --生成unit
│      
└─unit --组合好的unit
        index.js --入口
        labelLineUnit.js 
        legendUnit.js
        pieUnit.js
</pre>
>customizer:[https://lodash.com/docs/4.16.4#mergeWith](https://lodash.com/docs/4.16.4#mergeWith)

#description
## action
1. 最小配置单元，类似策略类
2. function/PlainObject

```js
var radius = function (data) {
	var name = data.name;
	var start = _.isNumber(data.start) ? data.start + '%' : 0;
	var end = _.isNumber(data.end) ? data.end + '%' : '100%';
	var pieData = data.data ? data.data : [];
	return {
	  name: name,
	  radius: [start, end],
	  data: pieData
	}
};
```
##unitFacoty

###props
- action
	- 拥有的action
- defaultOption
	- 默认配置

###methods
- reset
	- @params option
	- 重置默认配置
- addAction
	- 新增或替换action
	- @params name:action名
	- @param action 
- reducer
 * @param optionPicker 
     * @type:`String/Array<String>`
     * 选中的actionName
 * @param action:extra action in reducer progress
 * @param customizer
 * @return 生成可用配置项的函数

```js
//运行时组装action,直接得到组装好的函数
var pieHidden = atom.reducer('pie', 'radius', {
	//内部依旧可以调用get
    labelLine: atom.get('labelLine.hidden')()
});
```

## unit 
类似环境类
### props
- allUnits 组合好的unit
- factory @type unitFacoty

### methods
- set
	* @description 重设allUnits中对应名字的unit，只对无需传参的unit有效 
	* @param name
	* @param creator 
		* @tpye function 第一个参数为之前的unit

```js
//在tooltip下增加名为common的unit，无需传参
unit.set('tooltip.common', function () {
    return {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    }
});
//修改已存在的unit
unit.set('tooltip.common', function (origin) {
    orgin.showContent=false;
	return origin;
});
```

- get
	* @param name 从allUnits中取出对应名字的unit
```js
//获取新增的unit
tooltip: unit.get('tooltip.common')(),
//获取预设的unit
legend: unit.get('legend.left')(data0),
```
* reset addAction reducer 为代理factory的方法

## atom
###props
- ...unitName:暴露到外部的unit集合

###methods
所有方法的第一个参数都为unitCollectName.unitName（如legend.left）
- set 代理unit的set
- get 代理unit的get
- add 代理factory的addAction
- reducer 代理factory的reducer

#usage
see:example/index.js

```js
var option = {
    tooltip: unit.get('tooltip.common')(),
    legend: unit.get('legend.left')(data1),
    series: [
		//调用运行时组装的unit
        pieHidden({
            name: '访问来源',
            end: 30,
            data: data2
        }, {//调用unit函数时额外的选项
            label: {
                normal: {
                    position: 'inner'
                }
            },
        }),
		//调用预设的unit
        unit.get('pie.radius')({
            name: '访问来源',
            start: 40,
            end: 55,
            data: data3
        })
    ]
};
```