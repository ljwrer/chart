/**
 * Created by Ray on 2016/9/28.
 */
  "use strict";
  var _ = require('lodash');
  /**
   * @abstract defaultOption,action
   * @type {{defaultOption: {}, reset: Factory.reset, create: ((option?, customizer?)=>(any)), action: {}, addAction: ((name?, action)), combine: ((optionPicker?, action?)=>()), reducer: ((optionPicker?, action?, customizer?)=>Function)}}
   */
  var Factory = {
    reset: function (option) {
      this.defaultOption = option;
    },
    /**
     * @private
     * @param option
     * @param customizer
     * @returns {((Factory.defaultOption|{})&*&*&TSource3&TSource4)|((Factory.defaultOption|{})&*&*)|TResult|((Factory.defaultOption|{})&*)|((Factory.defaultOption|{})&*&*&TSource3)}
     */
    create: function (option, customizer) {
      var empty = _.isArray(this.defaultOption) ? [] : {};
      return _.mergeWith(empty, this.defaultOption, option, customizer);
    },
    /**
     * @public
     * @param name
     * @param action
     */
    addAction: function (name, action) {
      if (this.action.hasOwnProperty(name)) {
        console.warn('repeat name ', name, ',overwrite!');
      }
      this.action[name] = action;
    },
    /**
     * @private
     * @param optionPicker
     * @param action
     * @returns {function(this:Factory)}
     */
    combine: function (optionPicker, action) {
      if (_.isUndefined(optionPicker)) {
        optionPicker = [];
      } else if (_.isString(optionPicker)) {
        optionPicker = [optionPicker];
      }
      var actions = optionPicker.map(function (actionName) {
        var action = {};
        if (this.action.hasOwnProperty(actionName)) {
          action = this.action[actionName]
        } else {
          console.warn('action:' + actionName + ' is not found')
        }
        return action;
      }.bind(this));
      if (_.isFunction(action) || _.isObject(action)) {
        actions.push(action);
      }
      return function (data) {
        return actions.reduce(function (prev, curAction) {
          var curOption = _.isFunction(curAction) ? curAction(data) : curAction;
          return _.merge(prev, curOption);
        }.bind(this), {});
      }.bind(this);
    },
    /**
     * @public
     * @param optionPicker
     * @param action
     * @param customizer
     * @returns {Function}
     */
    reducer: function (optionPicker, action, customizer) {
      var self = this;
      return function (data, extraOption, extraCustomizer) {
        var options = self.combine(optionPicker, action)(data);
        options = _.mergeWith(options, extraOption, extraCustomizer);
        return self.create(options, customizer);
      }
    }
  };
  module.exports = Factory;

