/**
 * Created by Ray on 2016/10/13.
 */
var Event = require('events').EventEmitter;
var echarts = require('echarts');
var _ = require('lodash');
var $ = require('jquery');
var ori = {
    init: function () {
        this.instance = echarts.init(this.el);
        if (this.option) {
            this.instance.setOption(this.option);
        }
        if (this.resizeable) {
            this.resizeHandler = this.resize.bind(this);
            $(window).resize(this.resizeHandler);
        }
    },
    loading: function (status) {
        if (status === false) {
            this.instance.hideLoading();
        } else if (this.loadingConfig) {
            this.instance.showLoading(this.loadingConfig)
        } else {
            this.instance.showLoading();
        }
    },
    resize: function () {
        this.instance.resize()
    },
    update: function (options) {
        var defaultOption = {
            notMerge: false,
            lazyUpdate: false
        };
        var mergeOption = _.assign({}, defaultOption, options);
        this.option = mergeOption.option;
        var notMerge = mergeOption.notMerge;
        var lazyUpdate = mergeOption.lazyUpdate;
        this.instance.setOption(this.option, notMerge, lazyUpdate);
    },
    destroy: function () {
        this.instance.dispose();
        if (this.resizeable) {
            $(window).off('resize', this.resizeHandler);
        }
    },
    resizeable: true
};
var asyncOri = _.create(Event.prototype, {
    /**
     * @param el Dom
     * @param options
     *      {
     *           api:同load方法
     *           @override ori
     *           needLoading?:Boolean 开启loading图
     *           resizeable?:Boolean 跟随window resize
     *           loading图 init和update暂时保持一致,要是需要动态的我再加。。。
     *           loadingConfig:(type?: string, opts?: Object)
     */
    init: function (el, options) {
        this.initChart(el, options);
        this.beforeCreate();
        if (options.api) {
            this.load(options).then(function (data) {
                this.render(data);
                this.created();
                this.emit('created')
            }.bind(this))
        }
    },
    /**
     *
     * @param options 同load
     */
    update: function (options) {
        this.beforeUpdate();
        this.load(options).then(function (data) {
            this.render(data);
            this.updated();
            this.emit('updated')
        }.bind(this));
    },
    destroy: function () {
        this.chart.destroy();
        this.emit('destroy');
        this.removeAllListeners();
    },
    initChart: function (el, options) {
        this.options = _.assign({}, this.defaultOptions, _.omit(options,'api','loading'), {el: el});
        options = null;
        this.chart = _.create(ori, this.options);
        this.chart.init();
        this.instance = this.chart.instance;
        this.register();
    },
    register: function () {
        if (this.options.needLoading) {
            this.on('load', function (data) {
                if (!(data.loading === false)) {
                    this.chart.loading();
                }
            });
            this.on('render', function (data) {
                this.chart.loading(false);
            });
        }
    },
    render: function (data) {
        this.emit('render', data);
        this.chart.update(data);
    },
    /**
     *
     * @param options
     *  {
     *    api:Promise/PlainObject,
     *      {
     *          option
     *          notMerge:Boolean(可选)
     *          lazyUpdate:Boolean(可选)
     *      }
     *    loading:Boolean(可选) 请求是否显示loading图 默认跟随init
     *  }
     * @returns {*}
     */
    load: function (options) {
        this.emit('load', options);
        var api = options.api;
        if (_.isFunction(api)) {
            return api();
        } else {
            return Promise.resolve(api)
        }
    },
    //lifeCycle
    beforeCreate: function () {},
    created: function (option) {},
    beforeUpdate: function () {},
    updated: function () {},
    defaultOptions: {
        needLoading: true,
        resizeable: true
    }
});
/**
 *
 * @constructor
 * @property
 *  instace:Echarts实例
 * @method
 *  init:初始化
 *  update:更新数据
 *  destory:销毁
 */
function Chart() {}
Chart.prototype = _.create(asyncOri, {
    constructor: Chart
});
/**
 * @param protoProps
 * @override
 * beforeCreate
 * created
 * beforeUpdate
 * updated
 * defaultOptions: needLoading,resizeable,loadingConfig
 * @param staticProps
 * @returns {*}
 */
Chart.extend = function (protoProps, staticProps) {
    var parent = this;
    var unNamedChildChart;
    if (protoProps && _.has(protoProps, 'constructor')) {
        unNamedChildChart = protoProps.constructor;
    } else {
        unNamedChildChart = function () {
            return parent.apply(this, arguments);
        };
    }
    _.extend(unNamedChildChart, parent, staticProps);
    unNamedChildChart.prototype = _.create(parent.prototype, protoProps);
    unNamedChildChart.prototype.constructor = unNamedChildChart;
    unNamedChildChart.__super__ = parent.prototype;
    return unNamedChildChart;
};
module.exports = Chart;