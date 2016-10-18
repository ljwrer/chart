/**
 * Created by Ray on 2016/9/29.
 */

  "use strict";
  var _ = require('lodash');
  var factory = require('../abstract/factory');
  var factoryGenerator = function (action, defaultOption) {
    action = action ? action : {};
    defaultOption = defaultOption ? defaultOption : {};
    return _.create(factory, {
      action: action,
      defaultOption: defaultOption
    })
  };
  module.exports = factoryGenerator;

