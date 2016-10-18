/**
 * Created by Ray on 2016/10/12.
 */

  "use strict";
  var g = require('../generator/index');
  var hidden = function () {
    return {
      normal: {
        show: false
      }
    }
  };
  var allUnits = {
    hidden: hidden
  };
  module.exports = g.unit(allUnits);

