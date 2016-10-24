# Chart
##description
1.监听resize事件，销毁时取消事件
2.增加一个异步流,数据切换自动切换loading图

##static
 * extend
同Backbone extend
```js
var Pie = Chart.extend({
    type:'pie'
});
var pie = new Pie();
```

##props

* instance:Echarts实例
* Chart:（一般用不到。。。）
	* init
	* loading
	* resize
	* update
	* destroy
	* option 配置项
    

##methods

###load
@private 请求数据
@event "load"
* @param options
     * api:Promise/PlainObject,
     	* option          
     	* notMerge:Boolean?
     	* lazyUpdate:Boolean？
     * loading:Boolean？ 请求是否显示loading图

###render
@private 渲染图表
@event "render"

    
###init
@public 初始化
@event "created"
* @param el Dom
* @param options
	* api：同load方法
	* needLoading?:Boolean 开启loading图
   	* resizeable?:Boolean 跟随window resize
   	* loadingConfig:(type?: string, opts?: Object) loading图样式 init和update暂时保持一致,要是需要动态的我再加。。。

```js
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
pie.init(chart1, {
    api: api1
});
pie.instance.on('click', function(params) {
    console.log(params)
});

```

###update
@public 更新数据
@event "updated"
 * @param 同load()

```js
var api2 = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({
                option:option2
            })
        }, 3000)
    });
};
pie.update({api:api2,loading:false});
```

###destory
@public 销毁
@event "destroy"

##lifeCycle

* beforeCreate
* created
* beforeUpdate
* updated
