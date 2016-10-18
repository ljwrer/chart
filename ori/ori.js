/**
 * Created by Ray on 2016/10/13.
 */
var Event=require('events').EventEmitter;
var echarts=require('echarts');
var _=require('lodash');
var $=require('jquery');
var ori=_.create(Event.prototype,{
    init:function () {
        this.setup();
        this.loading();
        this.beforeCreate.call(this).then(function (option) {
            this.created.call(this);
            this.loading(false);
            this.option=option;
            this.setOption();
        }.bind(this));
        this.emit('init');
    },
    setup:function () {
        this.instance=echarts.init(this.el);
        if(this.option){
            this.setOption();
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
    setOption:function () {
        this.instance.setOption(this.option);
    },
    resize:function(){
        this.instance.resize()
    },
    update:function (option,force) {
        this.loading();
        this.beforeUpdate.call(this).then(function (option) {
            this.updated.call(this);
            this.loading(false);
            this.option=option;
            if(force){
                this.destroy();
                this.setup();
            }else {
                this.setOption();
            }
        }.bind(this));
        this.emit('update');
    },
    destroy:function () {
        this.beforeDestroy.call(this);
        this.instance.dispose();
        if(this.resizeable){
            $(window).off('resize',this.resizeHandler);
        }
        this.destroyed.call(this);
        this.emit('destroy');
    },
    /**
     * @abstract loading data ...
     */
    beforeCreate:function () {},
    created:function () {},
    beforeDestroy:function () {},
    destroyed:function () {},
    beforeUpdate:function () {},
    updated:function () {},
    resizeable:true
});
module.exports=ori;

var syncOri={
    init:function (api,query,cb) {
        this.chart.loading();
        api(query).then(function (data) {
            this.chart.loading(false)
            this.chart.update(data)
        })
    }
};

