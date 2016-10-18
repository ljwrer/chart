/**
 * Created by Ray on 2016/10/12.
 */

  "use strict";
  var _ = require('lodash');
  var g = require('../generator/index');
  var action = require('../action/pieAction');
  var factory = g.factory(action, {
    type: 'pie'
  });
  var radius = factory.reducer('radius');
  var allUnits = {
    radius: radius
  };
  module.exports = g.unit(allUnits, factory);

