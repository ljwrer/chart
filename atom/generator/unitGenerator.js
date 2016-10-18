/**
 * Created by Ray on 2016/10/11.
 */

  "use strict";
  var _ = require('lodash');
  var factoryGenerator = require('./factoryGenerator');
  var abstractUnit = require('../abstract/unit');
  var unitGenerator = function (allUnits, factory) {
    factory = factory ? factory : factoryGenerator();
    allUnits = allUnits ? allUnits : {};
    return _.create(abstractUnit, {
      factory: factory,
      allUnits: allUnits,
      _cache: {},
    })
  };
  module.exports = unitGenerator;

