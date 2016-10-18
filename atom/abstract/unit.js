/**
 * Created by Ray on 2016/10/10.
 */
  "use strict";
  var _ = require('lodash');
  var unit = {
    /**
     * @description only for plain Object
     * @param name
     * @param creator
     */
    set: function (name, creator) {
      var old;
      if (this.allUnits.hasOwnProperty(name)) {
        console.info(name + ' is override');
        old = this.get(name)();
      }
      this._cache[name] = creator(old);
      this.allUnits[name] = function (extraOption) {
        return _.merge(this._cache[name], extraOption);
      }.bind(this)
    },
    get: function (name) {
      if (this.allUnits.hasOwnProperty(name)) {
        return this.allUnits[name]
      } else {
        throw new Error(name + ' in not exist')
      }
    },
    reset: function (option) {
      this.factory.reset(option);
    },
    addAction: function (name, action) {
      this.factory.addAction(name, action);
    },
    reducer: function (optionPicker, action, customizer) {
      return this.factory.reducer(optionPicker, action, customizer)
    },
    allUnits: {},
    factory: {},
    _cache: {}
  };
  module.exports = unit;

