/**
 * Here is dom manipulation utils
 * exodus from jQuery!!
 * with little help from my functions
 * author Heeju Jeong(hjjeong@rsupport.com)
 * v 1.0.0 (Mar 20 2015)
 */

'use strict';

module.exports = {
  "isDomElement": isDomElement,
  "isDocument": isDocument,
  "isWindow": isWindow,
  "isContains": isContains,
  "clone": clone,

  //selection
  "domSelect": domSelect,
  "select": domSelect,
  "$": domSelect,

  //class control
  "hasClass": hasClass,
  "addClass": addClass,
  "removeClass": removeClass,
  "toggleClass": toggleClass,

  //attribute control
  "attr": attr,
  "removeAttr": removeAttr,

  //style contorl
  "css": css,

  //DOM insertions & removals
  "appendTo": appendTo,
  "prependTo": prependTo,
  "append": append,
  "prepend": prepend,
  "insertBefore": insertBefore,
  "insertAfter": insertAfter,
  "before": before,
  "after": after,
  "remove": remove,
  "empty": empty
};

/**
 * @param  {[HTMLElement]}  el [description]
 * @return {Boolean}    [description]
 */
function isDomElement(el) {
  if (el === undefined) {
    return false;
  }

  return (el) instanceof HTMLElement;
}

function isDocument(el) {
  return el === document;
}

function isWindow(el) {
  return el === window;
}

/**
 * [domSelect description]
 * @param  {HTMLElement} selector [description]
 * @param  {[HTMLElement]} context  [description]
 * @return {set of HTMLElement or null}          [description]
 */
function domSelect(selector, context) {
  var matches = selector.match(/([#\.])?([\w-]+)/i);

  if (!matches || !matches.length) {
    return null;
  }

  if (matches[0] !== selector) {
    matches[1] = 'querySelector';
    matches[2] = selector;
  }

  var method = {
    "#": "getElementById",
    ".": "getElementsByClassName",
    "undefined": "getElementsByTagName",
    "querySelector": "querySelectorAll"
  }[matches[1]];

  if (context === undefined || isDomElement(context) === false) {
    context = document;
  }

  var el = context[method](matches[2]);

  return (el && el.length && el.length > 1) ? el[0] : el;
}


/**
 * @param  {[HTMLElement]}  el
 * @param  {[HTMLElement]}  parent optional
 * @return {Boolean}
 */
function isContains(el, child) {
  if (el === undefined || (isDomElement(el) === false && isDocument(el) === false)) {
    return false;
  }

  if (child && isDomElement(child) === true) {
    return el !== child && el.contains(child);
  }
  else {
    return el.ownerDocument.contains(el);
  }
}

/**
 * [clone description]
 * @param  {HTMLElement} el
 * @return {null or Cloned HTMLElement}    [description]
 */
function clone(el) {
  if (el === undefined || (isDomElement(el) === false && isDocument(el) === false)) {
    return null;
  }

  return el.cloneNode(true);
}


/**
 * [hasClass description]
 * @param  {[HTMLElement]}  el        [description]
 * @param  {[string]}  className [description]
 * @return {Boolean}           [description]
 */
function hasClass(el, className) {
  if (el === undefined || isDomElement(el) === false) {
    return;
  }

  if (el.classList) {
    return el.classList.contains(className);
  }
  else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
}


/**
 * [addClass description]
 * @param {[HTMLElement]} el        [description]
 * @param {[string]} className [description]
 */
function addClass(el, className) {
  if (el === undefined || isDomElement(el) === false) {
    return;
  }

  if (el.classList) {
    el.classList.add(className);
  }
  else {
    el.className += ' ' + className;
  }
}


/**
 * [removeClass description]
 * @param  {[HTMLElement]} el        [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
function removeClass(el, className) {
  if (el === undefined || isDomElement(el) === false) {
    return;
  }

  if (el.classList) {
    el.classList.remove(className);
  }
  else {
    el.className = el.className.replace(
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '
    );
  }
}


/**
 * [toggleClass description]
 * @param  {[HTMLElement]} el        [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
function toggleClass(el, className) {
  if (el === undefined || isDomElement(el) === false) {
    return;
  }

  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(' ');
    var index = classes.indexOf(className);

    if (index >= 0) {
      classes.splice(index, 1);
    }
    else {
      classes.push(className);
    }

    el.className = classes.join(' ');
  }
}


/**
 * [attr description]
 * @param  {[HTMLElement]} el    [description]
 * @param  {[type]} name  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function attr(el, name, value) {
  if (el === undefined || isDomElement(el) === false || name === undefined) {
    return;
  }

  //get value
  if (value === undefined) {
    return el.getAttribute(name);
  }
  //set value
  else {
    return el.setAttribute(name, value);
  }
}


/**
 * [removeAttr description]
 * @param  {[HTMLElement]} el   [description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function removeAttr(el, name) {
  if (el === undefined || isDomElement(el) === false || name === undefined) {
    return;
  }

  return el.removeAttribute(name);
}


/**
 * [css description]
 * @param  {[HTMLElement]} el    [description]
 * @param  {[type]} name  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function css(el, name, value) {
  if (el === undefined || isDomElement(el) === false) {
    return;
  }

  var styles = getComputedStyle(el);

  if (name === undefined) {
    return styles;
  }

  name = toCamelCase(name);

  if (value === undefined) {
    return styles[name];
  }
  else {
    return el.style[name] = value;
  }
}


/**
 * [appendTo description]
 * @param  {[HTMLElement]} el     [description]
 * @param  {[HTMLElement]} parent [description]
 * @return {[type]}        [description]
 */
function appendTo(el, parent) {
  if (el === undefined || isDomElement(el) === false ||
      parent === undefined || isDomElement(parent) === false) {
    return;
  }

  return parent.appendChild(el);
}

/**
 * [prepend description]
 * @param  {[HTMLElement]} el    [description]
 * @param  {[HTMLElement]} child [description]
 * @return {[type]}       [description]
 */
function prependTo(el, parent) {
  if (el === undefined || isDomElement(el) === false ||
      parent === undefined || isDomElement(parent) === false) {
    return;
  }

  return insertBefore(el, parent.firstChild);
}


/**
 * [insertBefore description]
 * @param  {[HTMLElement]} el     [description]
 * @param  {[HTMLElement]} target [description]
 * @return {[type]}        [description]
 */
function insertBefore(el, target) {
  if (el === undefined || isDomElement(el) === false ||
      target === undefined || isDomElement(target) === false) {
    return;
  }

  if (target.insertAdjacentElement) {
    return target.insertAdjacentElement('beforeBegin', el);
  }
  else {
    return target.parentNode.insertBefore(el, target);
  }
}


/**
 * [insertAfter description]
 * @param  {[HTMLElement]} el     [description]
 * @param  {[HTMLElement]} target [description]
 * @return {[type]}        [description]
 */
function insertAfter(el, target) {
  if (el === undefined || isDomElement(el) === false ||
      target === undefined || isDomElement(target) === false) {
    return;
  }

  if (target.insertAdjacentElement) {
    return target.insertAdjacentElement('afterend', el);
  }

  else {
    if (target.parentNode.lastChild == target) {
      appendTo(el, target.parentNode);
    } else {
      insertBefore(el, target.nextSibling);
    }
  }
}


/**
 * [appendTo description]
 * @param  {[HTMLElement]} el     [description]
 * @param  {[HTMLElement]} parent [description]
 * @return {[type]}        [description]
 */
function append(el, child) {
  return appendTo(child, el);
}

/**
 * [prependTo description]
 * @param  {[HTMLElement]} el     [description]
 * @param  {[HTMLElement]} parent [description]
 * @return {[type]}        [description]
 */
function prepend(el, child) {
  return prependTo(child, el);
}

/**
 * [before description]
 * @param  {[HTMLElement]} target [description]
 * @param  {[HTMLElement]} el     [description]
 * @return {[type]}        [description]
 */
function before(el, target) {
  return insertBefore(target, el);
}

/**
 * [after description]
 * @param  {[HTMLElement]} target [description]
 * @param  {[HTMLElement]} el     [description]
 * @return {[type]}        [description]
 */
function after(el, target) {
  return insertAfter(target, el);
}


/**
 * [remove description]
 * @param  {[HTMLElement]} el [description]
 * @return {[type]}    [description]
 */
function remove(el) {
  if (el === undefined || isDomElement(el) === false) {
    return;
  }

  if (isContains(el.ownerDocument, el) && el.parentNode) {
    el.parentNode.removeChild(elem);
  }
}

/**
 * [empty description]
 * @param  {[HTMLElement]} el [description]
 * @return {[type]}    [description]
 */
function empty(el) {
  if (el === undefined || isDomElement(el) === false) {
    return;
  }

  el.textContent = "";
}


//this is just util
/**
 * [toCamelCase description]
 * @param  {string} str [description]
 * @return {[type]}        [description]
 */
function toCamelCase(str) {
  return str.replace(/[\s_-](\w)/gi, function(r, l){
    return l.toUpperCase();
  });
}
