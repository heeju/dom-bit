var $ = require('./dom-helper');

module.exports = function(selector) {
  return new El($.select(selector));
}

function El(el) {
  this.el = el;
}

El.prototype.find = function(selector) {
  if ($.isDomElement(selector) && $.contains(this.el, selector)) {
    return new El(selector);
  }

  return new El($.select(selector, this.el));
};



function iteration(func, el, arg) {


  // iteration();
}
