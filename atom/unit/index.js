/**
 * Created by Ray on 2016/10/8.
 */

  "use strict";
  var _ = require('lodash');
  var unitGenerator = require('../generator/unitGenerator');


  var legend = require('./legendUnit');
  var pie = require('./pieUnit');
  var labelLine = require('./labelLineUnit');


  var unit = {
    legend: legend,
    pie: pie,
    labelLine: labelLine
  };
  unit.set = function (name, creator) {
    var names = this.splitName(name);
    this.check(names.unitCollectName);
    this[names.unitCollectName].set(names.unitName, creator)
  };
  unit.get = function (name) {
    var names = this.splitName(name);
    return this[names.unitCollectName].get(names.unitName)
  };
  unit.add = function (name, actionName, action) {
    this.check(name);
    this[name].addAction(actionName, action);
  };
  unit.reducer = function (name, optionPicker, action, customizer) {
    this.check(name);
    return this[name].reducer(optionPicker, action, customizer)
  };
  unit.check = function (name) {
    if (!this.hasOwnProperty(name)) {
      console.info(name + ' is not exist,a new unit will be created');
      this.create(name);
    }
  };
  unit.create = function (name) {
    this[name] = unitGenerator();
  };
  unit.splitName = function (name) {
    var names = name.split('.');
    var unitCollectName = names[0];
    var unitName = names[1];
    if (!(unitCollectName && unitName)) {
      throw new Error('illegal name:' + name + ',name should be like \"a.b\"');
    }
    return {
      unitCollectName: unitCollectName,
      unitName: unitName
    }
  };
  module.exports = unit;


