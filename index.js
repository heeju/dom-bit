/**
 * Here is dom manipulation utils
 * exodus from jQuery!!
 * with little help from my functions
 * author Heeju Jeong(hjjeong@rsupport.com)
 * some functions referred by http://youmightnotneedjquery.com/
 * v 1.2.0 (Apr 09 2015)
 */

'use strict';

module.exports = {
  "isHTMLElement": isHTMLElement,
  "isHTMLCollection": isHTMLCollection,
  "isDocument": isDocument,
  "isWindow": isWindow,
  "isDOMElement": isDOMElement,
  "isContains": isContains,
  "is": equals,
  "equals": equals,
  "contains": isContains,
  "clone": clone,

  //selection
  "domSelect": domSelect,
  "select": domSelect,

  //class control
  "hasClass": hasClass,
  "addClass": addClass,
  "removeClass": removeClass,
  "toggleClass": toggleClass,

  //attribute control
  "attr": attr,
  "removeAttr": removeAttr,

  //style control
  "css": css,
  "getBgColor": getBgColor,

  //dimensions
  "width": width,
  "innerWidth": innerWidth,
  "outerWidth": outerWidth,
  "height": height,
  "innerHeight": innerHeight,
  "outerHeight": outerHeight,
  "getRect": getRect,

  //offset
  "offset": offset,
  "position": position,

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
 * @param  {HTMLElement}  el
 * @return {Boolean}
 */
function isHTMLElement(el) {
  return (el) instanceof HTMLElement;
}

function isHTMLCollection(el) {
  return (el) instanceof HTMLCollection;
}

function isDocument(el) {
  return el === document;
}

function isWindow(el) {
  return el === window;
}

function isDOMElement(el) {
  return isHTMLElement(el) || isDocument(el) || isWindow(el);
}

/**
 * @param  {string} selector
 * @param  {[HTMLElement]} context
 * @return {HTMLCollection or HTMLElement or null}
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

  if (context === undefined || isHTMLElement(context) === false) {
    context = document;
  }

  var el;
  try {
    el = context[method](matches[2]);
  }
  catch (e) {
    el = null
  }

  if (el && el.length !== undefined) {
    if (el.length === 0) {
      el = null;
    }
    else if (el.length === 1) {
      el = el[0];
    }
  }

  return el;
}


function equals(el, target) {
  if (el === undefined || target === undefined || isHTMLElement(el) === false) {
    return;
  }

  if (isDOMElement(target) === true) {
    return el === target;
  }
}

/**
 * @param  {[HTMLElement]}  el
 * @param  {[HTMLElement]}  parent optional
 * @return {Boolean}
 */
function isContains(el, child) {
  if (el === undefined || isDOMElement(el) === false) {
    return false;
  }

  if (child && isDOMElement(child) === true) {
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
  if (el === undefined || isDOMElement(el) === false) {
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
  if (el === undefined || isHTMLElement(el) === false) {
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
  if (el === undefined || isHTMLElement(el) === false) {
    return;
  }

  el.classList.add(className);

  // if (el.classList) {
  //   el.classList.add(className);
  // }
  // else {
  //   el.className += ' ' + className;
  // }
}


/**
 * [removeClass description]
 * @param  {[HTMLElement]} el        [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
function removeClass(el, className) {
  if (el === undefined || isHTMLElement(el) === false) {
    return;
  }

  el.classList.remove(className);

  // if (el.classList) {
  //   el.classList.remove(className);
  // }
  // else {
  //   el.className = el.className.replace(
  //     new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '
  //   );
  // }

  return el;
}


/**
 * [toggleClass description]
 * @param  {[HTMLElement]} el        [description]
 * @param  {[type]} className [description]
 * @return {[type]}           [description]
 */
function toggleClass(el, className, state) {
  if (el === undefined || isHTMLElement(el) === false) {
    return;
  }

  if (state !== undefined && typeof state === 'function') {
    state = state(el);
  }

  if (state === true) {
    return addClass(el, className);
  }
  else if (state === false) {
    return removeClass(el, className);
  }

  el.classList.toggle(className);

  // if (el.classList) {
  //   el.classList.toggle(className);
  // }
  // else {
  //   var classes = el.className.split(' ');
  //   var index = classes.indexOf(className);
  //   if (index >= 0) {
  //     classes.splice(index, 1);
  //   }
  //   else {
  //     classes.push(className);
  //   }
  //   el.className = classes.join(' ');
  // }

  return el;
}


/**
 * [attr description]
 * @param  {[HTMLElement]} el    [description]
 * @param  {[type]} name  [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function attr(el, name, value) {
  if (el === undefined || isHTMLElement(el) === false || name === undefined) {
    return;
  }

  //get value
  if (value === undefined) {
    return el.getAttribute(name);
  }
  //set value
  else {
    el.setAttribute(name, value);
    return el;
  }
}


/**
 * [removeAttr description]
 * @param  {[HTMLElement]} el   [description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function removeAttr(el, name) {
  if (el === undefined || isHTMLElement(el) === false || name === undefined) {
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
  if (el === undefined || isHTMLElement(el) === false) {
    return;
  }

  //get
  if (name === undefined) {
    return getComputedStyle(el);
  }

  if (value === undefined && name.constructor !== Object) {
    var styles = getComputedStyle(el);

    if (typeof name === 'string') {
      return styles[toCamelCase(name)];
    }
    else if (Array.isArray(name)) {
      var result = {};
      for (var i = 0; i < name.length; i++) {
        result[name[i]] = styles[toCamelCase(name[i])];
      }
      return result;
    }
    else {
      return styles;
    }
  }

  //set
  var setStyles = {};

  if (name.constructor === Object) {
    setStyles = name;
  }

  if (typeof name === 'string') {
    setStyles[name] = value;
  }

  for (var key in setStyles) {
    if (typeof setStyles[key] === 'number' && key.match('index') === null) {
      setStyles[key] += 'px';
    }
    el.style[toCamelCase(key)] = setStyles[key];
  }
}


function getBgColor(el) {
  var bgc = '';

  do {
    bgc = css(el, 'background-color');
    el = el.parentNode;
  } while (bgc === 'transparent' || bgc === 'rgba(0, 0, 0, 0)');

  return bgc || 'transparent';
}


function width(el, value) {
  if (el === undefined || isHTMLElement(el) === false) {
    return null;
  }

  if (value !== undefined && value !== true) {
    value = parseInt(value);
    if (typeof value === 'number') {
      return css(el, 'width', value + 'px');
    }
  }

  var style = getComputedStyle(el)
    , width = el.offsetWidth
      - parseInt(style.borderLeftWidth)
      - parseInt(style.borderRightWidth);

  // include padding
  if (value === true) {
    return width;
  }

  return width
    - parseInt(style.paddingLeft)
    - parseInt(style.paddingRight);
}


function innerWidth(el) {
  return width(el, true);
}


function outerWidth(el, withMargin) {
  if (el === undefined || isHTMLElement(el) === false) {
    return null;
  }

  var width = el.offsetWidth;

  if (withMargin === true) {
    var style = getComputedStyle(el);
    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
  }

  return width;
}

/**
 * [height description]
 * @param  {[type]} el    [description]
 * @param  {true or number} value [description]
 * @return {[type]}       [description]
 */
function height(el, value) {
  if (el === undefined || isHTMLElement(el) === false) {
    return null;
  }

  if (typeof value === 'number') {
    return css(el, 'height', value + 'px');
  }

  var style = getComputedStyle(el)
    , height = el.offsetHeight
      - parseInt(style.borderTopWidth)
      - parseInt(style.borderBottomWidth);

  // include padding
  if (value === true) {
    return height;
  }

  return height
    - parseInt(style.paddingTop)
    - parseInt(style.paddingBottom);
}


function innerHeight(el) {
  return height(el, true);
}


function outerHeight(el, withMargin) {
  if (el === undefined || isHTMLElement(el) === false) {
    return null;
  }

  var height = el.offsetHeight;

  if (withMargin === true) {
    var style = getComputedStyle(el);
    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  }

  return height;
}

/**
 * get real rect dimentions
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
function getRect(el) {
  return el.getBoundingClientRect();
}

/**
 * [offset description]
 * @param  {[type]}  el         [description]
 * @param  {Boolean} isRelation include scrolled position
 * @return {[type]}             [description]
 */
function offset(el, isRelation) {
  if (el === undefined || isHTMLElement(el) === false) {
    return {};
  }

  var rect = getRect(el);

  if (isRelation === true) {
    return {
      top: rect.top,
      left: rect.left
    }
  }

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  }
}


function position(el) {
  if (el === undefined || isHTMLElement(el) === false) {
    return {};
  }

  return {
    top: el.offsetTop,
    left: el.offsetLeft
  }
}



/**
 * [appendTo description]
 * @param  {[HTMLElement]} el     [description]
 * @param  {[HTMLElement]} parent [description]
 * @return {[type]}        [description]
 */
function appendTo(el, parent) {
  if (el === undefined || isHTMLElement(el) === false ||
      parent === undefined || isHTMLElement(parent) === false) {
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
  if (el === undefined || isHTMLElement(el) === false ||
      parent === undefined || isHTMLElement(parent) === false) {
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
  if (el === undefined || isHTMLElement(el) === false ||
      target === undefined || isHTMLElement(target) === false) {
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
  if (el === undefined || isHTMLElement(el) === false ||
      target === undefined || isHTMLElement(target) === false) {
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
  if (el === undefined || isHTMLElement(el) === false) {
    return;
  }

  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

/**
 * [empty description]
 * @param  {[HTMLElement]} el [description]
 * @return {[type]}    [description]
 */
function empty(el) {
  if (el === undefined || isHTMLElement(el) === false) {
    return;
  }

  el.textContent = "";

  return el;
}


// utils
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

/**
 * [iteration description]
 * @param  {[type]} collection [description]
 * @param  {[type]} func       [description]
 * @return {[type]}            [description]
 */
function iteration(collection, func) {
  if (isHTMLCollection(collection) === false) {
    if (isHTMLElement(el) === true) {
      return func(collection);
    }
    return;
  }

  var result = func(collection[0])
    , resultISElement = false
    , returnValue;

  if (isHTMLElement(result) === true) {
    resultISElement = true;
    returnValue = collection;
  } else {
    returnValue = [result];
  }

  for (var i = 1; i < collection.length; i++) {
    result = func(collection[i]);
    if (resultISElement === false) {
      returnValue.push(result)
    }
  }

  return returnValue;
}
