/**
 * Created by Ray on 2016/10/12.
 */

  "use strict";
  var _ = require('lodash');
  var radius = function (data) {
    var name = data.name;
    var start = _.isNumber(data.start) ? data.start + '%' : 0;
    var end = _.isNumber(data.end) ? data.end + '%' : '100%';
    var pieData = data.data ? data.data : [];
    return {
      name: name,
      radius: [start, end],
      data: pieData
    }
  };
  module.exports = {
    radius: radius
  };

