/**
 * Created by Ray on 2016/10/8.
 */

  "use strict";
  var g = require('../generator/index');
  var action = require('../action/legendAction');
  var factory = g.factory(action);
  var left = factory.reducer(['data', 'left']);
  var allUnits = {
    left: left
  };
  module.exports = g.unit(allUnits, factory);

