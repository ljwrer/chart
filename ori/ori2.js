/**
 * Created by Ray on 2016/10/13.
 */
var Event=require('events').EventEmitter;
var echarts=require('echarts');
var _=require('lodash');
var $=require('jquery');
var ori={
    init:function () {
        this.instance=echarts.init(this.el);
        if(this.option){
            this.instance.setOption(this.option);
        }
        if(this.resizeable){
            this.resizeHandler=this.resize.bind(this);
            $(window).resize(this.resizeHandler);
        }
    },
    loading:function (status) {
        if(status===false){
            this.instance.hideLoading();
        }else if(this.loadingConfig){
            this.instance.showLoading(this.loadingConfig)
        }else {
            this.instance.showLoading();
        }
    },
    resize:function(){
        this.instance.resize()
    },
    update:function (option,force) {
        this.option=option;
        if(force){
            this.destroy();
            this.init();
        }else {
            this.instance.setOption(this.option);
        }
    },
    destroy:function () {
        this.instance.dispose();
        if(this.resizeable){
            $(window).off('resize',this.resizeHandler);
        }
    },
    resizeable:true,
    loadingConfig:{}
};

var asyncOri=_.create(Event.prototype,{
    init:function (api,el) {
        this.chart=_.create(ori,{
            el:el
        });
        this.chart.init();
        if(_.isFunction(api)){
            // this.chart.loading();
            this.beforeCreate();
            api().then(function (option) {
                this.created(option);
                // this.chart.loading(false);
                // this.chart.update(option);
                this.emit('init')
            }.bind(this),function (err) {
                this.emit('error',err)
            }.bind(this))
        }else if(_.isObject(api)){
            this.chart.update(api);
            this.emit('init')
        }
    },
    update:function (api,force) {
        if(_.isFunction(api)){
            this.beforeUpdate();
            // this.chart.loading();
            api().then(function (option) {
                this.updated();
                // this.loading();
                // this.chart.loading(false);
                // this.chart.update(option,force);
                this.emit('update');
            }.bind(this),function (err) {
                this.emit('error',err)
            }.bind(this))
        }else if(_.isObject(api)){
            this.chart.update(api,force);
            this.emit('init')
        }
    },
    loading:function (status) {

        this.emit('loading');
    },
    destroy:function () {
        this.chart.destroy();
        this.emit('destroy');
        this.removeAllListeners();
    }
});

function AsyncChart() {}
AsyncChart.prototype=_.create(asyncOri,{
    construct:AsyncChart
});
var a=new AsyncChart();

module.exports={
    asyncOri:asyncOri,
    ori:ori
};



