(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var yo = require('yo-yo');
var document = require('global/document');

var _lookup = require('./lib/lookup');
var util = require('./lib/util');
var render = require('./lib/ui');

// state
var state = {
  testnet: true,
  input: '',
  loading: false,
  error: null,
  data: null
};

// actions
var setTestnet = function setTestnet(testnet) {
  state.testnet = testnet;
  rerender();
};
var setInput = function setInput(input) {
  state.input = input;
  rerender();
};

var lookup = function lookup() {
  var input = state.input;
  var req = void 0;
  if (util.isValidEmail(input)) {
    state.error = null;
    var emailHash = util.sha3(input.trim());
    req = _lookup({ emailHash: emailHash }, state.testnet);
  } else if (util.isValidAddress(input)) {
    state.error = null;
    req = _lookup({ address: input }, state.testnet);
  } else if (input.length > 0) {
    state.error = null;
    req = _lookup({ name: input }, state.testnet);
  } else {
    state.error = 'invalid input';
    return rerender();
  }

  state.loading = true;
  rerender();
  req.then(function (data) {
    state.error = null;
    state.data = data;
    state.loading = false;
    rerender();
  }).catch(function (err) {
    state.error = err.message;
    state.data = null;
    state.loading = false;
    rerender();
  });
};

var actions = {
  setTestnet: setTestnet,
  setInput: setInput,
  lookup: lookup
};

var root = render(state, actions);
document.body.appendChild(root);
var rerender = function rerender() {
  yo.update(root, render(state, actions));
};

},{"./lib/lookup":2,"./lib/ui":8,"./lib/util":11,"global/document":62,"yo-yo":80}],2:[function(require,module,exports){
'use strict';

var fetch = require('isomorphic-fetch');
var qs = require('querystring');

var lookup = function lookup(query, testnet) {
  var url = "production" === 'dev' ? 'https://localhost:' + 8443 + '/?' : 'https://id.parity.io:' + (testnet ? 8443 : 443) + '/?';

  return fetch(url + qs.stringify(query)).then(function (res) {
    if (!res.ok) {
      var isJSON = res.headers.get('Content-Type').slice(0, 16) === 'application/json';
      if (isJSON) {
        return res.json().then(function (data) {
          throw new Error(data.message);
        }, function () {
          throw new Error(res.statusText);
        });
      }
      throw new Error(res.statusText);
    }
    return res.json();
  });
};

module.exports = lookup;

},{"isomorphic-fetch":67,"querystring":74}],3:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n\n.container {\n  margin-top: 2rem;\n}\n\n.name {\n  display: inline-block;\n  padding: .3em .4em;\n  line-height: 1;\n  font-size: 115%;\n  color: #333;\n  background-color: #ddd;\n  border-radius: .3em;\n}\n\n.address {\n  display: inline-block;\n  padding: .3em .4em;\n  vertical-align: middle;\n  line-height: 1;\n  color: #333;\n  text-decoration: none;\n  background-color: #ddd;\n  border-radius: .3em;\n}\n\n.address:hover {\n  background-color: #eee;\n}\n\n.copy {\n  margin-top: 0;\n  vertical-align: middle;\n  width: auto;\n  max-width: none;\n  font-size: 80%;\n  opacity: .7;\n}\n.copy:hover, .copy:active {\n  opacity: 1;\n}\n\n.heading {\n  font-size: 120%;\n  font-weight: inherit;\n}\n\n.tokens {\n  margin: .5rem 0 0 0;\n}\n\n.tokens .chip {\n  background-color: #3498db;\n}\n.tokens .chip img {\n  border-color: #3498db;\n}\n.tokens code {\n  font-size: 110%;\n}\n\n.badges {\n  margin: .5rem 0 0 0;\n}\n\n.badges a {\n  color: white;\n  text-decoration: none;\n}\n\n.chip {\n  position: relative;\n  display: inline-block;\n  margin-left: 1rem;\n  padding: .1em .4em .1em 2.2em;\n  color: #fff;\n  border-radius: .3em;\n  background-color: #27ae60;\n}\n.chip:first-child {\n  margin-left: 0;\n}\n\n.chip img {\n  position: absolute;\n  top: 50%; left: 0;\n  margin-top: -1.1em;\n  margin-left: -.2em;\n  padding: .2em;\n  width: 1.7em;\n  height: 1.7em;\n  border: .1em solid #27ae60;\n  border-radius: 100%;\n  background-color: white;\n}\n\n'], ['\n\n.container {\n  margin-top: 2rem;\n}\n\n.name {\n  display: inline-block;\n  padding: .3em .4em;\n  line-height: 1;\n  font-size: 115%;\n  color: #333;\n  background-color: #ddd;\n  border-radius: .3em;\n}\n\n.address {\n  display: inline-block;\n  padding: .3em .4em;\n  vertical-align: middle;\n  line-height: 1;\n  color: #333;\n  text-decoration: none;\n  background-color: #ddd;\n  border-radius: .3em;\n}\n\n.address:hover {\n  background-color: #eee;\n}\n\n.copy {\n  margin-top: 0;\n  vertical-align: middle;\n  width: auto;\n  max-width: none;\n  font-size: 80%;\n  opacity: .7;\n}\n.copy:hover, .copy:active {\n  opacity: 1;\n}\n\n.heading {\n  font-size: 120%;\n  font-weight: inherit;\n}\n\n.tokens {\n  margin: .5rem 0 0 0;\n}\n\n.tokens .chip {\n  background-color: #3498db;\n}\n.tokens .chip img {\n  border-color: #3498db;\n}\n.tokens code {\n  font-size: 110%;\n}\n\n.badges {\n  margin: .5rem 0 0 0;\n}\n\n.badges a {\n  color: white;\n  text-decoration: none;\n}\n\n.chip {\n  position: relative;\n  display: inline-block;\n  margin-left: 1rem;\n  padding: .1em .4em .1em 2.2em;\n  color: #fff;\n  border-radius: .3em;\n  background-color: #27ae60;\n}\n.chip:first-child {\n  margin-left: 0;\n}\n\n.chip img {\n  position: absolute;\n  top: 50%; left: 0;\n  margin-top: -1.1em;\n  margin-left: -.2em;\n  padding: .2em;\n  width: 1.7em;\n  height: 1.7em;\n  border: .1em solid #27ae60;\n  border-radius: 100%;\n  background-color: white;\n}\n\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var css = require('csjs');
module.exports = css(_templateObject);

},{"csjs":51}],4:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <code class="', '">', '</code>\n  '], ['\n    <code class="', '">', '</code>\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n      <div>\n        <a\n          class="', '"\n          href="', '"\n          target="_blank"\n        >\n          <code>', '</code>\n        </a>\n        <button\n          class="', '"\n          onclick=', '\n        >copy</button>\n      </div>\n  '], ['\n      <div>\n        <a\n          class="', '"\n          href="', '"\n          target="_blank"\n        >\n          <code>', '</code>\n        </a>\n        <button\n          class="', '"\n          onclick=', '\n        >copy</button>\n      </div>\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    <li class="', '">\n      <img src="', '" />\n      <code>', '</code>\n      <code><abbr title="', '">', '</abbr></code>\n    </li>\n  '], ['\n    <li class="', '">\n      <img src="', '" />\n      <code>', '</code>\n      <code><abbr title="', '">', '</abbr></code>\n    </li>\n  ']),
    _templateObject4 = _taggedTemplateLiteral(['\n    <li class="', '">\n      <a\n        href="', '"\n        target="_blank"\n      >\n        <img src="', '" />\n        <abbr title="', '">', '</abbr>\n      </a>\n    </li>\n  '], ['\n    <li class="', '">\n      <a\n        href="', '"\n        target="_blank"\n      >\n        <img src="', '" />\n        <abbr title="', '">', '</abbr>\n      </a>\n    </li>\n  ']),
    _templateObject5 = _taggedTemplateLiteral(['\n    <div class="', '">\n      <h1 class="', '">Name</h1>\n      ', '\n      <h1 class="', '">Address</h1>\n      ', '\n      <h1 class="', '">Tokens</h1>\n      <ul class="', '">\n        ', '\n      </ul>\n      <h1 class="', '">Badges</h1>\n      <ul class="', '">\n        ', '\n      </ul>\n    </div>\n  '], ['\n    <div class="', '">\n      <h1 class="', '">Name</h1>\n      ', '\n      <h1 class="', '">Address</h1>\n      ', '\n      <h1 class="', '">Tokens</h1>\n      <ul class="', '">\n        ', '\n      </ul>\n      <h1 class="', '">Badges</h1>\n      <ul class="', '">\n        ', '\n      </ul>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var yo = require('yo-yo');
var copy = require('copy-to-clipboard');
var roundTo = require('round-to');
var rawgit = require('rawgit-url-formatter');

var styles = require('./data.csjs.js');

var _require = require('../util'),
    etherscanLink = _require.etherscanLink;

var render = function render(state, actions) {
  if (!state.data) return null;
  console.log(state.data);
  var _state$data = state.data,
      name = _state$data.name,
      address = _state$data.address,
      tokens = _state$data.tokens,
      badges = _state$data.badges;


  var copyOnClick = function copyOnClick() {
    copy(address);
  };

  var renderedName = name && yo(_templateObject, styles.name, name);

  var renderedAddress = yo(_templateObject2, styles.address, etherscanLink(address, state.testnet), address, styles.copy, copyOnClick);

  var renderedTokens = tokens.map(function (token) {
    return yo(_templateObject3, styles.chip, token.img ? rawgit(token.img).cdn : null, roundTo(parseFloat(token.balance), 5), token.name, token.TLA);
  });

  var renderedBadges = badges.map(function (badge) {
    return yo(_templateObject4, styles.chip, etherscanLink(badge.address, state.testnet), badge.img ? rawgit(badge.img).cdn : null, badge.address, badge.title);
  });

  return yo(_templateObject5, styles.container, styles.heading, renderedName, styles.heading, renderedAddress, styles.heading, styles.tokens, renderedTokens, styles.heading, styles.badges, renderedBadges);
};

module.exports = render;

},{"../util":11,"./data.csjs.js":3,"copy-to-clipboard":14,"rawgit-url-formatter":75,"round-to":76,"yo-yo":80}],5:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n\n.columns {\n  display: flex;\n}\n\n.columns > * {\n  margin-left: .5rem;\n}\n.columns > :first-child {\n  margin-left: 0;\n}\n\n'], ['\n\n.columns {\n  display: flex;\n}\n\n.columns > * {\n  margin-left: .5rem;\n}\n.columns > :first-child {\n  margin-left: 0;\n}\n\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var css = require('csjs');
module.exports = css(_templateObject);

},{"csjs":51}],6:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <form onsubmit=', ' action="#">\n      <input\n        type="text" value="', '"\n        placeholder="email, name or address"\n        onchange=', '\n        onkeypress=', '\n        onblur=', '\n        spellcheck="false"\n      />\n      <div class="', '">\n        <select\n          aria-label="chain"\n          onchange=', '\n        >\n          <option\n            value="mainnet" selected="', '"\n          >Mainnet</option>\n          <option\n            value="testnet" selected="', '"\n          >Testnet</option>\n        </select>\n        <button\n          className="lookup" onclick=', '\n        >Lookup</button>\n      </div>\n    </form>\n  '], ['\n    <form onsubmit=', ' action="#">\n      <input\n        type="text" value="', '"\n        placeholder="email, name or address"\n        onchange=', '\n        onkeypress=', '\n        onblur=', '\n        spellcheck="false"\n      />\n      <div class="', '">\n        <select\n          aria-label="chain"\n          onchange=', '\n        >\n          <option\n            value="mainnet" selected="', '"\n          >Mainnet</option>\n          <option\n            value="testnet" selected="', '"\n          >Testnet</option>\n        </select>\n        <button\n          className="lookup" onclick=', '\n        >Lookup</button>\n      </div>\n    </form>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var yo = require('yo-yo');

var styles = require('./form.csjs.js');

var render = function render(state, actions) {
  var formOnSubmit = function formOnSubmit(e) {
    e.preventDefault();
    actions.lookup();
    return false;
  };
  var chainOnChange = function chainOnChange(e) {
    var chain = e.target.value;
    actions.setTestnet(chain === 'testnet');
  };
  var inputOnChange = function inputOnChange(e) {
    var input = e.target.value;
    actions.setInput(input.trim());
  };

  return yo(_templateObject, formOnSubmit, state.input, inputOnChange, inputOnChange, inputOnChange, styles.columns, chainOnChange, !state.testnet, state.testnet, actions.lookup);
};

module.exports = render;

},{"./form.csjs.js":5,"yo-yo":80}],7:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n\n.container {\n  margin: 2rem auto;\n  max-width: 30rem;\n  text-align: center;\n}\n\n.logo {\n  display: inline-block;\n  margin: 0 auto 1rem auto;\n  max-width: 5rem;\n}\n\n'], ['\n\n.container {\n  margin: 2rem auto;\n  max-width: 30rem;\n  text-align: center;\n}\n\n.logo {\n  display: inline-block;\n  margin: 0 auto 1rem auto;\n  max-width: 5rem;\n}\n\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var css = require('csjs');
module.exports = css(_templateObject);

},{"csjs":51}],8:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n  <div className="system-sans-serif ', '">\n    <img className="', '" src="logo.svg" alt="Parity Logo" />\n    ', '\n    ', '\n    ', '\n  </div>\n'], ['\n  <div className="system-sans-serif ', '">\n    <img className="', '" src="logo.svg" alt="Parity Logo" />\n    ', '\n    ', '\n    ', '\n  </div>\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var yo = require('yo-yo');

var styles = require('./index.csjs.js');
var renderForm = require('./form');
var renderStatus = require('./status');
var renderData = require('./data');

var render = function render(state, actions) {
  return yo(_templateObject, styles.container, styles.logo, renderForm(state, actions), renderStatus(state, actions), renderData(state, actions));
};

module.exports = render;

},{"./data":4,"./form":6,"./index.csjs.js":7,"./status":10,"yo-yo":80}],9:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n\n.spinner {\n  margin-top: 1rem;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n}\n\n.spinner > div {\n  width: 100%;\n  height: 100%;\n  background-color: #3498db;\n  border-radius: 100%;\n  -webkit-animation: spinning .6s infinite ease-out;\n  animation: spinning .6s infinite ease-out;\n}\n\n@keyframes spinning {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  }\n  30% {\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0;\n  }\n}\n\n'], ['\n\n.spinner {\n  margin-top: 1rem;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n}\n\n.spinner > div {\n  width: 100%;\n  height: 100%;\n  background-color: #3498db;\n  border-radius: 100%;\n  -webkit-animation: spinning .6s infinite ease-out;\n  animation: spinning .6s infinite ease-out;\n}\n\n@keyframes spinning {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  }\n  30% {\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0;\n  }\n}\n\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var css = require('csjs');
module.exports = css(_templateObject);

},{"csjs":51}],10:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <p class="notification error">', '</p>\n  '], ['\n    <p class="notification error">', '</p>\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div class="', '"><div /></div>\n  '], ['\n    <div class="', '"><div /></div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var yo = require('yo-yo');

var styles = require('./status.csjs.js');

var render = function render(state, actions) {
  return [state.error ? yo(_templateObject, state.error) : null, state.loading ? yo(_templateObject2, styles.spinner) : null];
};

module.exports = render;

},{"./status.csjs.js":9,"yo-yo":80}],11:[function(require,module,exports){
'use strict';

var _sha3 = require('web3/lib/utils/sha3');

var sha3 = function sha3(str, opt) {
  return '0x' + _sha3(str, opt);
};

var isValidEmail = function isValidEmail(str) {
  if (typeof str !== 'string') return false;
  return str.indexOf('@') >= 1 && str.length >= 3;
};

var pattern = /^[a-f0-9]{40}$/i;

var isValidAddress = function isValidAddress(hex) {
  if (typeof hex !== 'string') return false;
  if (hex.slice(0, 2).toLowerCase() === '0x') hex = hex.slice(2);
  return pattern.test(hex);
};

var etherscanLink = function etherscanLink(address, testnet) {
  return 'https://' + (testnet ? 'testnet.' : '') + 'etherscan.io/address/' + address;
};

module.exports = {
  sha3: sha3,
  isValidEmail: isValidEmail,
  isValidAddress: isValidAddress,
  etherscanLink: etherscanLink
};

},{"web3/lib/utils/sha3":78}],12:[function(require,module,exports){
'use strict';

var document = require('global/document');
var hyperx = require('hyperx');
var onload = require('on-load');

var SVGNS = 'http://www.w3.org/2000/svg';
var XLINKNS = 'http://www.w3.org/1999/xlink';

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
};
var SVG_TAGS = ['svg', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line', 'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref', 'tspan', 'use', 'view', 'vkern'];

function belCreateElement(tag, props, children) {
  var el;

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS;
  }

  // If we are using a namespace
  var ns = false;
  if (props.namespace) {
    ns = props.namespace;
    delete props.namespace;
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag);
  } else {
    el = document.createElement(tag);
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {};
    var unload = props.onunload || function () {};
    onload(el, function belOnload() {
      load(el);
    }, function belOnunload() {
      unload(el);
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller);
    delete props.onload;
    delete props.onunload;
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase();
      var val = props[p];
      // Normalize className
      if (key === 'classname') {
        key = 'class';
        p = 'class';
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for';
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key;else if (val === 'false') continue;
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val;
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val);
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val);
          }
        } else {
          el.setAttribute(p, val);
        }
      }
    }
  }

  function appendChild(childs) {
    if (!Array.isArray(childs)) return;
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i];
      if (Array.isArray(node)) {
        appendChild(node);
        continue;
      }

      if (typeof node === 'number' || typeof node === 'boolean' || node instanceof Date || node instanceof RegExp) {
        node = node.toString();
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node;
          continue;
        }
        node = document.createTextNode(node);
      }

      if (node && node.nodeType) {
        el.appendChild(node);
      }
    }
  }
  appendChild(children);

  return el;
}

module.exports = hyperx(belCreateElement);
module.exports.default = module.exports;
module.exports.createElement = belCreateElement;

},{"global/document":62,"hyperx":65,"on-load":71}],13:[function(require,module,exports){
"use strict";

},{}],14:[function(require,module,exports){
'use strict';

var deselectCurrent = require('toggle-selection');

var defaultMessage = 'Copy to clipboard: #{key}, Enter';

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl') + '+C';
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function copy(text, options) {
  var debug,
      message,
      reselectPrevious,
      range,
      selection,
      mark,
      success = false;
  if (!options) {
    options = {};
  }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement('span');
    mark.textContent = text;
    mark.setAttribute('style', [
    // reset user styles for span element
    'all: unset',
    // prevents scrolling to the end of the page
    'position: fixed', 'top: 0', 'clip: rect(0, 0, 0, 0)',
    // used to preserve spaces and line breaks
    'white-space: pre',
    // do not inherit user-select (it may be `none`)
    '-webkit-user-select: text', '-moz-user-select: text', '-ms-user-select: text', 'user-select: text'].join(';'));

    document.body.appendChild(mark);

    range.selectNode(mark);
    selection.addRange(range);

    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
    success = true;
  } catch (err) {
    debug && console.error('unable to copy using execCommand: ', err);
    debug && console.warn('trying IE specific stuff');
    try {
      window.clipboardData.setData('text', text);
      success = true;
    } catch (err) {
      debug && console.error('unable to copy using clipboardData: ', err);
      debug && console.error('falling back to prompt');
      message = format('message' in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == 'function') {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

module.exports = copy;

},{"toggle-selection":77}],15:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var BlockCipher = C_lib.BlockCipher;
		var C_algo = C.algo;

		// Lookup tables
		var SBOX = [];
		var INV_SBOX = [];
		var SUB_MIX_0 = [];
		var SUB_MIX_1 = [];
		var SUB_MIX_2 = [];
		var SUB_MIX_3 = [];
		var INV_SUB_MIX_0 = [];
		var INV_SUB_MIX_1 = [];
		var INV_SUB_MIX_2 = [];
		var INV_SUB_MIX_3 = [];

		// Compute lookup tables
		(function () {
			// Compute double table
			var d = [];
			for (var i = 0; i < 256; i++) {
				if (i < 128) {
					d[i] = i << 1;
				} else {
					d[i] = i << 1 ^ 0x11b;
				}
			}

			// Walk GF(2^8)
			var x = 0;
			var xi = 0;
			for (var i = 0; i < 256; i++) {
				// Compute sbox
				var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
				sx = sx >>> 8 ^ sx & 0xff ^ 0x63;
				SBOX[x] = sx;
				INV_SBOX[sx] = x;

				// Compute multiplication
				var x2 = d[x];
				var x4 = d[x2];
				var x8 = d[x4];

				// Compute sub bytes, mix columns tables
				var t = d[sx] * 0x101 ^ sx * 0x1010100;
				SUB_MIX_0[x] = t << 24 | t >>> 8;
				SUB_MIX_1[x] = t << 16 | t >>> 16;
				SUB_MIX_2[x] = t << 8 | t >>> 24;
				SUB_MIX_3[x] = t;

				// Compute inv sub bytes, inv mix columns tables
				var t = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
				INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
				INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
				INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
				INV_SUB_MIX_3[sx] = t;

				// Compute next counter
				if (!x) {
					x = xi = 1;
				} else {
					x = x2 ^ d[d[d[x8 ^ x2]]];
					xi ^= d[d[xi]];
				}
			}
		})();

		// Precomputed Rcon lookup
		var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

		/**
   * AES block cipher algorithm.
   */
		var AES = C_algo.AES = BlockCipher.extend({
			_doReset: function _doReset() {
				// Skip reset of nRounds has been set before and key did not change
				if (this._nRounds && this._keyPriorReset === this._key) {
					return;
				}

				// Shortcuts
				var key = this._keyPriorReset = this._key;
				var keyWords = key.words;
				var keySize = key.sigBytes / 4;

				// Compute number of rounds
				var nRounds = this._nRounds = keySize + 6;

				// Compute number of key schedule rows
				var ksRows = (nRounds + 1) * 4;

				// Compute key schedule
				var keySchedule = this._keySchedule = [];
				for (var ksRow = 0; ksRow < ksRows; ksRow++) {
					if (ksRow < keySize) {
						keySchedule[ksRow] = keyWords[ksRow];
					} else {
						var t = keySchedule[ksRow - 1];

						if (!(ksRow % keySize)) {
							// Rot word
							t = t << 8 | t >>> 24;

							// Sub word
							t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];

							// Mix Rcon
							t ^= RCON[ksRow / keySize | 0] << 24;
						} else if (keySize > 6 && ksRow % keySize == 4) {
							// Sub word
							t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];
						}

						keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
					}
				}

				// Compute inv key schedule
				var invKeySchedule = this._invKeySchedule = [];
				for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
					var ksRow = ksRows - invKsRow;

					if (invKsRow % 4) {
						var t = keySchedule[ksRow];
					} else {
						var t = keySchedule[ksRow - 4];
					}

					if (invKsRow < 4 || ksRow <= 4) {
						invKeySchedule[invKsRow] = t;
					} else {
						invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 0xff]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
					}
				}
			},

			encryptBlock: function encryptBlock(M, offset) {
				this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
			},

			decryptBlock: function decryptBlock(M, offset) {
				// Swap 2nd and 4th rows
				var t = M[offset + 1];
				M[offset + 1] = M[offset + 3];
				M[offset + 3] = t;

				this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

				// Inv swap 2nd and 4th rows
				var t = M[offset + 1];
				M[offset + 1] = M[offset + 3];
				M[offset + 3] = t;
			},

			_doCryptBlock: function _doCryptBlock(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
				// Shortcut
				var nRounds = this._nRounds;

				// Get input, add round key
				var s0 = M[offset] ^ keySchedule[0];
				var s1 = M[offset + 1] ^ keySchedule[1];
				var s2 = M[offset + 2] ^ keySchedule[2];
				var s3 = M[offset + 3] ^ keySchedule[3];

				// Key schedule row counter
				var ksRow = 4;

				// Rounds
				for (var round = 1; round < nRounds; round++) {
					// Shift rows, sub bytes, mix columns, add round key
					var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 0xff] ^ SUB_MIX_2[s2 >>> 8 & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
					var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 0xff] ^ SUB_MIX_2[s3 >>> 8 & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
					var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 0xff] ^ SUB_MIX_2[s0 >>> 8 & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
					var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 0xff] ^ SUB_MIX_2[s1 >>> 8 & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

					// Update state
					s0 = t0;
					s1 = t1;
					s2 = t2;
					s3 = t3;
				}

				// Shift rows, sub bytes, add round key
				var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 0xff] << 16 | SBOX[s2 >>> 8 & 0xff] << 8 | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
				var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 0xff] << 16 | SBOX[s3 >>> 8 & 0xff] << 8 | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
				var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 0xff] << 16 | SBOX[s0 >>> 8 & 0xff] << 8 | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
				var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 0xff] << 16 | SBOX[s1 >>> 8 & 0xff] << 8 | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

				// Set output
				M[offset] = t0;
				M[offset + 1] = t1;
				M[offset + 2] = t2;
				M[offset + 3] = t3;
			},

			keySize: 256 / 32
		});

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
   */
		C.AES = BlockCipher._createHelper(AES);
	})();

	return CryptoJS.AES;
});

},{"./cipher-core":16,"./core":17,"./enc-base64":18,"./evpkdf":20,"./md5":25}],16:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	/**
  * Cipher core components.
  */
	CryptoJS.lib.Cipher || function (undefined) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var Base = C_lib.Base;
		var WordArray = C_lib.WordArray;
		var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
		var C_enc = C.enc;
		var Utf8 = C_enc.Utf8;
		var Base64 = C_enc.Base64;
		var C_algo = C.algo;
		var EvpKDF = C_algo.EvpKDF;

		/**
   * Abstract base cipher template.
   *
   * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
   * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
   * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
   * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
   */
		var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
			/**
    * Configuration options.
    *
    * @property {WordArray} iv The IV to use for this operation.
    */
			cfg: Base.extend(),

			/**
    * Creates this cipher in encryption mode.
    *
    * @param {WordArray} key The key.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @return {Cipher} A cipher instance.
    *
    * @static
    *
    * @example
    *
    *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
    */
			createEncryptor: function createEncryptor(key, cfg) {
				return this.create(this._ENC_XFORM_MODE, key, cfg);
			},

			/**
    * Creates this cipher in decryption mode.
    *
    * @param {WordArray} key The key.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @return {Cipher} A cipher instance.
    *
    * @static
    *
    * @example
    *
    *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
    */
			createDecryptor: function createDecryptor(key, cfg) {
				return this.create(this._DEC_XFORM_MODE, key, cfg);
			},

			/**
    * Initializes a newly created cipher.
    *
    * @param {number} xformMode Either the encryption or decryption transormation mode constant.
    * @param {WordArray} key The key.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @example
    *
    *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
    */
			init: function init(xformMode, key, cfg) {
				// Apply config defaults
				this.cfg = this.cfg.extend(cfg);

				// Store transform mode and key
				this._xformMode = xformMode;
				this._key = key;

				// Set initial values
				this.reset();
			},

			/**
    * Resets this cipher to its initial state.
    *
    * @example
    *
    *     cipher.reset();
    */
			reset: function reset() {
				// Reset data buffer
				BufferedBlockAlgorithm.reset.call(this);

				// Perform concrete-cipher logic
				this._doReset();
			},

			/**
    * Adds data to be encrypted or decrypted.
    *
    * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
    *
    * @return {WordArray} The data after processing.
    *
    * @example
    *
    *     var encrypted = cipher.process('data');
    *     var encrypted = cipher.process(wordArray);
    */
			process: function process(dataUpdate) {
				// Append
				this._append(dataUpdate);

				// Process available blocks
				return this._process();
			},

			/**
    * Finalizes the encryption or decryption process.
    * Note that the finalize operation is effectively a destructive, read-once operation.
    *
    * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
    *
    * @return {WordArray} The data after final processing.
    *
    * @example
    *
    *     var encrypted = cipher.finalize();
    *     var encrypted = cipher.finalize('data');
    *     var encrypted = cipher.finalize(wordArray);
    */
			finalize: function finalize(dataUpdate) {
				// Final data update
				if (dataUpdate) {
					this._append(dataUpdate);
				}

				// Perform concrete-cipher logic
				var finalProcessedData = this._doFinalize();

				return finalProcessedData;
			},

			keySize: 128 / 32,

			ivSize: 128 / 32,

			_ENC_XFORM_MODE: 1,

			_DEC_XFORM_MODE: 2,

			/**
    * Creates shortcut functions to a cipher's object interface.
    *
    * @param {Cipher} cipher The cipher to create a helper for.
    *
    * @return {Object} An object with encrypt and decrypt shortcut functions.
    *
    * @static
    *
    * @example
    *
    *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
    */
			_createHelper: function () {
				function selectCipherStrategy(key) {
					if (typeof key == 'string') {
						return PasswordBasedCipher;
					} else {
						return SerializableCipher;
					}
				}

				return function (cipher) {
					return {
						encrypt: function encrypt(message, key, cfg) {
							return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
						},

						decrypt: function decrypt(ciphertext, key, cfg) {
							return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
						}
					};
				};
			}()
		});

		/**
   * Abstract base stream cipher template.
   *
   * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
   */
		var StreamCipher = C_lib.StreamCipher = Cipher.extend({
			_doFinalize: function _doFinalize() {
				// Process partial blocks
				var finalProcessedBlocks = this._process(!!'flush');

				return finalProcessedBlocks;
			},

			blockSize: 1
		});

		/**
   * Mode namespace.
   */
		var C_mode = C.mode = {};

		/**
   * Abstract base block cipher mode template.
   */
		var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
			/**
    * Creates this mode for encryption.
    *
    * @param {Cipher} cipher A block cipher instance.
    * @param {Array} iv The IV words.
    *
    * @static
    *
    * @example
    *
    *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
    */
			createEncryptor: function createEncryptor(cipher, iv) {
				return this.Encryptor.create(cipher, iv);
			},

			/**
    * Creates this mode for decryption.
    *
    * @param {Cipher} cipher A block cipher instance.
    * @param {Array} iv The IV words.
    *
    * @static
    *
    * @example
    *
    *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
    */
			createDecryptor: function createDecryptor(cipher, iv) {
				return this.Decryptor.create(cipher, iv);
			},

			/**
    * Initializes a newly created mode.
    *
    * @param {Cipher} cipher A block cipher instance.
    * @param {Array} iv The IV words.
    *
    * @example
    *
    *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
    */
			init: function init(cipher, iv) {
				this._cipher = cipher;
				this._iv = iv;
			}
		});

		/**
   * Cipher Block Chaining mode.
   */
		var CBC = C_mode.CBC = function () {
			/**
    * Abstract base CBC mode.
    */
			var CBC = BlockCipherMode.extend();

			/**
    * CBC encryptor.
    */
			CBC.Encryptor = CBC.extend({
				/**
     * Processes the data block at offset.
     *
     * @param {Array} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     *
     * @example
     *
     *     mode.processBlock(data.words, offset);
     */
				processBlock: function processBlock(words, offset) {
					// Shortcuts
					var cipher = this._cipher;
					var blockSize = cipher.blockSize;

					// XOR and encrypt
					xorBlock.call(this, words, offset, blockSize);
					cipher.encryptBlock(words, offset);

					// Remember this block to use with next block
					this._prevBlock = words.slice(offset, offset + blockSize);
				}
			});

			/**
    * CBC decryptor.
    */
			CBC.Decryptor = CBC.extend({
				/**
     * Processes the data block at offset.
     *
     * @param {Array} words The data words to operate on.
     * @param {number} offset The offset where the block starts.
     *
     * @example
     *
     *     mode.processBlock(data.words, offset);
     */
				processBlock: function processBlock(words, offset) {
					// Shortcuts
					var cipher = this._cipher;
					var blockSize = cipher.blockSize;

					// Remember this block to use with next block
					var thisBlock = words.slice(offset, offset + blockSize);

					// Decrypt and XOR
					cipher.decryptBlock(words, offset);
					xorBlock.call(this, words, offset, blockSize);

					// This block becomes the previous block
					this._prevBlock = thisBlock;
				}
			});

			function xorBlock(words, offset, blockSize) {
				// Shortcut
				var iv = this._iv;

				// Choose mixing block
				if (iv) {
					var block = iv;

					// Remove IV for subsequent blocks
					this._iv = undefined;
				} else {
					var block = this._prevBlock;
				}

				// XOR blocks
				for (var i = 0; i < blockSize; i++) {
					words[offset + i] ^= block[i];
				}
			}

			return CBC;
		}();

		/**
   * Padding namespace.
   */
		var C_pad = C.pad = {};

		/**
   * PKCS #5/7 padding strategy.
   */
		var Pkcs7 = C_pad.Pkcs7 = {
			/**
    * Pads data using the algorithm defined in PKCS #5/7.
    *
    * @param {WordArray} data The data to pad.
    * @param {number} blockSize The multiple that the data should be padded to.
    *
    * @static
    *
    * @example
    *
    *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
    */
			pad: function pad(data, blockSize) {
				// Shortcut
				var blockSizeBytes = blockSize * 4;

				// Count padding bytes
				var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

				// Create padding word
				var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;

				// Create padding
				var paddingWords = [];
				for (var i = 0; i < nPaddingBytes; i += 4) {
					paddingWords.push(paddingWord);
				}
				var padding = WordArray.create(paddingWords, nPaddingBytes);

				// Add padding
				data.concat(padding);
			},

			/**
    * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
    *
    * @param {WordArray} data The data to unpad.
    *
    * @static
    *
    * @example
    *
    *     CryptoJS.pad.Pkcs7.unpad(wordArray);
    */
			unpad: function unpad(data) {
				// Get number of padding bytes from last byte
				var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

				// Remove padding
				data.sigBytes -= nPaddingBytes;
			}
		};

		/**
   * Abstract base block cipher template.
   *
   * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
   */
		var BlockCipher = C_lib.BlockCipher = Cipher.extend({
			/**
    * Configuration options.
    *
    * @property {Mode} mode The block mode to use. Default: CBC
    * @property {Padding} padding The padding strategy to use. Default: Pkcs7
    */
			cfg: Cipher.cfg.extend({
				mode: CBC,
				padding: Pkcs7
			}),

			reset: function reset() {
				// Reset cipher
				Cipher.reset.call(this);

				// Shortcuts
				var cfg = this.cfg;
				var iv = cfg.iv;
				var mode = cfg.mode;

				// Reset block mode
				if (this._xformMode == this._ENC_XFORM_MODE) {
					var modeCreator = mode.createEncryptor;
				} else /* if (this._xformMode == this._DEC_XFORM_MODE) */{
						var modeCreator = mode.createDecryptor;

						// Keep at least one block in the buffer for unpadding
						this._minBufferSize = 1;
					}
				this._mode = modeCreator.call(mode, this, iv && iv.words);
			},

			_doProcessBlock: function _doProcessBlock(words, offset) {
				this._mode.processBlock(words, offset);
			},

			_doFinalize: function _doFinalize() {
				// Shortcut
				var padding = this.cfg.padding;

				// Finalize
				if (this._xformMode == this._ENC_XFORM_MODE) {
					// Pad data
					padding.pad(this._data, this.blockSize);

					// Process final blocks
					var finalProcessedBlocks = this._process(!!'flush');
				} else /* if (this._xformMode == this._DEC_XFORM_MODE) */{
						// Process final blocks
						var finalProcessedBlocks = this._process(!!'flush');

						// Unpad data
						padding.unpad(finalProcessedBlocks);
					}

				return finalProcessedBlocks;
			},

			blockSize: 128 / 32
		});

		/**
   * A collection of cipher parameters.
   *
   * @property {WordArray} ciphertext The raw ciphertext.
   * @property {WordArray} key The key to this ciphertext.
   * @property {WordArray} iv The IV used in the ciphering operation.
   * @property {WordArray} salt The salt used with a key derivation function.
   * @property {Cipher} algorithm The cipher algorithm.
   * @property {Mode} mode The block mode used in the ciphering operation.
   * @property {Padding} padding The padding scheme used in the ciphering operation.
   * @property {number} blockSize The block size of the cipher.
   * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
   */
		var CipherParams = C_lib.CipherParams = Base.extend({
			/**
    * Initializes a newly created cipher params object.
    *
    * @param {Object} cipherParams An object with any of the possible cipher parameters.
    *
    * @example
    *
    *     var cipherParams = CryptoJS.lib.CipherParams.create({
    *         ciphertext: ciphertextWordArray,
    *         key: keyWordArray,
    *         iv: ivWordArray,
    *         salt: saltWordArray,
    *         algorithm: CryptoJS.algo.AES,
    *         mode: CryptoJS.mode.CBC,
    *         padding: CryptoJS.pad.PKCS7,
    *         blockSize: 4,
    *         formatter: CryptoJS.format.OpenSSL
    *     });
    */
			init: function init(cipherParams) {
				this.mixIn(cipherParams);
			},

			/**
    * Converts this cipher params object to a string.
    *
    * @param {Format} formatter (Optional) The formatting strategy to use.
    *
    * @return {string} The stringified cipher params.
    *
    * @throws Error If neither the formatter nor the default formatter is set.
    *
    * @example
    *
    *     var string = cipherParams + '';
    *     var string = cipherParams.toString();
    *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
    */
			toString: function toString(formatter) {
				return (formatter || this.formatter).stringify(this);
			}
		});

		/**
   * Format namespace.
   */
		var C_format = C.format = {};

		/**
   * OpenSSL formatting strategy.
   */
		var OpenSSLFormatter = C_format.OpenSSL = {
			/**
    * Converts a cipher params object to an OpenSSL-compatible string.
    *
    * @param {CipherParams} cipherParams The cipher params object.
    *
    * @return {string} The OpenSSL-compatible string.
    *
    * @static
    *
    * @example
    *
    *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
    */
			stringify: function stringify(cipherParams) {
				// Shortcuts
				var ciphertext = cipherParams.ciphertext;
				var salt = cipherParams.salt;

				// Format
				if (salt) {
					var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
				} else {
					var wordArray = ciphertext;
				}

				return wordArray.toString(Base64);
			},

			/**
    * Converts an OpenSSL-compatible string to a cipher params object.
    *
    * @param {string} openSSLStr The OpenSSL-compatible string.
    *
    * @return {CipherParams} The cipher params object.
    *
    * @static
    *
    * @example
    *
    *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
    */
			parse: function parse(openSSLStr) {
				// Parse base64
				var ciphertext = Base64.parse(openSSLStr);

				// Shortcut
				var ciphertextWords = ciphertext.words;

				// Test for salt
				if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
					// Extract salt
					var salt = WordArray.create(ciphertextWords.slice(2, 4));

					// Remove salt from ciphertext
					ciphertextWords.splice(0, 4);
					ciphertext.sigBytes -= 16;
				}

				return CipherParams.create({ ciphertext: ciphertext, salt: salt });
			}
		};

		/**
   * A cipher wrapper that returns ciphertext as a serializable cipher params object.
   */
		var SerializableCipher = C_lib.SerializableCipher = Base.extend({
			/**
    * Configuration options.
    *
    * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
    */
			cfg: Base.extend({
				format: OpenSSLFormatter
			}),

			/**
    * Encrypts a message.
    *
    * @param {Cipher} cipher The cipher algorithm to use.
    * @param {WordArray|string} message The message to encrypt.
    * @param {WordArray} key The key.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @return {CipherParams} A cipher params object.
    *
    * @static
    *
    * @example
    *
    *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
    *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
    *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
    */
			encrypt: function encrypt(cipher, message, key, cfg) {
				// Apply config defaults
				cfg = this.cfg.extend(cfg);

				// Encrypt
				var encryptor = cipher.createEncryptor(key, cfg);
				var ciphertext = encryptor.finalize(message);

				// Shortcut
				var cipherCfg = encryptor.cfg;

				// Create and return serializable cipher params
				return CipherParams.create({
					ciphertext: ciphertext,
					key: key,
					iv: cipherCfg.iv,
					algorithm: cipher,
					mode: cipherCfg.mode,
					padding: cipherCfg.padding,
					blockSize: cipher.blockSize,
					formatter: cfg.format
				});
			},

			/**
    * Decrypts serialized ciphertext.
    *
    * @param {Cipher} cipher The cipher algorithm to use.
    * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
    * @param {WordArray} key The key.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @return {WordArray} The plaintext.
    *
    * @static
    *
    * @example
    *
    *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
    *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
    */
			decrypt: function decrypt(cipher, ciphertext, key, cfg) {
				// Apply config defaults
				cfg = this.cfg.extend(cfg);

				// Convert string to CipherParams
				ciphertext = this._parse(ciphertext, cfg.format);

				// Decrypt
				var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

				return plaintext;
			},

			/**
    * Converts serialized ciphertext to CipherParams,
    * else assumed CipherParams already and returns ciphertext unchanged.
    *
    * @param {CipherParams|string} ciphertext The ciphertext.
    * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
    *
    * @return {CipherParams} The unserialized ciphertext.
    *
    * @static
    *
    * @example
    *
    *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
    */
			_parse: function _parse(ciphertext, format) {
				if (typeof ciphertext == 'string') {
					return format.parse(ciphertext, this);
				} else {
					return ciphertext;
				}
			}
		});

		/**
   * Key derivation function namespace.
   */
		var C_kdf = C.kdf = {};

		/**
   * OpenSSL key derivation function.
   */
		var OpenSSLKdf = C_kdf.OpenSSL = {
			/**
    * Derives a key and IV from a password.
    *
    * @param {string} password The password to derive from.
    * @param {number} keySize The size in words of the key to generate.
    * @param {number} ivSize The size in words of the IV to generate.
    * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
    *
    * @return {CipherParams} A cipher params object with the key, IV, and salt.
    *
    * @static
    *
    * @example
    *
    *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
    *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
    */
			execute: function execute(password, keySize, ivSize, salt) {
				// Generate random salt
				if (!salt) {
					salt = WordArray.random(64 / 8);
				}

				// Derive key and IV
				var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

				// Separate key and IV
				var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
				key.sigBytes = keySize * 4;

				// Return params
				return CipherParams.create({ key: key, iv: iv, salt: salt });
			}
		};

		/**
   * A serializable cipher wrapper that derives the key from a password,
   * and returns ciphertext as a serializable cipher params object.
   */
		var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
			/**
    * Configuration options.
    *
    * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
    */
			cfg: SerializableCipher.cfg.extend({
				kdf: OpenSSLKdf
			}),

			/**
    * Encrypts a message using a password.
    *
    * @param {Cipher} cipher The cipher algorithm to use.
    * @param {WordArray|string} message The message to encrypt.
    * @param {string} password The password.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @return {CipherParams} A cipher params object.
    *
    * @static
    *
    * @example
    *
    *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
    *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
    */
			encrypt: function encrypt(cipher, message, password, cfg) {
				// Apply config defaults
				cfg = this.cfg.extend(cfg);

				// Derive key and other params
				var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

				// Add IV to config
				cfg.iv = derivedParams.iv;

				// Encrypt
				var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

				// Mix in derived params
				ciphertext.mixIn(derivedParams);

				return ciphertext;
			},

			/**
    * Decrypts serialized ciphertext using a password.
    *
    * @param {Cipher} cipher The cipher algorithm to use.
    * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
    * @param {string} password The password.
    * @param {Object} cfg (Optional) The configuration options to use for this operation.
    *
    * @return {WordArray} The plaintext.
    *
    * @static
    *
    * @example
    *
    *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
    *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
    */
			decrypt: function decrypt(cipher, ciphertext, password, cfg) {
				// Apply config defaults
				cfg = this.cfg.extend(cfg);

				// Convert string to CipherParams
				ciphertext = this._parse(ciphertext, cfg.format);

				// Derive key and other params
				var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

				// Add IV to config
				cfg.iv = derivedParams.iv;

				// Decrypt
				var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

				return plaintext;
			}
		});
	}();
});

},{"./core":17}],17:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory();
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	} else {
		// Global (browser)
		root.CryptoJS = factory();
	}
})(undefined, function () {

	/**
  * CryptoJS core components.
  */
	var CryptoJS = CryptoJS || function (Math, undefined) {
		/*
   * Local polyfil of Object.create
   */
		var create = Object.create || function () {
			function F() {};

			return function (obj) {
				var subtype;

				F.prototype = obj;

				subtype = new F();

				F.prototype = null;

				return subtype;
			};
		}();

		/**
   * CryptoJS namespace.
   */
		var C = {};

		/**
   * Library namespace.
   */
		var C_lib = C.lib = {};

		/**
   * Base object for prototypal inheritance.
   */
		var Base = C_lib.Base = function () {

			return {
				/**
     * Creates a new object that inherits from this object.
     *
     * @param {Object} overrides Properties to copy into the new object.
     *
     * @return {Object} The new object.
     *
     * @static
     *
     * @example
     *
     *     var MyType = CryptoJS.lib.Base.extend({
     *         field: 'value',
     *
     *         method: function () {
     *         }
     *     });
     */
				extend: function extend(overrides) {
					// Spawn
					var subtype = create(this);

					// Augment
					if (overrides) {
						subtype.mixIn(overrides);
					}

					// Create default initializer
					if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
						subtype.init = function () {
							subtype.$super.init.apply(this, arguments);
						};
					}

					// Initializer's prototype is the subtype object
					subtype.init.prototype = subtype;

					// Reference supertype
					subtype.$super = this;

					return subtype;
				},

				/**
     * Extends this object and runs the init method.
     * Arguments to create() will be passed to init().
     *
     * @return {Object} The new object.
     *
     * @static
     *
     * @example
     *
     *     var instance = MyType.create();
     */
				create: function create() {
					var instance = this.extend();
					instance.init.apply(instance, arguments);

					return instance;
				},

				/**
     * Initializes a newly created object.
     * Override this method to add some logic when your objects are created.
     *
     * @example
     *
     *     var MyType = CryptoJS.lib.Base.extend({
     *         init: function () {
     *             // ...
     *         }
     *     });
     */
				init: function init() {},

				/**
     * Copies properties into this object.
     *
     * @param {Object} properties The properties to mix in.
     *
     * @example
     *
     *     MyType.mixIn({
     *         field: 'value'
     *     });
     */
				mixIn: function mixIn(properties) {
					for (var propertyName in properties) {
						if (properties.hasOwnProperty(propertyName)) {
							this[propertyName] = properties[propertyName];
						}
					}

					// IE won't copy toString using the loop above
					if (properties.hasOwnProperty('toString')) {
						this.toString = properties.toString;
					}
				},

				/**
     * Creates a copy of this object.
     *
     * @return {Object} The clone.
     *
     * @example
     *
     *     var clone = instance.clone();
     */
				clone: function clone() {
					return this.init.prototype.extend(this);
				}
			};
		}();

		/**
   * An array of 32-bit words.
   *
   * @property {Array} words The array of 32-bit words.
   * @property {number} sigBytes The number of significant bytes in this word array.
   */
		var WordArray = C_lib.WordArray = Base.extend({
			/**
    * Initializes a newly created word array.
    *
    * @param {Array} words (Optional) An array of 32-bit words.
    * @param {number} sigBytes (Optional) The number of significant bytes in the words.
    *
    * @example
    *
    *     var wordArray = CryptoJS.lib.WordArray.create();
    *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
    *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
    */
			init: function init(words, sigBytes) {
				words = this.words = words || [];

				if (sigBytes != undefined) {
					this.sigBytes = sigBytes;
				} else {
					this.sigBytes = words.length * 4;
				}
			},

			/**
    * Converts this word array to a string.
    *
    * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
    *
    * @return {string} The stringified word array.
    *
    * @example
    *
    *     var string = wordArray + '';
    *     var string = wordArray.toString();
    *     var string = wordArray.toString(CryptoJS.enc.Utf8);
    */
			toString: function toString(encoder) {
				return (encoder || Hex).stringify(this);
			},

			/**
    * Concatenates a word array to this word array.
    *
    * @param {WordArray} wordArray The word array to append.
    *
    * @return {WordArray} This word array.
    *
    * @example
    *
    *     wordArray1.concat(wordArray2);
    */
			concat: function concat(wordArray) {
				// Shortcuts
				var thisWords = this.words;
				var thatWords = wordArray.words;
				var thisSigBytes = this.sigBytes;
				var thatSigBytes = wordArray.sigBytes;

				// Clamp excess bits
				this.clamp();

				// Concat
				if (thisSigBytes % 4) {
					// Copy one byte at a time
					for (var i = 0; i < thatSigBytes; i++) {
						var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
						thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
					}
				} else {
					// Copy one word at a time
					for (var i = 0; i < thatSigBytes; i += 4) {
						thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
					}
				}
				this.sigBytes += thatSigBytes;

				// Chainable
				return this;
			},

			/**
    * Removes insignificant bits.
    *
    * @example
    *
    *     wordArray.clamp();
    */
			clamp: function clamp() {
				// Shortcuts
				var words = this.words;
				var sigBytes = this.sigBytes;

				// Clamp
				words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
				words.length = Math.ceil(sigBytes / 4);
			},

			/**
    * Creates a copy of this word array.
    *
    * @return {WordArray} The clone.
    *
    * @example
    *
    *     var clone = wordArray.clone();
    */
			clone: function clone() {
				var clone = Base.clone.call(this);
				clone.words = this.words.slice(0);

				return clone;
			},

			/**
    * Creates a word array filled with random bytes.
    *
    * @param {number} nBytes The number of random bytes to generate.
    *
    * @return {WordArray} The random word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.lib.WordArray.random(16);
    */
			random: function random(nBytes) {
				var words = [];

				var r = function r(m_w) {
					var m_w = m_w;
					var m_z = 0x3ade68b1;
					var mask = 0xffffffff;

					return function () {
						m_z = 0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10) & mask;
						m_w = 0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10) & mask;
						var result = (m_z << 0x10) + m_w & mask;
						result /= 0x100000000;
						result += 0.5;
						return result * (Math.random() > .5 ? 1 : -1);
					};
				};

				for (var i = 0, rcache; i < nBytes; i += 4) {
					var _r = r((rcache || Math.random()) * 0x100000000);

					rcache = _r() * 0x3ade67b7;
					words.push(_r() * 0x100000000 | 0);
				}

				return new WordArray.init(words, nBytes);
			}
		});

		/**
   * Encoder namespace.
   */
		var C_enc = C.enc = {};

		/**
   * Hex encoding strategy.
   */
		var Hex = C_enc.Hex = {
			/**
    * Converts a word array to a hex string.
    *
    * @param {WordArray} wordArray The word array.
    *
    * @return {string} The hex string.
    *
    * @static
    *
    * @example
    *
    *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
    */
			stringify: function stringify(wordArray) {
				// Shortcuts
				var words = wordArray.words;
				var sigBytes = wordArray.sigBytes;

				// Convert
				var hexChars = [];
				for (var i = 0; i < sigBytes; i++) {
					var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
					hexChars.push((bite >>> 4).toString(16));
					hexChars.push((bite & 0x0f).toString(16));
				}

				return hexChars.join('');
			},

			/**
    * Converts a hex string to a word array.
    *
    * @param {string} hexStr The hex string.
    *
    * @return {WordArray} The word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
    */
			parse: function parse(hexStr) {
				// Shortcut
				var hexStrLength = hexStr.length;

				// Convert
				var words = [];
				for (var i = 0; i < hexStrLength; i += 2) {
					words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
				}

				return new WordArray.init(words, hexStrLength / 2);
			}
		};

		/**
   * Latin1 encoding strategy.
   */
		var Latin1 = C_enc.Latin1 = {
			/**
    * Converts a word array to a Latin1 string.
    *
    * @param {WordArray} wordArray The word array.
    *
    * @return {string} The Latin1 string.
    *
    * @static
    *
    * @example
    *
    *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
    */
			stringify: function stringify(wordArray) {
				// Shortcuts
				var words = wordArray.words;
				var sigBytes = wordArray.sigBytes;

				// Convert
				var latin1Chars = [];
				for (var i = 0; i < sigBytes; i++) {
					var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
					latin1Chars.push(String.fromCharCode(bite));
				}

				return latin1Chars.join('');
			},

			/**
    * Converts a Latin1 string to a word array.
    *
    * @param {string} latin1Str The Latin1 string.
    *
    * @return {WordArray} The word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
    */
			parse: function parse(latin1Str) {
				// Shortcut
				var latin1StrLength = latin1Str.length;

				// Convert
				var words = [];
				for (var i = 0; i < latin1StrLength; i++) {
					words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
				}

				return new WordArray.init(words, latin1StrLength);
			}
		};

		/**
   * UTF-8 encoding strategy.
   */
		var Utf8 = C_enc.Utf8 = {
			/**
    * Converts a word array to a UTF-8 string.
    *
    * @param {WordArray} wordArray The word array.
    *
    * @return {string} The UTF-8 string.
    *
    * @static
    *
    * @example
    *
    *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
    */
			stringify: function stringify(wordArray) {
				try {
					return decodeURIComponent(escape(Latin1.stringify(wordArray)));
				} catch (e) {
					throw new Error('Malformed UTF-8 data');
				}
			},

			/**
    * Converts a UTF-8 string to a word array.
    *
    * @param {string} utf8Str The UTF-8 string.
    *
    * @return {WordArray} The word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
    */
			parse: function parse(utf8Str) {
				return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
			}
		};

		/**
   * Abstract buffered block algorithm template.
   *
   * The property blockSize must be implemented in a concrete subtype.
   *
   * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
   */
		var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
			/**
    * Resets this block algorithm's data buffer to its initial state.
    *
    * @example
    *
    *     bufferedBlockAlgorithm.reset();
    */
			reset: function reset() {
				// Initial values
				this._data = new WordArray.init();
				this._nDataBytes = 0;
			},

			/**
    * Adds new data to this block algorithm's buffer.
    *
    * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
    *
    * @example
    *
    *     bufferedBlockAlgorithm._append('data');
    *     bufferedBlockAlgorithm._append(wordArray);
    */
			_append: function _append(data) {
				// Convert string to WordArray, else assume WordArray already
				if (typeof data == 'string') {
					data = Utf8.parse(data);
				}

				// Append
				this._data.concat(data);
				this._nDataBytes += data.sigBytes;
			},

			/**
    * Processes available data blocks.
    *
    * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
    *
    * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
    *
    * @return {WordArray} The processed data.
    *
    * @example
    *
    *     var processedData = bufferedBlockAlgorithm._process();
    *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
    */
			_process: function _process(doFlush) {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;
				var dataSigBytes = data.sigBytes;
				var blockSize = this.blockSize;
				var blockSizeBytes = blockSize * 4;

				// Count blocks ready
				var nBlocksReady = dataSigBytes / blockSizeBytes;
				if (doFlush) {
					// Round up to include partial blocks
					nBlocksReady = Math.ceil(nBlocksReady);
				} else {
					// Round down to include only full blocks,
					// less the number of blocks that must remain in the buffer
					nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
				}

				// Count words ready
				var nWordsReady = nBlocksReady * blockSize;

				// Count bytes ready
				var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

				// Process blocks
				if (nWordsReady) {
					for (var offset = 0; offset < nWordsReady; offset += blockSize) {
						// Perform concrete-algorithm logic
						this._doProcessBlock(dataWords, offset);
					}

					// Remove processed words
					var processedWords = dataWords.splice(0, nWordsReady);
					data.sigBytes -= nBytesReady;
				}

				// Return processed words
				return new WordArray.init(processedWords, nBytesReady);
			},

			/**
    * Creates a copy of this object.
    *
    * @return {Object} The clone.
    *
    * @example
    *
    *     var clone = bufferedBlockAlgorithm.clone();
    */
			clone: function clone() {
				var clone = Base.clone.call(this);
				clone._data = this._data.clone();

				return clone;
			},

			_minBufferSize: 0
		});

		/**
   * Abstract hasher template.
   *
   * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
   */
		var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
			/**
    * Configuration options.
    */
			cfg: Base.extend(),

			/**
    * Initializes a newly created hasher.
    *
    * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
    *
    * @example
    *
    *     var hasher = CryptoJS.algo.SHA256.create();
    */
			init: function init(cfg) {
				// Apply config defaults
				this.cfg = this.cfg.extend(cfg);

				// Set initial values
				this.reset();
			},

			/**
    * Resets this hasher to its initial state.
    *
    * @example
    *
    *     hasher.reset();
    */
			reset: function reset() {
				// Reset data buffer
				BufferedBlockAlgorithm.reset.call(this);

				// Perform concrete-hasher logic
				this._doReset();
			},

			/**
    * Updates this hasher with a message.
    *
    * @param {WordArray|string} messageUpdate The message to append.
    *
    * @return {Hasher} This hasher.
    *
    * @example
    *
    *     hasher.update('message');
    *     hasher.update(wordArray);
    */
			update: function update(messageUpdate) {
				// Append
				this._append(messageUpdate);

				// Update the hash
				this._process();

				// Chainable
				return this;
			},

			/**
    * Finalizes the hash computation.
    * Note that the finalize operation is effectively a destructive, read-once operation.
    *
    * @param {WordArray|string} messageUpdate (Optional) A final message update.
    *
    * @return {WordArray} The hash.
    *
    * @example
    *
    *     var hash = hasher.finalize();
    *     var hash = hasher.finalize('message');
    *     var hash = hasher.finalize(wordArray);
    */
			finalize: function finalize(messageUpdate) {
				// Final message update
				if (messageUpdate) {
					this._append(messageUpdate);
				}

				// Perform concrete-hasher logic
				var hash = this._doFinalize();

				return hash;
			},

			blockSize: 512 / 32,

			/**
    * Creates a shortcut function to a hasher's object interface.
    *
    * @param {Hasher} hasher The hasher to create a helper for.
    *
    * @return {Function} The shortcut function.
    *
    * @static
    *
    * @example
    *
    *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
    */
			_createHelper: function _createHelper(hasher) {
				return function (message, cfg) {
					return new hasher.init(cfg).finalize(message);
				};
			},

			/**
    * Creates a shortcut function to the HMAC's object interface.
    *
    * @param {Hasher} hasher The hasher to use in this HMAC helper.
    *
    * @return {Function} The shortcut function.
    *
    * @static
    *
    * @example
    *
    *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
    */
			_createHmacHelper: function _createHmacHelper(hasher) {
				return function (message, key) {
					return new C_algo.HMAC.init(hasher, key).finalize(message);
				};
			}
		});

		/**
   * Algorithm namespace.
   */
		var C_algo = C.algo = {};

		return C;
	}(Math);

	return CryptoJS;
});

},{}],18:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var C_enc = C.enc;

		/**
   * Base64 encoding strategy.
   */
		var Base64 = C_enc.Base64 = {
			/**
    * Converts a word array to a Base64 string.
    *
    * @param {WordArray} wordArray The word array.
    *
    * @return {string} The Base64 string.
    *
    * @static
    *
    * @example
    *
    *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
    */
			stringify: function stringify(wordArray) {
				// Shortcuts
				var words = wordArray.words;
				var sigBytes = wordArray.sigBytes;
				var map = this._map;

				// Clamp excess bits
				wordArray.clamp();

				// Convert
				var base64Chars = [];
				for (var i = 0; i < sigBytes; i += 3) {
					var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
					var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
					var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;

					var triplet = byte1 << 16 | byte2 << 8 | byte3;

					for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
						base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
					}
				}

				// Add padding
				var paddingChar = map.charAt(64);
				if (paddingChar) {
					while (base64Chars.length % 4) {
						base64Chars.push(paddingChar);
					}
				}

				return base64Chars.join('');
			},

			/**
    * Converts a Base64 string to a word array.
    *
    * @param {string} base64Str The Base64 string.
    *
    * @return {WordArray} The word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
    */
			parse: function parse(base64Str) {
				// Shortcuts
				var base64StrLength = base64Str.length;
				var map = this._map;
				var reverseMap = this._reverseMap;

				if (!reverseMap) {
					reverseMap = this._reverseMap = [];
					for (var j = 0; j < map.length; j++) {
						reverseMap[map.charCodeAt(j)] = j;
					}
				}

				// Ignore padding
				var paddingChar = map.charAt(64);
				if (paddingChar) {
					var paddingIndex = base64Str.indexOf(paddingChar);
					if (paddingIndex !== -1) {
						base64StrLength = paddingIndex;
					}
				}

				// Convert
				return parseLoop(base64Str, base64StrLength, reverseMap);
			},

			_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
		};

		function parseLoop(base64Str, base64StrLength, reverseMap) {
			var words = [];
			var nBytes = 0;
			for (var i = 0; i < base64StrLength; i++) {
				if (i % 4) {
					var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
					var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
					words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;
					nBytes++;
				}
			}
			return WordArray.create(words, nBytes);
		}
	})();

	return CryptoJS.enc.Base64;
});

},{"./core":17}],19:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var C_enc = C.enc;

		/**
   * UTF-16 BE encoding strategy.
   */
		var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
			/**
    * Converts a word array to a UTF-16 BE string.
    *
    * @param {WordArray} wordArray The word array.
    *
    * @return {string} The UTF-16 BE string.
    *
    * @static
    *
    * @example
    *
    *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
    */
			stringify: function stringify(wordArray) {
				// Shortcuts
				var words = wordArray.words;
				var sigBytes = wordArray.sigBytes;

				// Convert
				var utf16Chars = [];
				for (var i = 0; i < sigBytes; i += 2) {
					var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 0xffff;
					utf16Chars.push(String.fromCharCode(codePoint));
				}

				return utf16Chars.join('');
			},

			/**
    * Converts a UTF-16 BE string to a word array.
    *
    * @param {string} utf16Str The UTF-16 BE string.
    *
    * @return {WordArray} The word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
    */
			parse: function parse(utf16Str) {
				// Shortcut
				var utf16StrLength = utf16Str.length;

				// Convert
				var words = [];
				for (var i = 0; i < utf16StrLength; i++) {
					words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
				}

				return WordArray.create(words, utf16StrLength * 2);
			}
		};

		/**
   * UTF-16 LE encoding strategy.
   */
		C_enc.Utf16LE = {
			/**
    * Converts a word array to a UTF-16 LE string.
    *
    * @param {WordArray} wordArray The word array.
    *
    * @return {string} The UTF-16 LE string.
    *
    * @static
    *
    * @example
    *
    *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
    */
			stringify: function stringify(wordArray) {
				// Shortcuts
				var words = wordArray.words;
				var sigBytes = wordArray.sigBytes;

				// Convert
				var utf16Chars = [];
				for (var i = 0; i < sigBytes; i += 2) {
					var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 0xffff);
					utf16Chars.push(String.fromCharCode(codePoint));
				}

				return utf16Chars.join('');
			},

			/**
    * Converts a UTF-16 LE string to a word array.
    *
    * @param {string} utf16Str The UTF-16 LE string.
    *
    * @return {WordArray} The word array.
    *
    * @static
    *
    * @example
    *
    *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
    */
			parse: function parse(utf16Str) {
				// Shortcut
				var utf16StrLength = utf16Str.length;

				// Convert
				var words = [];
				for (var i = 0; i < utf16StrLength; i++) {
					words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
				}

				return WordArray.create(words, utf16StrLength * 2);
			}
		};

		function swapEndian(word) {
			return word << 8 & 0xff00ff00 | word >>> 8 & 0x00ff00ff;
		}
	})();

	return CryptoJS.enc.Utf16;
});

},{"./core":17}],20:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha1", "./hmac"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var Base = C_lib.Base;
		var WordArray = C_lib.WordArray;
		var C_algo = C.algo;
		var MD5 = C_algo.MD5;

		/**
   * This key derivation function is meant to conform with EVP_BytesToKey.
   * www.openssl.org/docs/crypto/EVP_BytesToKey.html
   */
		var EvpKDF = C_algo.EvpKDF = Base.extend({
			/**
    * Configuration options.
    *
    * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
    * @property {Hasher} hasher The hash algorithm to use. Default: MD5
    * @property {number} iterations The number of iterations to perform. Default: 1
    */
			cfg: Base.extend({
				keySize: 128 / 32,
				hasher: MD5,
				iterations: 1
			}),

			/**
    * Initializes a newly created key derivation function.
    *
    * @param {Object} cfg (Optional) The configuration options to use for the derivation.
    *
    * @example
    *
    *     var kdf = CryptoJS.algo.EvpKDF.create();
    *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
    *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
    */
			init: function init(cfg) {
				this.cfg = this.cfg.extend(cfg);
			},

			/**
    * Derives a key from a password.
    *
    * @param {WordArray|string} password The password.
    * @param {WordArray|string} salt A salt.
    *
    * @return {WordArray} The derived key.
    *
    * @example
    *
    *     var key = kdf.compute(password, salt);
    */
			compute: function compute(password, salt) {
				// Shortcut
				var cfg = this.cfg;

				// Init hasher
				var hasher = cfg.hasher.create();

				// Initial values
				var derivedKey = WordArray.create();

				// Shortcuts
				var derivedKeyWords = derivedKey.words;
				var keySize = cfg.keySize;
				var iterations = cfg.iterations;

				// Generate key
				while (derivedKeyWords.length < keySize) {
					if (block) {
						hasher.update(block);
					}
					var block = hasher.update(password).finalize(salt);
					hasher.reset();

					// Iterations
					for (var i = 1; i < iterations; i++) {
						block = hasher.finalize(block);
						hasher.reset();
					}

					derivedKey.concat(block);
				}
				derivedKey.sigBytes = keySize * 4;

				return derivedKey;
			}
		});

		/**
   * Derives a key from a password.
   *
   * @param {WordArray|string} password The password.
   * @param {WordArray|string} salt A salt.
   * @param {Object} cfg (Optional) The configuration options to use for this computation.
   *
   * @return {WordArray} The derived key.
   *
   * @static
   *
   * @example
   *
   *     var key = CryptoJS.EvpKDF(password, salt);
   *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
   *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
   */
		C.EvpKDF = function (password, salt, cfg) {
			return EvpKDF.create(cfg).compute(password, salt);
		};
	})();

	return CryptoJS.EvpKDF;
});

},{"./core":17,"./hmac":22,"./sha1":41}],21:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function (undefined) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var CipherParams = C_lib.CipherParams;
		var C_enc = C.enc;
		var Hex = C_enc.Hex;
		var C_format = C.format;

		var HexFormatter = C_format.Hex = {
			/**
    * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
    *
    * @param {CipherParams} cipherParams The cipher params object.
    *
    * @return {string} The hexadecimally encoded string.
    *
    * @static
    *
    * @example
    *
    *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
    */
			stringify: function stringify(cipherParams) {
				return cipherParams.ciphertext.toString(Hex);
			},

			/**
    * Converts a hexadecimally encoded ciphertext string to a cipher params object.
    *
    * @param {string} input The hexadecimally encoded string.
    *
    * @return {CipherParams} The cipher params object.
    *
    * @static
    *
    * @example
    *
    *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
    */
			parse: function parse(input) {
				var ciphertext = Hex.parse(input);
				return CipherParams.create({ ciphertext: ciphertext });
			}
		};
	})();

	return CryptoJS.format.Hex;
});

},{"./cipher-core":16,"./core":17}],22:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var Base = C_lib.Base;
		var C_enc = C.enc;
		var Utf8 = C_enc.Utf8;
		var C_algo = C.algo;

		/**
   * HMAC algorithm.
   */
		var HMAC = C_algo.HMAC = Base.extend({
			/**
    * Initializes a newly created HMAC.
    *
    * @param {Hasher} hasher The hash algorithm to use.
    * @param {WordArray|string} key The secret key.
    *
    * @example
    *
    *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
    */
			init: function init(hasher, key) {
				// Init hasher
				hasher = this._hasher = new hasher.init();

				// Convert string to WordArray, else assume WordArray already
				if (typeof key == 'string') {
					key = Utf8.parse(key);
				}

				// Shortcuts
				var hasherBlockSize = hasher.blockSize;
				var hasherBlockSizeBytes = hasherBlockSize * 4;

				// Allow arbitrary length keys
				if (key.sigBytes > hasherBlockSizeBytes) {
					key = hasher.finalize(key);
				}

				// Clamp excess bits
				key.clamp();

				// Clone key for inner and outer pads
				var oKey = this._oKey = key.clone();
				var iKey = this._iKey = key.clone();

				// Shortcuts
				var oKeyWords = oKey.words;
				var iKeyWords = iKey.words;

				// XOR keys with pad constants
				for (var i = 0; i < hasherBlockSize; i++) {
					oKeyWords[i] ^= 0x5c5c5c5c;
					iKeyWords[i] ^= 0x36363636;
				}
				oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

				// Set initial values
				this.reset();
			},

			/**
    * Resets this HMAC to its initial state.
    *
    * @example
    *
    *     hmacHasher.reset();
    */
			reset: function reset() {
				// Shortcut
				var hasher = this._hasher;

				// Reset
				hasher.reset();
				hasher.update(this._iKey);
			},

			/**
    * Updates this HMAC with a message.
    *
    * @param {WordArray|string} messageUpdate The message to append.
    *
    * @return {HMAC} This HMAC instance.
    *
    * @example
    *
    *     hmacHasher.update('message');
    *     hmacHasher.update(wordArray);
    */
			update: function update(messageUpdate) {
				this._hasher.update(messageUpdate);

				// Chainable
				return this;
			},

			/**
    * Finalizes the HMAC computation.
    * Note that the finalize operation is effectively a destructive, read-once operation.
    *
    * @param {WordArray|string} messageUpdate (Optional) A final message update.
    *
    * @return {WordArray} The HMAC.
    *
    * @example
    *
    *     var hmac = hmacHasher.finalize();
    *     var hmac = hmacHasher.finalize('message');
    *     var hmac = hmacHasher.finalize(wordArray);
    */
			finalize: function finalize(messageUpdate) {
				// Shortcut
				var hasher = this._hasher;

				// Compute HMAC
				var innerHash = hasher.finalize(messageUpdate);
				hasher.reset();
				var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

				return hmac;
			}
		});
	})();
});

},{"./core":17}],23:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./x64-core"), require("./lib-typedarrays"), require("./enc-utf16"), require("./enc-base64"), require("./md5"), require("./sha1"), require("./sha256"), require("./sha224"), require("./sha512"), require("./sha384"), require("./sha3"), require("./ripemd160"), require("./hmac"), require("./pbkdf2"), require("./evpkdf"), require("./cipher-core"), require("./mode-cfb"), require("./mode-ctr"), require("./mode-ctr-gladman"), require("./mode-ofb"), require("./mode-ecb"), require("./pad-ansix923"), require("./pad-iso10126"), require("./pad-iso97971"), require("./pad-zeropadding"), require("./pad-nopadding"), require("./format-hex"), require("./aes"), require("./tripledes"), require("./rc4"), require("./rabbit"), require("./rabbit-legacy"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy"], factory);
	} else {
		// Global (browser)
		root.CryptoJS = factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	return CryptoJS;
});

},{"./aes":15,"./cipher-core":16,"./core":17,"./enc-base64":18,"./enc-utf16":19,"./evpkdf":20,"./format-hex":21,"./hmac":22,"./lib-typedarrays":24,"./md5":25,"./mode-cfb":26,"./mode-ctr":28,"./mode-ctr-gladman":27,"./mode-ecb":29,"./mode-ofb":30,"./pad-ansix923":31,"./pad-iso10126":32,"./pad-iso97971":33,"./pad-nopadding":34,"./pad-zeropadding":35,"./pbkdf2":36,"./rabbit":38,"./rabbit-legacy":37,"./rc4":39,"./ripemd160":40,"./sha1":41,"./sha224":42,"./sha256":43,"./sha3":44,"./sha384":45,"./sha512":46,"./tripledes":47,"./x64-core":48}],24:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Check if typed arrays are supported
		if (typeof ArrayBuffer != 'function') {
			return;
		}

		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;

		// Reference original init
		var superInit = WordArray.init;

		// Augment WordArray.init to handle typed arrays
		var subInit = WordArray.init = function (typedArray) {
			// Convert buffers to uint8
			if (typedArray instanceof ArrayBuffer) {
				typedArray = new Uint8Array(typedArray);
			}

			// Convert other array views to uint8
			if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
				typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
			}

			// Handle Uint8Array
			if (typedArray instanceof Uint8Array) {
				// Shortcut
				var typedArrayByteLength = typedArray.byteLength;

				// Extract bytes
				var words = [];
				for (var i = 0; i < typedArrayByteLength; i++) {
					words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
				}

				// Initialize this word array
				superInit.call(this, words, typedArrayByteLength);
			} else {
				// Else call normal init
				superInit.apply(this, arguments);
			}
		};

		subInit.prototype = WordArray;
	})();

	return CryptoJS.lib.WordArray;
});

},{"./core":17}],25:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function (Math) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var Hasher = C_lib.Hasher;
		var C_algo = C.algo;

		// Constants table
		var T = [];

		// Compute constants
		(function () {
			for (var i = 0; i < 64; i++) {
				T[i] = Math.abs(Math.sin(i + 1)) * 0x100000000 | 0;
			}
		})();

		/**
   * MD5 hash algorithm.
   */
		var MD5 = C_algo.MD5 = Hasher.extend({
			_doReset: function _doReset() {
				this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Swap endian
				for (var i = 0; i < 16; i++) {
					// Shortcuts
					var offset_i = offset + i;
					var M_offset_i = M[offset_i];

					M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
				}

				// Shortcuts
				var H = this._hash.words;

				var M_offset_0 = M[offset + 0];
				var M_offset_1 = M[offset + 1];
				var M_offset_2 = M[offset + 2];
				var M_offset_3 = M[offset + 3];
				var M_offset_4 = M[offset + 4];
				var M_offset_5 = M[offset + 5];
				var M_offset_6 = M[offset + 6];
				var M_offset_7 = M[offset + 7];
				var M_offset_8 = M[offset + 8];
				var M_offset_9 = M[offset + 9];
				var M_offset_10 = M[offset + 10];
				var M_offset_11 = M[offset + 11];
				var M_offset_12 = M[offset + 12];
				var M_offset_13 = M[offset + 13];
				var M_offset_14 = M[offset + 14];
				var M_offset_15 = M[offset + 15];

				// Working varialbes
				var a = H[0];
				var b = H[1];
				var c = H[2];
				var d = H[3];

				// Computation
				a = FF(a, b, c, d, M_offset_0, 7, T[0]);
				d = FF(d, a, b, c, M_offset_1, 12, T[1]);
				c = FF(c, d, a, b, M_offset_2, 17, T[2]);
				b = FF(b, c, d, a, M_offset_3, 22, T[3]);
				a = FF(a, b, c, d, M_offset_4, 7, T[4]);
				d = FF(d, a, b, c, M_offset_5, 12, T[5]);
				c = FF(c, d, a, b, M_offset_6, 17, T[6]);
				b = FF(b, c, d, a, M_offset_7, 22, T[7]);
				a = FF(a, b, c, d, M_offset_8, 7, T[8]);
				d = FF(d, a, b, c, M_offset_9, 12, T[9]);
				c = FF(c, d, a, b, M_offset_10, 17, T[10]);
				b = FF(b, c, d, a, M_offset_11, 22, T[11]);
				a = FF(a, b, c, d, M_offset_12, 7, T[12]);
				d = FF(d, a, b, c, M_offset_13, 12, T[13]);
				c = FF(c, d, a, b, M_offset_14, 17, T[14]);
				b = FF(b, c, d, a, M_offset_15, 22, T[15]);

				a = GG(a, b, c, d, M_offset_1, 5, T[16]);
				d = GG(d, a, b, c, M_offset_6, 9, T[17]);
				c = GG(c, d, a, b, M_offset_11, 14, T[18]);
				b = GG(b, c, d, a, M_offset_0, 20, T[19]);
				a = GG(a, b, c, d, M_offset_5, 5, T[20]);
				d = GG(d, a, b, c, M_offset_10, 9, T[21]);
				c = GG(c, d, a, b, M_offset_15, 14, T[22]);
				b = GG(b, c, d, a, M_offset_4, 20, T[23]);
				a = GG(a, b, c, d, M_offset_9, 5, T[24]);
				d = GG(d, a, b, c, M_offset_14, 9, T[25]);
				c = GG(c, d, a, b, M_offset_3, 14, T[26]);
				b = GG(b, c, d, a, M_offset_8, 20, T[27]);
				a = GG(a, b, c, d, M_offset_13, 5, T[28]);
				d = GG(d, a, b, c, M_offset_2, 9, T[29]);
				c = GG(c, d, a, b, M_offset_7, 14, T[30]);
				b = GG(b, c, d, a, M_offset_12, 20, T[31]);

				a = HH(a, b, c, d, M_offset_5, 4, T[32]);
				d = HH(d, a, b, c, M_offset_8, 11, T[33]);
				c = HH(c, d, a, b, M_offset_11, 16, T[34]);
				b = HH(b, c, d, a, M_offset_14, 23, T[35]);
				a = HH(a, b, c, d, M_offset_1, 4, T[36]);
				d = HH(d, a, b, c, M_offset_4, 11, T[37]);
				c = HH(c, d, a, b, M_offset_7, 16, T[38]);
				b = HH(b, c, d, a, M_offset_10, 23, T[39]);
				a = HH(a, b, c, d, M_offset_13, 4, T[40]);
				d = HH(d, a, b, c, M_offset_0, 11, T[41]);
				c = HH(c, d, a, b, M_offset_3, 16, T[42]);
				b = HH(b, c, d, a, M_offset_6, 23, T[43]);
				a = HH(a, b, c, d, M_offset_9, 4, T[44]);
				d = HH(d, a, b, c, M_offset_12, 11, T[45]);
				c = HH(c, d, a, b, M_offset_15, 16, T[46]);
				b = HH(b, c, d, a, M_offset_2, 23, T[47]);

				a = II(a, b, c, d, M_offset_0, 6, T[48]);
				d = II(d, a, b, c, M_offset_7, 10, T[49]);
				c = II(c, d, a, b, M_offset_14, 15, T[50]);
				b = II(b, c, d, a, M_offset_5, 21, T[51]);
				a = II(a, b, c, d, M_offset_12, 6, T[52]);
				d = II(d, a, b, c, M_offset_3, 10, T[53]);
				c = II(c, d, a, b, M_offset_10, 15, T[54]);
				b = II(b, c, d, a, M_offset_1, 21, T[55]);
				a = II(a, b, c, d, M_offset_8, 6, T[56]);
				d = II(d, a, b, c, M_offset_15, 10, T[57]);
				c = II(c, d, a, b, M_offset_6, 15, T[58]);
				b = II(b, c, d, a, M_offset_13, 21, T[59]);
				a = II(a, b, c, d, M_offset_4, 6, T[60]);
				d = II(d, a, b, c, M_offset_11, 10, T[61]);
				c = II(c, d, a, b, M_offset_2, 15, T[62]);
				b = II(b, c, d, a, M_offset_9, 21, T[63]);

				// Intermediate hash value
				H[0] = H[0] + a | 0;
				H[1] = H[1] + b | 0;
				H[2] = H[2] + c | 0;
				H[3] = H[3] + d | 0;
			},

			_doFinalize: function _doFinalize() {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;

				var nBitsTotal = this._nDataBytes * 8;
				var nBitsLeft = data.sigBytes * 8;

				// Add padding
				dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;

				var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
				var nBitsTotalL = nBitsTotal;
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 0x00ff00ff | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 0xff00ff00;
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 0x00ff00ff | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 0xff00ff00;

				data.sigBytes = (dataWords.length + 1) * 4;

				// Hash final blocks
				this._process();

				// Shortcuts
				var hash = this._hash;
				var H = hash.words;

				// Swap endian
				for (var i = 0; i < 4; i++) {
					// Shortcut
					var H_i = H[i];

					H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
				}

				// Return final computed hash
				return hash;
			},

			clone: function clone() {
				var clone = Hasher.clone.call(this);
				clone._hash = this._hash.clone();

				return clone;
			}
		});

		function FF(a, b, c, d, x, s, t) {
			var n = a + (b & c | ~b & d) + x + t;
			return (n << s | n >>> 32 - s) + b;
		}

		function GG(a, b, c, d, x, s, t) {
			var n = a + (b & d | c & ~d) + x + t;
			return (n << s | n >>> 32 - s) + b;
		}

		function HH(a, b, c, d, x, s, t) {
			var n = a + (b ^ c ^ d) + x + t;
			return (n << s | n >>> 32 - s) + b;
		}

		function II(a, b, c, d, x, s, t) {
			var n = a + (c ^ (b | ~d)) + x + t;
			return (n << s | n >>> 32 - s) + b;
		}

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.MD5('message');
   *     var hash = CryptoJS.MD5(wordArray);
   */
		C.MD5 = Hasher._createHelper(MD5);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacMD5(message, key);
   */
		C.HmacMD5 = Hasher._createHmacHelper(MD5);
	})(Math);

	return CryptoJS.MD5;
});

},{"./core":17}],26:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	/**
  * Cipher Feedback block mode.
  */
	CryptoJS.mode.CFB = function () {
		var CFB = CryptoJS.lib.BlockCipherMode.extend();

		CFB.Encryptor = CFB.extend({
			processBlock: function processBlock(words, offset) {
				// Shortcuts
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;

				generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

				// Remember this block to use with next block
				this._prevBlock = words.slice(offset, offset + blockSize);
			}
		});

		CFB.Decryptor = CFB.extend({
			processBlock: function processBlock(words, offset) {
				// Shortcuts
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;

				// Remember this block to use with next block
				var thisBlock = words.slice(offset, offset + blockSize);

				generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

				// This block becomes the previous block
				this._prevBlock = thisBlock;
			}
		});

		function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
			// Shortcut
			var iv = this._iv;

			// Generate keystream
			if (iv) {
				var keystream = iv.slice(0);

				// Remove IV for subsequent blocks
				this._iv = undefined;
			} else {
				var keystream = this._prevBlock;
			}
			cipher.encryptBlock(keystream, 0);

			// Encrypt
			for (var i = 0; i < blockSize; i++) {
				words[offset + i] ^= keystream[i];
			}
		}

		return CFB;
	}();

	return CryptoJS.mode.CFB;
});

},{"./cipher-core":16,"./core":17}],27:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	/** @preserve
  * Counter block mode compatible with  Dr Brian Gladman fileenc.c
  * derived from CryptoJS.mode.CTR
  * Jan Hruby jhruby.web@gmail.com
  */
	CryptoJS.mode.CTRGladman = function () {
		var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

		function incWord(word) {
			if ((word >> 24 & 0xff) === 0xff) {
				//overflow
				var b1 = word >> 16 & 0xff;
				var b2 = word >> 8 & 0xff;
				var b3 = word & 0xff;

				if (b1 === 0xff) // overflow b1
					{
						b1 = 0;
						if (b2 === 0xff) {
							b2 = 0;
							if (b3 === 0xff) {
								b3 = 0;
							} else {
								++b3;
							}
						} else {
							++b2;
						}
					} else {
					++b1;
				}

				word = 0;
				word += b1 << 16;
				word += b2 << 8;
				word += b3;
			} else {
				word += 0x01 << 24;
			}
			return word;
		}

		function incCounter(counter) {
			if ((counter[0] = incWord(counter[0])) === 0) {
				// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
				counter[1] = incWord(counter[1]);
			}
			return counter;
		}

		var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
			processBlock: function processBlock(words, offset) {
				// Shortcuts
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				var iv = this._iv;
				var counter = this._counter;

				// Generate keystream
				if (iv) {
					counter = this._counter = iv.slice(0);

					// Remove IV for subsequent blocks
					this._iv = undefined;
				}

				incCounter(counter);

				var keystream = counter.slice(0);
				cipher.encryptBlock(keystream, 0);

				// Encrypt
				for (var i = 0; i < blockSize; i++) {
					words[offset + i] ^= keystream[i];
				}
			}
		});

		CTRGladman.Decryptor = Encryptor;

		return CTRGladman;
	}();

	return CryptoJS.mode.CTRGladman;
});

},{"./cipher-core":16,"./core":17}],28:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	/**
  * Counter block mode.
  */
	CryptoJS.mode.CTR = function () {
		var CTR = CryptoJS.lib.BlockCipherMode.extend();

		var Encryptor = CTR.Encryptor = CTR.extend({
			processBlock: function processBlock(words, offset) {
				// Shortcuts
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				var iv = this._iv;
				var counter = this._counter;

				// Generate keystream
				if (iv) {
					counter = this._counter = iv.slice(0);

					// Remove IV for subsequent blocks
					this._iv = undefined;
				}
				var keystream = counter.slice(0);
				cipher.encryptBlock(keystream, 0);

				// Increment counter
				counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;

				// Encrypt
				for (var i = 0; i < blockSize; i++) {
					words[offset + i] ^= keystream[i];
				}
			}
		});

		CTR.Decryptor = Encryptor;

		return CTR;
	}();

	return CryptoJS.mode.CTR;
});

},{"./cipher-core":16,"./core":17}],29:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	/**
  * Electronic Codebook block mode.
  */
	CryptoJS.mode.ECB = function () {
		var ECB = CryptoJS.lib.BlockCipherMode.extend();

		ECB.Encryptor = ECB.extend({
			processBlock: function processBlock(words, offset) {
				this._cipher.encryptBlock(words, offset);
			}
		});

		ECB.Decryptor = ECB.extend({
			processBlock: function processBlock(words, offset) {
				this._cipher.decryptBlock(words, offset);
			}
		});

		return ECB;
	}();

	return CryptoJS.mode.ECB;
});

},{"./cipher-core":16,"./core":17}],30:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	/**
  * Output Feedback block mode.
  */
	CryptoJS.mode.OFB = function () {
		var OFB = CryptoJS.lib.BlockCipherMode.extend();

		var Encryptor = OFB.Encryptor = OFB.extend({
			processBlock: function processBlock(words, offset) {
				// Shortcuts
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				var iv = this._iv;
				var keystream = this._keystream;

				// Generate keystream
				if (iv) {
					keystream = this._keystream = iv.slice(0);

					// Remove IV for subsequent blocks
					this._iv = undefined;
				}
				cipher.encryptBlock(keystream, 0);

				// Encrypt
				for (var i = 0; i < blockSize; i++) {
					words[offset + i] ^= keystream[i];
				}
			}
		});

		OFB.Decryptor = Encryptor;

		return OFB;
	}();

	return CryptoJS.mode.OFB;
});

},{"./cipher-core":16,"./core":17}],31:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	/**
  * ANSI X.923 padding strategy.
  */
	CryptoJS.pad.AnsiX923 = {
		pad: function pad(data, blockSize) {
			// Shortcuts
			var dataSigBytes = data.sigBytes;
			var blockSizeBytes = blockSize * 4;

			// Count padding bytes
			var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

			// Compute last byte position
			var lastBytePos = dataSigBytes + nPaddingBytes - 1;

			// Pad
			data.clamp();
			data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
			data.sigBytes += nPaddingBytes;
		},

		unpad: function unpad(data) {
			// Get number of padding bytes from last byte
			var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

			// Remove padding
			data.sigBytes -= nPaddingBytes;
		}
	};

	return CryptoJS.pad.Ansix923;
});

},{"./cipher-core":16,"./core":17}],32:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	/**
  * ISO 10126 padding strategy.
  */
	CryptoJS.pad.Iso10126 = {
		pad: function pad(data, blockSize) {
			// Shortcut
			var blockSizeBytes = blockSize * 4;

			// Count padding bytes
			var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

			// Pad
			data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
		},

		unpad: function unpad(data) {
			// Get number of padding bytes from last byte
			var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

			// Remove padding
			data.sigBytes -= nPaddingBytes;
		}
	};

	return CryptoJS.pad.Iso10126;
});

},{"./cipher-core":16,"./core":17}],33:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	/**
  * ISO/IEC 9797-1 Padding Method 2.
  */
	CryptoJS.pad.Iso97971 = {
		pad: function pad(data, blockSize) {
			// Add 0x80 byte
			data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

			// Zero pad the rest
			CryptoJS.pad.ZeroPadding.pad(data, blockSize);
		},

		unpad: function unpad(data) {
			// Remove zero padding
			CryptoJS.pad.ZeroPadding.unpad(data);

			// Remove one more byte -- the 0x80 byte
			data.sigBytes--;
		}
	};

	return CryptoJS.pad.Iso97971;
});

},{"./cipher-core":16,"./core":17}],34:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	/**
  * A noop padding strategy.
  */
	CryptoJS.pad.NoPadding = {
		pad: function pad() {},

		unpad: function unpad() {}
	};

	return CryptoJS.pad.NoPadding;
});

},{"./cipher-core":16,"./core":17}],35:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	/**
  * Zero padding strategy.
  */
	CryptoJS.pad.ZeroPadding = {
		pad: function pad(data, blockSize) {
			// Shortcut
			var blockSizeBytes = blockSize * 4;

			// Pad
			data.clamp();
			data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
		},

		unpad: function unpad(data) {
			// Shortcut
			var dataWords = data.words;

			// Unpad
			var i = data.sigBytes - 1;
			while (!(dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff)) {
				i--;
			}
			data.sigBytes = i + 1;
		}
	};

	return CryptoJS.pad.ZeroPadding;
});

},{"./cipher-core":16,"./core":17}],36:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha1", "./hmac"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var Base = C_lib.Base;
		var WordArray = C_lib.WordArray;
		var C_algo = C.algo;
		var SHA1 = C_algo.SHA1;
		var HMAC = C_algo.HMAC;

		/**
   * Password-Based Key Derivation Function 2 algorithm.
   */
		var PBKDF2 = C_algo.PBKDF2 = Base.extend({
			/**
    * Configuration options.
    *
    * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
    * @property {Hasher} hasher The hasher to use. Default: SHA1
    * @property {number} iterations The number of iterations to perform. Default: 1
    */
			cfg: Base.extend({
				keySize: 128 / 32,
				hasher: SHA1,
				iterations: 1
			}),

			/**
    * Initializes a newly created key derivation function.
    *
    * @param {Object} cfg (Optional) The configuration options to use for the derivation.
    *
    * @example
    *
    *     var kdf = CryptoJS.algo.PBKDF2.create();
    *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
    *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
    */
			init: function init(cfg) {
				this.cfg = this.cfg.extend(cfg);
			},

			/**
    * Computes the Password-Based Key Derivation Function 2.
    *
    * @param {WordArray|string} password The password.
    * @param {WordArray|string} salt A salt.
    *
    * @return {WordArray} The derived key.
    *
    * @example
    *
    *     var key = kdf.compute(password, salt);
    */
			compute: function compute(password, salt) {
				// Shortcut
				var cfg = this.cfg;

				// Init HMAC
				var hmac = HMAC.create(cfg.hasher, password);

				// Initial values
				var derivedKey = WordArray.create();
				var blockIndex = WordArray.create([0x00000001]);

				// Shortcuts
				var derivedKeyWords = derivedKey.words;
				var blockIndexWords = blockIndex.words;
				var keySize = cfg.keySize;
				var iterations = cfg.iterations;

				// Generate key
				while (derivedKeyWords.length < keySize) {
					var block = hmac.update(salt).finalize(blockIndex);
					hmac.reset();

					// Shortcuts
					var blockWords = block.words;
					var blockWordsLength = blockWords.length;

					// Iterations
					var intermediate = block;
					for (var i = 1; i < iterations; i++) {
						intermediate = hmac.finalize(intermediate);
						hmac.reset();

						// Shortcut
						var intermediateWords = intermediate.words;

						// XOR intermediate with block
						for (var j = 0; j < blockWordsLength; j++) {
							blockWords[j] ^= intermediateWords[j];
						}
					}

					derivedKey.concat(block);
					blockIndexWords[0]++;
				}
				derivedKey.sigBytes = keySize * 4;

				return derivedKey;
			}
		});

		/**
   * Computes the Password-Based Key Derivation Function 2.
   *
   * @param {WordArray|string} password The password.
   * @param {WordArray|string} salt A salt.
   * @param {Object} cfg (Optional) The configuration options to use for this computation.
   *
   * @return {WordArray} The derived key.
   *
   * @static
   *
   * @example
   *
   *     var key = CryptoJS.PBKDF2(password, salt);
   *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
   *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
   */
		C.PBKDF2 = function (password, salt, cfg) {
			return PBKDF2.create(cfg).compute(password, salt);
		};
	})();

	return CryptoJS.PBKDF2;
});

},{"./core":17,"./hmac":22,"./sha1":41}],37:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var StreamCipher = C_lib.StreamCipher;
		var C_algo = C.algo;

		// Reusable objects
		var S = [];
		var C_ = [];
		var G = [];

		/**
   * Rabbit stream cipher algorithm.
   *
   * This is a legacy version that neglected to convert the key to little-endian.
   * This error doesn't affect the cipher's security,
   * but it does affect its compatibility with other implementations.
   */
		var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
			_doReset: function _doReset() {
				// Shortcuts
				var K = this._key.words;
				var iv = this.cfg.iv;

				// Generate initial state values
				var X = this._X = [K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16];

				// Generate initial counter values
				var C = this._C = [K[2] << 16 | K[2] >>> 16, K[0] & 0xffff0000 | K[1] & 0x0000ffff, K[3] << 16 | K[3] >>> 16, K[1] & 0xffff0000 | K[2] & 0x0000ffff, K[0] << 16 | K[0] >>> 16, K[2] & 0xffff0000 | K[3] & 0x0000ffff, K[1] << 16 | K[1] >>> 16, K[3] & 0xffff0000 | K[0] & 0x0000ffff];

				// Carry bit
				this._b = 0;

				// Iterate the system four times
				for (var i = 0; i < 4; i++) {
					nextState.call(this);
				}

				// Modify the counters
				for (var i = 0; i < 8; i++) {
					C[i] ^= X[i + 4 & 7];
				}

				// IV setup
				if (iv) {
					// Shortcuts
					var IV = iv.words;
					var IV_0 = IV[0];
					var IV_1 = IV[1];

					// Generate four subvectors
					var i0 = (IV_0 << 8 | IV_0 >>> 24) & 0x00ff00ff | (IV_0 << 24 | IV_0 >>> 8) & 0xff00ff00;
					var i2 = (IV_1 << 8 | IV_1 >>> 24) & 0x00ff00ff | (IV_1 << 24 | IV_1 >>> 8) & 0xff00ff00;
					var i1 = i0 >>> 16 | i2 & 0xffff0000;
					var i3 = i2 << 16 | i0 & 0x0000ffff;

					// Modify counter values
					C[0] ^= i0;
					C[1] ^= i1;
					C[2] ^= i2;
					C[3] ^= i3;
					C[4] ^= i0;
					C[5] ^= i1;
					C[6] ^= i2;
					C[7] ^= i3;

					// Iterate the system four times
					for (var i = 0; i < 4; i++) {
						nextState.call(this);
					}
				}
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Shortcut
				var X = this._X;

				// Iterate the system
				nextState.call(this);

				// Generate four keystream words
				S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
				S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
				S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
				S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;

				for (var i = 0; i < 4; i++) {
					// Swap endian
					S[i] = (S[i] << 8 | S[i] >>> 24) & 0x00ff00ff | (S[i] << 24 | S[i] >>> 8) & 0xff00ff00;

					// Encrypt
					M[offset + i] ^= S[i];
				}
			},

			blockSize: 128 / 32,

			ivSize: 64 / 32
		});

		function nextState() {
			// Shortcuts
			var X = this._X;
			var C = this._C;

			// Save old counter values
			for (var i = 0; i < 8; i++) {
				C_[i] = C[i];
			}

			// Calculate new counter values
			C[0] = C[0] + 0x4d34d34d + this._b | 0;
			C[1] = C[1] + 0xd34d34d3 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
			C[2] = C[2] + 0x34d34d34 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
			C[3] = C[3] + 0x4d34d34d + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
			C[4] = C[4] + 0xd34d34d3 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
			C[5] = C[5] + 0x34d34d34 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
			C[6] = C[6] + 0x4d34d34d + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
			C[7] = C[7] + 0xd34d34d3 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
			this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;

			// Calculate the g-values
			for (var i = 0; i < 8; i++) {
				var gx = X[i] + C[i];

				// Construct high and low argument for squaring
				var ga = gx & 0xffff;
				var gb = gx >>> 16;

				// Calculate high and low result of squaring
				var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
				var gl = ((gx & 0xffff0000) * gx | 0) + ((gx & 0x0000ffff) * gx | 0);

				// High XOR low
				G[i] = gh ^ gl;
			}

			// Calculate new state values
			X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
			X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
			X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
			X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
			X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
			X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
			X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
			X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
		}

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
   */
		C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
	})();

	return CryptoJS.RabbitLegacy;
});

},{"./cipher-core":16,"./core":17,"./enc-base64":18,"./evpkdf":20,"./md5":25}],38:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var StreamCipher = C_lib.StreamCipher;
		var C_algo = C.algo;

		// Reusable objects
		var S = [];
		var C_ = [];
		var G = [];

		/**
   * Rabbit stream cipher algorithm
   */
		var Rabbit = C_algo.Rabbit = StreamCipher.extend({
			_doReset: function _doReset() {
				// Shortcuts
				var K = this._key.words;
				var iv = this.cfg.iv;

				// Swap endian
				for (var i = 0; i < 4; i++) {
					K[i] = (K[i] << 8 | K[i] >>> 24) & 0x00ff00ff | (K[i] << 24 | K[i] >>> 8) & 0xff00ff00;
				}

				// Generate initial state values
				var X = this._X = [K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16];

				// Generate initial counter values
				var C = this._C = [K[2] << 16 | K[2] >>> 16, K[0] & 0xffff0000 | K[1] & 0x0000ffff, K[3] << 16 | K[3] >>> 16, K[1] & 0xffff0000 | K[2] & 0x0000ffff, K[0] << 16 | K[0] >>> 16, K[2] & 0xffff0000 | K[3] & 0x0000ffff, K[1] << 16 | K[1] >>> 16, K[3] & 0xffff0000 | K[0] & 0x0000ffff];

				// Carry bit
				this._b = 0;

				// Iterate the system four times
				for (var i = 0; i < 4; i++) {
					nextState.call(this);
				}

				// Modify the counters
				for (var i = 0; i < 8; i++) {
					C[i] ^= X[i + 4 & 7];
				}

				// IV setup
				if (iv) {
					// Shortcuts
					var IV = iv.words;
					var IV_0 = IV[0];
					var IV_1 = IV[1];

					// Generate four subvectors
					var i0 = (IV_0 << 8 | IV_0 >>> 24) & 0x00ff00ff | (IV_0 << 24 | IV_0 >>> 8) & 0xff00ff00;
					var i2 = (IV_1 << 8 | IV_1 >>> 24) & 0x00ff00ff | (IV_1 << 24 | IV_1 >>> 8) & 0xff00ff00;
					var i1 = i0 >>> 16 | i2 & 0xffff0000;
					var i3 = i2 << 16 | i0 & 0x0000ffff;

					// Modify counter values
					C[0] ^= i0;
					C[1] ^= i1;
					C[2] ^= i2;
					C[3] ^= i3;
					C[4] ^= i0;
					C[5] ^= i1;
					C[6] ^= i2;
					C[7] ^= i3;

					// Iterate the system four times
					for (var i = 0; i < 4; i++) {
						nextState.call(this);
					}
				}
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Shortcut
				var X = this._X;

				// Iterate the system
				nextState.call(this);

				// Generate four keystream words
				S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
				S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
				S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
				S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;

				for (var i = 0; i < 4; i++) {
					// Swap endian
					S[i] = (S[i] << 8 | S[i] >>> 24) & 0x00ff00ff | (S[i] << 24 | S[i] >>> 8) & 0xff00ff00;

					// Encrypt
					M[offset + i] ^= S[i];
				}
			},

			blockSize: 128 / 32,

			ivSize: 64 / 32
		});

		function nextState() {
			// Shortcuts
			var X = this._X;
			var C = this._C;

			// Save old counter values
			for (var i = 0; i < 8; i++) {
				C_[i] = C[i];
			}

			// Calculate new counter values
			C[0] = C[0] + 0x4d34d34d + this._b | 0;
			C[1] = C[1] + 0xd34d34d3 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
			C[2] = C[2] + 0x34d34d34 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
			C[3] = C[3] + 0x4d34d34d + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
			C[4] = C[4] + 0xd34d34d3 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
			C[5] = C[5] + 0x34d34d34 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
			C[6] = C[6] + 0x4d34d34d + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
			C[7] = C[7] + 0xd34d34d3 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
			this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;

			// Calculate the g-values
			for (var i = 0; i < 8; i++) {
				var gx = X[i] + C[i];

				// Construct high and low argument for squaring
				var ga = gx & 0xffff;
				var gb = gx >>> 16;

				// Calculate high and low result of squaring
				var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
				var gl = ((gx & 0xffff0000) * gx | 0) + ((gx & 0x0000ffff) * gx | 0);

				// High XOR low
				G[i] = gh ^ gl;
			}

			// Calculate new state values
			X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
			X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
			X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
			X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
			X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
			X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
			X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
			X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
		}

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
   */
		C.Rabbit = StreamCipher._createHelper(Rabbit);
	})();

	return CryptoJS.Rabbit;
});

},{"./cipher-core":16,"./core":17,"./enc-base64":18,"./evpkdf":20,"./md5":25}],39:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var StreamCipher = C_lib.StreamCipher;
		var C_algo = C.algo;

		/**
   * RC4 stream cipher algorithm.
   */
		var RC4 = C_algo.RC4 = StreamCipher.extend({
			_doReset: function _doReset() {
				// Shortcuts
				var key = this._key;
				var keyWords = key.words;
				var keySigBytes = key.sigBytes;

				// Init sbox
				var S = this._S = [];
				for (var i = 0; i < 256; i++) {
					S[i] = i;
				}

				// Key setup
				for (var i = 0, j = 0; i < 256; i++) {
					var keyByteIndex = i % keySigBytes;
					var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 0xff;

					j = (j + S[i] + keyByte) % 256;

					// Swap
					var t = S[i];
					S[i] = S[j];
					S[j] = t;
				}

				// Counters
				this._i = this._j = 0;
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				M[offset] ^= generateKeystreamWord.call(this);
			},

			keySize: 256 / 32,

			ivSize: 0
		});

		function generateKeystreamWord() {
			// Shortcuts
			var S = this._S;
			var i = this._i;
			var j = this._j;

			// Generate keystream word
			var keystreamWord = 0;
			for (var n = 0; n < 4; n++) {
				i = (i + 1) % 256;
				j = (j + S[i]) % 256;

				// Swap
				var t = S[i];
				S[i] = S[j];
				S[j] = t;

				keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8;
			}

			// Update counters
			this._i = i;
			this._j = j;

			return keystreamWord;
		}

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
   */
		C.RC4 = StreamCipher._createHelper(RC4);

		/**
   * Modified RC4 stream cipher algorithm.
   */
		var RC4Drop = C_algo.RC4Drop = RC4.extend({
			/**
    * Configuration options.
    *
    * @property {number} drop The number of keystream words to drop. Default 192
    */
			cfg: RC4.cfg.extend({
				drop: 192
			}),

			_doReset: function _doReset() {
				RC4._doReset.call(this);

				// Drop
				for (var i = this.cfg.drop; i > 0; i--) {
					generateKeystreamWord.call(this);
				}
			}
		});

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
   */
		C.RC4Drop = StreamCipher._createHelper(RC4Drop);
	})();

	return CryptoJS.RC4;
});

},{"./cipher-core":16,"./core":17,"./enc-base64":18,"./evpkdf":20,"./md5":25}],40:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	/** @preserve
 (c) 2012 by Cédric Mesnil. All rights reserved.
 	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
     - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

	(function (Math) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var Hasher = C_lib.Hasher;
		var C_algo = C.algo;

		// Constants table
		var _zl = WordArray.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
		var _zr = WordArray.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
		var _sl = WordArray.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
		var _sr = WordArray.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);

		var _hl = WordArray.create([0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
		var _hr = WordArray.create([0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

		/**
   * RIPEMD160 hash algorithm.
   */
		var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
			_doReset: function _doReset() {
				this._hash = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {

				// Swap endian
				for (var i = 0; i < 16; i++) {
					// Shortcuts
					var offset_i = offset + i;
					var M_offset_i = M[offset_i];

					// Swap
					M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
				}
				// Shortcut
				var H = this._hash.words;
				var hl = _hl.words;
				var hr = _hr.words;
				var zl = _zl.words;
				var zr = _zr.words;
				var sl = _sl.words;
				var sr = _sr.words;

				// Working variables
				var al, bl, cl, dl, el;
				var ar, br, cr, dr, er;

				ar = al = H[0];
				br = bl = H[1];
				cr = cl = H[2];
				dr = dl = H[3];
				er = el = H[4];
				// Computation
				var t;
				for (var i = 0; i < 80; i += 1) {
					t = al + M[offset + zl[i]] | 0;
					if (i < 16) {
						t += f1(bl, cl, dl) + hl[0];
					} else if (i < 32) {
						t += f2(bl, cl, dl) + hl[1];
					} else if (i < 48) {
						t += f3(bl, cl, dl) + hl[2];
					} else if (i < 64) {
						t += f4(bl, cl, dl) + hl[3];
					} else {
						// if (i<80) {
						t += f5(bl, cl, dl) + hl[4];
					}
					t = t | 0;
					t = rotl(t, sl[i]);
					t = t + el | 0;
					al = el;
					el = dl;
					dl = rotl(cl, 10);
					cl = bl;
					bl = t;

					t = ar + M[offset + zr[i]] | 0;
					if (i < 16) {
						t += f5(br, cr, dr) + hr[0];
					} else if (i < 32) {
						t += f4(br, cr, dr) + hr[1];
					} else if (i < 48) {
						t += f3(br, cr, dr) + hr[2];
					} else if (i < 64) {
						t += f2(br, cr, dr) + hr[3];
					} else {
						// if (i<80) {
						t += f1(br, cr, dr) + hr[4];
					}
					t = t | 0;
					t = rotl(t, sr[i]);
					t = t + er | 0;
					ar = er;
					er = dr;
					dr = rotl(cr, 10);
					cr = br;
					br = t;
				}
				// Intermediate hash value
				t = H[1] + cl + dr | 0;
				H[1] = H[2] + dl + er | 0;
				H[2] = H[3] + el + ar | 0;
				H[3] = H[4] + al + br | 0;
				H[4] = H[0] + bl + cr | 0;
				H[0] = t;
			},

			_doFinalize: function _doFinalize() {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;

				var nBitsTotal = this._nDataBytes * 8;
				var nBitsLeft = data.sigBytes * 8;

				// Add padding
				dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 0x00ff00ff | (nBitsTotal << 24 | nBitsTotal >>> 8) & 0xff00ff00;
				data.sigBytes = (dataWords.length + 1) * 4;

				// Hash final blocks
				this._process();

				// Shortcuts
				var hash = this._hash;
				var H = hash.words;

				// Swap endian
				for (var i = 0; i < 5; i++) {
					// Shortcut
					var H_i = H[i];

					// Swap
					H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
				}

				// Return final computed hash
				return hash;
			},

			clone: function clone() {
				var clone = Hasher.clone.call(this);
				clone._hash = this._hash.clone();

				return clone;
			}
		});

		function f1(x, y, z) {
			return x ^ y ^ z;
		}

		function f2(x, y, z) {
			return x & y | ~x & z;
		}

		function f3(x, y, z) {
			return (x | ~y) ^ z;
		}

		function f4(x, y, z) {
			return x & z | y & ~z;
		}

		function f5(x, y, z) {
			return x ^ (y | ~z);
		}

		function rotl(x, n) {
			return x << n | x >>> 32 - n;
		}

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.RIPEMD160('message');
   *     var hash = CryptoJS.RIPEMD160(wordArray);
   */
		C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
   */
		C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
	})(Math);

	return CryptoJS.RIPEMD160;
});

},{"./core":17}],41:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var Hasher = C_lib.Hasher;
		var C_algo = C.algo;

		// Reusable object
		var W = [];

		/**
   * SHA-1 hash algorithm.
   */
		var SHA1 = C_algo.SHA1 = Hasher.extend({
			_doReset: function _doReset() {
				this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Shortcut
				var H = this._hash.words;

				// Working variables
				var a = H[0];
				var b = H[1];
				var c = H[2];
				var d = H[3];
				var e = H[4];

				// Computation
				for (var i = 0; i < 80; i++) {
					if (i < 16) {
						W[i] = M[offset + i] | 0;
					} else {
						var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
						W[i] = n << 1 | n >>> 31;
					}

					var t = (a << 5 | a >>> 27) + e + W[i];
					if (i < 20) {
						t += (b & c | ~b & d) + 0x5a827999;
					} else if (i < 40) {
						t += (b ^ c ^ d) + 0x6ed9eba1;
					} else if (i < 60) {
						t += (b & c | b & d | c & d) - 0x70e44324;
					} else /* if (i < 80) */{
							t += (b ^ c ^ d) - 0x359d3e2a;
						}

					e = d;
					d = c;
					c = b << 30 | b >>> 2;
					b = a;
					a = t;
				}

				// Intermediate hash value
				H[0] = H[0] + a | 0;
				H[1] = H[1] + b | 0;
				H[2] = H[2] + c | 0;
				H[3] = H[3] + d | 0;
				H[4] = H[4] + e | 0;
			},

			_doFinalize: function _doFinalize() {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;

				var nBitsTotal = this._nDataBytes * 8;
				var nBitsLeft = data.sigBytes * 8;

				// Add padding
				dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
				data.sigBytes = dataWords.length * 4;

				// Hash final blocks
				this._process();

				// Return final computed hash
				return this._hash;
			},

			clone: function clone() {
				var clone = Hasher.clone.call(this);
				clone._hash = this._hash.clone();

				return clone;
			}
		});

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.SHA1('message');
   *     var hash = CryptoJS.SHA1(wordArray);
   */
		C.SHA1 = Hasher._createHelper(SHA1);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacSHA1(message, key);
   */
		C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	})();

	return CryptoJS.SHA1;
});

},{"./core":17}],42:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./sha256"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha256"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var C_algo = C.algo;
		var SHA256 = C_algo.SHA256;

		/**
   * SHA-224 hash algorithm.
   */
		var SHA224 = C_algo.SHA224 = SHA256.extend({
			_doReset: function _doReset() {
				this._hash = new WordArray.init([0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4]);
			},

			_doFinalize: function _doFinalize() {
				var hash = SHA256._doFinalize.call(this);

				hash.sigBytes -= 4;

				return hash;
			}
		});

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.SHA224('message');
   *     var hash = CryptoJS.SHA224(wordArray);
   */
		C.SHA224 = SHA256._createHelper(SHA224);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacSHA224(message, key);
   */
		C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
	})();

	return CryptoJS.SHA224;
});

},{"./core":17,"./sha256":43}],43:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function (Math) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var Hasher = C_lib.Hasher;
		var C_algo = C.algo;

		// Initialization and round constants tables
		var H = [];
		var K = [];

		// Compute constants
		(function () {
			function isPrime(n) {
				var sqrtN = Math.sqrt(n);
				for (var factor = 2; factor <= sqrtN; factor++) {
					if (!(n % factor)) {
						return false;
					}
				}

				return true;
			}

			function getFractionalBits(n) {
				return (n - (n | 0)) * 0x100000000 | 0;
			}

			var n = 2;
			var nPrime = 0;
			while (nPrime < 64) {
				if (isPrime(n)) {
					if (nPrime < 8) {
						H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
					}
					K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

					nPrime++;
				}

				n++;
			}
		})();

		// Reusable object
		var W = [];

		/**
   * SHA-256 hash algorithm.
   */
		var SHA256 = C_algo.SHA256 = Hasher.extend({
			_doReset: function _doReset() {
				this._hash = new WordArray.init(H.slice(0));
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Shortcut
				var H = this._hash.words;

				// Working variables
				var a = H[0];
				var b = H[1];
				var c = H[2];
				var d = H[3];
				var e = H[4];
				var f = H[5];
				var g = H[6];
				var h = H[7];

				// Computation
				for (var i = 0; i < 64; i++) {
					if (i < 16) {
						W[i] = M[offset + i] | 0;
					} else {
						var gamma0x = W[i - 15];
						var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;

						var gamma1x = W[i - 2];
						var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;

						W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
					}

					var ch = e & f ^ ~e & g;
					var maj = a & b ^ a & c ^ b & c;

					var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
					var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);

					var t1 = h + sigma1 + ch + K[i] + W[i];
					var t2 = sigma0 + maj;

					h = g;
					g = f;
					f = e;
					e = d + t1 | 0;
					d = c;
					c = b;
					b = a;
					a = t1 + t2 | 0;
				}

				// Intermediate hash value
				H[0] = H[0] + a | 0;
				H[1] = H[1] + b | 0;
				H[2] = H[2] + c | 0;
				H[3] = H[3] + d | 0;
				H[4] = H[4] + e | 0;
				H[5] = H[5] + f | 0;
				H[6] = H[6] + g | 0;
				H[7] = H[7] + h | 0;
			},

			_doFinalize: function _doFinalize() {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;

				var nBitsTotal = this._nDataBytes * 8;
				var nBitsLeft = data.sigBytes * 8;

				// Add padding
				dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
				dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
				data.sigBytes = dataWords.length * 4;

				// Hash final blocks
				this._process();

				// Return final computed hash
				return this._hash;
			},

			clone: function clone() {
				var clone = Hasher.clone.call(this);
				clone._hash = this._hash.clone();

				return clone;
			}
		});

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.SHA256('message');
   *     var hash = CryptoJS.SHA256(wordArray);
   */
		C.SHA256 = Hasher._createHelper(SHA256);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacSHA256(message, key);
   */
		C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	})(Math);

	return CryptoJS.SHA256;
});

},{"./core":17}],44:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./x64-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./x64-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function (Math) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var Hasher = C_lib.Hasher;
		var C_x64 = C.x64;
		var X64Word = C_x64.Word;
		var C_algo = C.algo;

		// Constants tables
		var RHO_OFFSETS = [];
		var PI_INDEXES = [];
		var ROUND_CONSTANTS = [];

		// Compute Constants
		(function () {
			// Compute rho offset constants
			var x = 1,
			    y = 0;
			for (var t = 0; t < 24; t++) {
				RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;

				var newX = y % 5;
				var newY = (2 * x + 3 * y) % 5;
				x = newX;
				y = newY;
			}

			// Compute pi index constants
			for (var x = 0; x < 5; x++) {
				for (var y = 0; y < 5; y++) {
					PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
				}
			}

			// Compute round constants
			var LFSR = 0x01;
			for (var i = 0; i < 24; i++) {
				var roundConstantMsw = 0;
				var roundConstantLsw = 0;

				for (var j = 0; j < 7; j++) {
					if (LFSR & 0x01) {
						var bitPosition = (1 << j) - 1;
						if (bitPosition < 32) {
							roundConstantLsw ^= 1 << bitPosition;
						} else /* if (bitPosition >= 32) */{
								roundConstantMsw ^= 1 << bitPosition - 32;
							}
					}

					// Compute next LFSR
					if (LFSR & 0x80) {
						// Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
						LFSR = LFSR << 1 ^ 0x71;
					} else {
						LFSR <<= 1;
					}
				}

				ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
			}
		})();

		// Reusable objects for temporary values
		var T = [];
		(function () {
			for (var i = 0; i < 25; i++) {
				T[i] = X64Word.create();
			}
		})();

		/**
   * SHA-3 hash algorithm.
   */
		var SHA3 = C_algo.SHA3 = Hasher.extend({
			/**
    * Configuration options.
    *
    * @property {number} outputLength
    *   The desired number of bits in the output hash.
    *   Only values permitted are: 224, 256, 384, 512.
    *   Default: 512
    */
			cfg: Hasher.cfg.extend({
				outputLength: 512
			}),

			_doReset: function _doReset() {
				var state = this._state = [];
				for (var i = 0; i < 25; i++) {
					state[i] = new X64Word.init();
				}

				this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Shortcuts
				var state = this._state;
				var nBlockSizeLanes = this.blockSize / 2;

				// Absorb
				for (var i = 0; i < nBlockSizeLanes; i++) {
					// Shortcuts
					var M2i = M[offset + 2 * i];
					var M2i1 = M[offset + 2 * i + 1];

					// Swap endian
					M2i = (M2i << 8 | M2i >>> 24) & 0x00ff00ff | (M2i << 24 | M2i >>> 8) & 0xff00ff00;
					M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 0x00ff00ff | (M2i1 << 24 | M2i1 >>> 8) & 0xff00ff00;

					// Absorb message into state
					var lane = state[i];
					lane.high ^= M2i1;
					lane.low ^= M2i;
				}

				// Rounds
				for (var round = 0; round < 24; round++) {
					// Theta
					for (var x = 0; x < 5; x++) {
						// Mix column lanes
						var tMsw = 0,
						    tLsw = 0;
						for (var y = 0; y < 5; y++) {
							var lane = state[x + 5 * y];
							tMsw ^= lane.high;
							tLsw ^= lane.low;
						}

						// Temporary values
						var Tx = T[x];
						Tx.high = tMsw;
						Tx.low = tLsw;
					}
					for (var x = 0; x < 5; x++) {
						// Shortcuts
						var Tx4 = T[(x + 4) % 5];
						var Tx1 = T[(x + 1) % 5];
						var Tx1Msw = Tx1.high;
						var Tx1Lsw = Tx1.low;

						// Mix surrounding columns
						var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
						var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
						for (var y = 0; y < 5; y++) {
							var lane = state[x + 5 * y];
							lane.high ^= tMsw;
							lane.low ^= tLsw;
						}
					}

					// Rho Pi
					for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
						// Shortcuts
						var lane = state[laneIndex];
						var laneMsw = lane.high;
						var laneLsw = lane.low;
						var rhoOffset = RHO_OFFSETS[laneIndex];

						// Rotate lanes
						if (rhoOffset < 32) {
							var tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
							var tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
						} else /* if (rhoOffset >= 32) */{
								var tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
								var tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
							}

						// Transpose lanes
						var TPiLane = T[PI_INDEXES[laneIndex]];
						TPiLane.high = tMsw;
						TPiLane.low = tLsw;
					}

					// Rho pi at x = y = 0
					var T0 = T[0];
					var state0 = state[0];
					T0.high = state0.high;
					T0.low = state0.low;

					// Chi
					for (var x = 0; x < 5; x++) {
						for (var y = 0; y < 5; y++) {
							// Shortcuts
							var laneIndex = x + 5 * y;
							var lane = state[laneIndex];
							var TLane = T[laneIndex];
							var Tx1Lane = T[(x + 1) % 5 + 5 * y];
							var Tx2Lane = T[(x + 2) % 5 + 5 * y];

							// Mix rows
							lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
							lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
						}
					}

					// Iota
					var lane = state[0];
					var roundConstant = ROUND_CONSTANTS[round];
					lane.high ^= roundConstant.high;
					lane.low ^= roundConstant.low;;
				}
			},

			_doFinalize: function _doFinalize() {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;
				var nBitsTotal = this._nDataBytes * 8;
				var nBitsLeft = data.sigBytes * 8;
				var blockSizeBits = this.blockSize * 32;

				// Add padding
				dataWords[nBitsLeft >>> 5] |= 0x1 << 24 - nBitsLeft % 32;
				dataWords[(Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 0x80;
				data.sigBytes = dataWords.length * 4;

				// Hash final blocks
				this._process();

				// Shortcuts
				var state = this._state;
				var outputLengthBytes = this.cfg.outputLength / 8;
				var outputLengthLanes = outputLengthBytes / 8;

				// Squeeze
				var hashWords = [];
				for (var i = 0; i < outputLengthLanes; i++) {
					// Shortcuts
					var lane = state[i];
					var laneMsw = lane.high;
					var laneLsw = lane.low;

					// Swap endian
					laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 0x00ff00ff | (laneMsw << 24 | laneMsw >>> 8) & 0xff00ff00;
					laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 0x00ff00ff | (laneLsw << 24 | laneLsw >>> 8) & 0xff00ff00;

					// Squeeze state to retrieve hash
					hashWords.push(laneLsw);
					hashWords.push(laneMsw);
				}

				// Return final computed hash
				return new WordArray.init(hashWords, outputLengthBytes);
			},

			clone: function clone() {
				var clone = Hasher.clone.call(this);

				var state = clone._state = this._state.slice(0);
				for (var i = 0; i < 25; i++) {
					state[i] = state[i].clone();
				}

				return clone;
			}
		});

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.SHA3('message');
   *     var hash = CryptoJS.SHA3(wordArray);
   */
		C.SHA3 = Hasher._createHelper(SHA3);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacSHA3(message, key);
   */
		C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
	})(Math);

	return CryptoJS.SHA3;
});

},{"./core":17,"./x64-core":48}],45:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./x64-core"), require("./sha512"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./x64-core", "./sha512"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_x64 = C.x64;
		var X64Word = C_x64.Word;
		var X64WordArray = C_x64.WordArray;
		var C_algo = C.algo;
		var SHA512 = C_algo.SHA512;

		/**
   * SHA-384 hash algorithm.
   */
		var SHA384 = C_algo.SHA384 = SHA512.extend({
			_doReset: function _doReset() {
				this._hash = new X64WordArray.init([new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507), new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939), new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511), new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)]);
			},

			_doFinalize: function _doFinalize() {
				var hash = SHA512._doFinalize.call(this);

				hash.sigBytes -= 16;

				return hash;
			}
		});

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.SHA384('message');
   *     var hash = CryptoJS.SHA384(wordArray);
   */
		C.SHA384 = SHA512._createHelper(SHA384);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacSHA384(message, key);
   */
		C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
	})();

	return CryptoJS.SHA384;
});

},{"./core":17,"./sha512":46,"./x64-core":48}],46:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./x64-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./x64-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var Hasher = C_lib.Hasher;
		var C_x64 = C.x64;
		var X64Word = C_x64.Word;
		var X64WordArray = C_x64.WordArray;
		var C_algo = C.algo;

		function X64Word_create() {
			return X64Word.create.apply(X64Word, arguments);
		}

		// Constants
		var K = [X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd), X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc), X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019), X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118), X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe), X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2), X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1), X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694), X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3), X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65), X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483), X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5), X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210), X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4), X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725), X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70), X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926), X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df), X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8), X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b), X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001), X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30), X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910), X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8), X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53), X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8), X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb), X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3), X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60), X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec), X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9), X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b), X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207), X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178), X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6), X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b), X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493), X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c), X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a), X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)];

		// Reusable objects
		var W = [];
		(function () {
			for (var i = 0; i < 80; i++) {
				W[i] = X64Word_create();
			}
		})();

		/**
   * SHA-512 hash algorithm.
   */
		var SHA512 = C_algo.SHA512 = Hasher.extend({
			_doReset: function _doReset() {
				this._hash = new X64WordArray.init([new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b), new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1), new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f), new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)]);
			},

			_doProcessBlock: function _doProcessBlock(M, offset) {
				// Shortcuts
				var H = this._hash.words;

				var H0 = H[0];
				var H1 = H[1];
				var H2 = H[2];
				var H3 = H[3];
				var H4 = H[4];
				var H5 = H[5];
				var H6 = H[6];
				var H7 = H[7];

				var H0h = H0.high;
				var H0l = H0.low;
				var H1h = H1.high;
				var H1l = H1.low;
				var H2h = H2.high;
				var H2l = H2.low;
				var H3h = H3.high;
				var H3l = H3.low;
				var H4h = H4.high;
				var H4l = H4.low;
				var H5h = H5.high;
				var H5l = H5.low;
				var H6h = H6.high;
				var H6l = H6.low;
				var H7h = H7.high;
				var H7l = H7.low;

				// Working variables
				var ah = H0h;
				var al = H0l;
				var bh = H1h;
				var bl = H1l;
				var ch = H2h;
				var cl = H2l;
				var dh = H3h;
				var dl = H3l;
				var eh = H4h;
				var el = H4l;
				var fh = H5h;
				var fl = H5l;
				var gh = H6h;
				var gl = H6l;
				var hh = H7h;
				var hl = H7l;

				// Rounds
				for (var i = 0; i < 80; i++) {
					// Shortcut
					var Wi = W[i];

					// Extend message
					if (i < 16) {
						var Wih = Wi.high = M[offset + i * 2] | 0;
						var Wil = Wi.low = M[offset + i * 2 + 1] | 0;
					} else {
						// Gamma0
						var gamma0x = W[i - 15];
						var gamma0xh = gamma0x.high;
						var gamma0xl = gamma0x.low;
						var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
						var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);

						// Gamma1
						var gamma1x = W[i - 2];
						var gamma1xh = gamma1x.high;
						var gamma1xl = gamma1x.low;
						var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
						var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);

						// W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
						var Wi7 = W[i - 7];
						var Wi7h = Wi7.high;
						var Wi7l = Wi7.low;

						var Wi16 = W[i - 16];
						var Wi16h = Wi16.high;
						var Wi16l = Wi16.low;

						var Wil = gamma0l + Wi7l;
						var Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
						var Wil = Wil + gamma1l;
						var Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
						var Wil = Wil + Wi16l;
						var Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);

						Wi.high = Wih;
						Wi.low = Wil;
					}

					var chh = eh & fh ^ ~eh & gh;
					var chl = el & fl ^ ~el & gl;
					var majh = ah & bh ^ ah & ch ^ bh & ch;
					var majl = al & bl ^ al & cl ^ bl & cl;

					var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
					var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
					var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
					var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);

					// t1 = h + sigma1 + ch + K[i] + W[i]
					var Ki = K[i];
					var Kih = Ki.high;
					var Kil = Ki.low;

					var t1l = hl + sigma1l;
					var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
					var t1l = t1l + chl;
					var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
					var t1l = t1l + Kil;
					var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
					var t1l = t1l + Wil;
					var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);

					// t2 = sigma0 + maj
					var t2l = sigma0l + majl;
					var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);

					// Update working variables
					hh = gh;
					hl = gl;
					gh = fh;
					gl = fl;
					fh = eh;
					fl = el;
					el = dl + t1l | 0;
					eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
					dh = ch;
					dl = cl;
					ch = bh;
					cl = bl;
					bh = ah;
					bl = al;
					al = t1l + t2l | 0;
					ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
				}

				// Intermediate hash value
				H0l = H0.low = H0l + al;
				H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
				H1l = H1.low = H1l + bl;
				H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
				H2l = H2.low = H2l + cl;
				H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
				H3l = H3.low = H3l + dl;
				H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
				H4l = H4.low = H4l + el;
				H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
				H5l = H5.low = H5l + fl;
				H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
				H6l = H6.low = H6l + gl;
				H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
				H7l = H7.low = H7l + hl;
				H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
			},

			_doFinalize: function _doFinalize() {
				// Shortcuts
				var data = this._data;
				var dataWords = data.words;

				var nBitsTotal = this._nDataBytes * 8;
				var nBitsLeft = data.sigBytes * 8;

				// Add padding
				dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
				dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
				dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
				data.sigBytes = dataWords.length * 4;

				// Hash final blocks
				this._process();

				// Convert hash to 32-bit word array before returning
				var hash = this._hash.toX32();

				// Return final computed hash
				return hash;
			},

			clone: function clone() {
				var clone = Hasher.clone.call(this);
				clone._hash = this._hash.clone();

				return clone;
			},

			blockSize: 1024 / 32
		});

		/**
   * Shortcut function to the hasher's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   *
   * @return {WordArray} The hash.
   *
   * @static
   *
   * @example
   *
   *     var hash = CryptoJS.SHA512('message');
   *     var hash = CryptoJS.SHA512(wordArray);
   */
		C.SHA512 = Hasher._createHelper(SHA512);

		/**
   * Shortcut function to the HMAC's object interface.
   *
   * @param {WordArray|string} message The message to hash.
   * @param {WordArray|string} key The secret key.
   *
   * @return {WordArray} The HMAC.
   *
   * @static
   *
   * @example
   *
   *     var hmac = CryptoJS.HmacSHA512(message, key);
   */
		C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
	})();

	return CryptoJS.SHA512;
});

},{"./core":17,"./x64-core":48}],47:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory, undef) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function () {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var WordArray = C_lib.WordArray;
		var BlockCipher = C_lib.BlockCipher;
		var C_algo = C.algo;

		// Permuted Choice 1 constants
		var PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];

		// Permuted Choice 2 constants
		var PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];

		// Cumulative bit shift constants
		var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

		// SBOXes and round permutation constants
		var SBOX_P = [{
			0x0: 0x808200,
			0x10000000: 0x8000,
			0x20000000: 0x808002,
			0x30000000: 0x2,
			0x40000000: 0x200,
			0x50000000: 0x808202,
			0x60000000: 0x800202,
			0x70000000: 0x800000,
			0x80000000: 0x202,
			0x90000000: 0x800200,
			0xa0000000: 0x8200,
			0xb0000000: 0x808000,
			0xc0000000: 0x8002,
			0xd0000000: 0x800002,
			0xe0000000: 0x0,
			0xf0000000: 0x8202,
			0x8000000: 0x0,
			0x18000000: 0x808202,
			0x28000000: 0x8202,
			0x38000000: 0x8000,
			0x48000000: 0x808200,
			0x58000000: 0x200,
			0x68000000: 0x808002,
			0x78000000: 0x2,
			0x88000000: 0x800200,
			0x98000000: 0x8200,
			0xa8000000: 0x808000,
			0xb8000000: 0x800202,
			0xc8000000: 0x800002,
			0xd8000000: 0x8002,
			0xe8000000: 0x202,
			0xf8000000: 0x800000,
			0x1: 0x8000,
			0x10000001: 0x2,
			0x20000001: 0x808200,
			0x30000001: 0x800000,
			0x40000001: 0x808002,
			0x50000001: 0x8200,
			0x60000001: 0x200,
			0x70000001: 0x800202,
			0x80000001: 0x808202,
			0x90000001: 0x808000,
			0xa0000001: 0x800002,
			0xb0000001: 0x8202,
			0xc0000001: 0x202,
			0xd0000001: 0x800200,
			0xe0000001: 0x8002,
			0xf0000001: 0x0,
			0x8000001: 0x808202,
			0x18000001: 0x808000,
			0x28000001: 0x800000,
			0x38000001: 0x200,
			0x48000001: 0x8000,
			0x58000001: 0x800002,
			0x68000001: 0x2,
			0x78000001: 0x8202,
			0x88000001: 0x8002,
			0x98000001: 0x800202,
			0xa8000001: 0x202,
			0xb8000001: 0x808200,
			0xc8000001: 0x800200,
			0xd8000001: 0x0,
			0xe8000001: 0x8200,
			0xf8000001: 0x808002
		}, {
			0x0: 0x40084010,
			0x1000000: 0x4000,
			0x2000000: 0x80000,
			0x3000000: 0x40080010,
			0x4000000: 0x40000010,
			0x5000000: 0x40084000,
			0x6000000: 0x40004000,
			0x7000000: 0x10,
			0x8000000: 0x84000,
			0x9000000: 0x40004010,
			0xa000000: 0x40000000,
			0xb000000: 0x84010,
			0xc000000: 0x80010,
			0xd000000: 0x0,
			0xe000000: 0x4010,
			0xf000000: 0x40080000,
			0x800000: 0x40004000,
			0x1800000: 0x84010,
			0x2800000: 0x10,
			0x3800000: 0x40004010,
			0x4800000: 0x40084010,
			0x5800000: 0x40000000,
			0x6800000: 0x80000,
			0x7800000: 0x40080010,
			0x8800000: 0x80010,
			0x9800000: 0x0,
			0xa800000: 0x4000,
			0xb800000: 0x40080000,
			0xc800000: 0x40000010,
			0xd800000: 0x84000,
			0xe800000: 0x40084000,
			0xf800000: 0x4010,
			0x10000000: 0x0,
			0x11000000: 0x40080010,
			0x12000000: 0x40004010,
			0x13000000: 0x40084000,
			0x14000000: 0x40080000,
			0x15000000: 0x10,
			0x16000000: 0x84010,
			0x17000000: 0x4000,
			0x18000000: 0x4010,
			0x19000000: 0x80000,
			0x1a000000: 0x80010,
			0x1b000000: 0x40000010,
			0x1c000000: 0x84000,
			0x1d000000: 0x40004000,
			0x1e000000: 0x40000000,
			0x1f000000: 0x40084010,
			0x10800000: 0x84010,
			0x11800000: 0x80000,
			0x12800000: 0x40080000,
			0x13800000: 0x4000,
			0x14800000: 0x40004000,
			0x15800000: 0x40084010,
			0x16800000: 0x10,
			0x17800000: 0x40000000,
			0x18800000: 0x40084000,
			0x19800000: 0x40000010,
			0x1a800000: 0x40004010,
			0x1b800000: 0x80010,
			0x1c800000: 0x0,
			0x1d800000: 0x4010,
			0x1e800000: 0x40080010,
			0x1f800000: 0x84000
		}, {
			0x0: 0x104,
			0x100000: 0x0,
			0x200000: 0x4000100,
			0x300000: 0x10104,
			0x400000: 0x10004,
			0x500000: 0x4000004,
			0x600000: 0x4010104,
			0x700000: 0x4010000,
			0x800000: 0x4000000,
			0x900000: 0x4010100,
			0xa00000: 0x10100,
			0xb00000: 0x4010004,
			0xc00000: 0x4000104,
			0xd00000: 0x10000,
			0xe00000: 0x4,
			0xf00000: 0x100,
			0x80000: 0x4010100,
			0x180000: 0x4010004,
			0x280000: 0x0,
			0x380000: 0x4000100,
			0x480000: 0x4000004,
			0x580000: 0x10000,
			0x680000: 0x10004,
			0x780000: 0x104,
			0x880000: 0x4,
			0x980000: 0x100,
			0xa80000: 0x4010000,
			0xb80000: 0x10104,
			0xc80000: 0x10100,
			0xd80000: 0x4000104,
			0xe80000: 0x4010104,
			0xf80000: 0x4000000,
			0x1000000: 0x4010100,
			0x1100000: 0x10004,
			0x1200000: 0x10000,
			0x1300000: 0x4000100,
			0x1400000: 0x100,
			0x1500000: 0x4010104,
			0x1600000: 0x4000004,
			0x1700000: 0x0,
			0x1800000: 0x4000104,
			0x1900000: 0x4000000,
			0x1a00000: 0x4,
			0x1b00000: 0x10100,
			0x1c00000: 0x4010000,
			0x1d00000: 0x104,
			0x1e00000: 0x10104,
			0x1f00000: 0x4010004,
			0x1080000: 0x4000000,
			0x1180000: 0x104,
			0x1280000: 0x4010100,
			0x1380000: 0x0,
			0x1480000: 0x10004,
			0x1580000: 0x4000100,
			0x1680000: 0x100,
			0x1780000: 0x4010004,
			0x1880000: 0x10000,
			0x1980000: 0x4010104,
			0x1a80000: 0x10104,
			0x1b80000: 0x4000004,
			0x1c80000: 0x4000104,
			0x1d80000: 0x4010000,
			0x1e80000: 0x4,
			0x1f80000: 0x10100
		}, {
			0x0: 0x80401000,
			0x10000: 0x80001040,
			0x20000: 0x401040,
			0x30000: 0x80400000,
			0x40000: 0x0,
			0x50000: 0x401000,
			0x60000: 0x80000040,
			0x70000: 0x400040,
			0x80000: 0x80000000,
			0x90000: 0x400000,
			0xa0000: 0x40,
			0xb0000: 0x80001000,
			0xc0000: 0x80400040,
			0xd0000: 0x1040,
			0xe0000: 0x1000,
			0xf0000: 0x80401040,
			0x8000: 0x80001040,
			0x18000: 0x40,
			0x28000: 0x80400040,
			0x38000: 0x80001000,
			0x48000: 0x401000,
			0x58000: 0x80401040,
			0x68000: 0x0,
			0x78000: 0x80400000,
			0x88000: 0x1000,
			0x98000: 0x80401000,
			0xa8000: 0x400000,
			0xb8000: 0x1040,
			0xc8000: 0x80000000,
			0xd8000: 0x400040,
			0xe8000: 0x401040,
			0xf8000: 0x80000040,
			0x100000: 0x400040,
			0x110000: 0x401000,
			0x120000: 0x80000040,
			0x130000: 0x0,
			0x140000: 0x1040,
			0x150000: 0x80400040,
			0x160000: 0x80401000,
			0x170000: 0x80001040,
			0x180000: 0x80401040,
			0x190000: 0x80000000,
			0x1a0000: 0x80400000,
			0x1b0000: 0x401040,
			0x1c0000: 0x80001000,
			0x1d0000: 0x400000,
			0x1e0000: 0x40,
			0x1f0000: 0x1000,
			0x108000: 0x80400000,
			0x118000: 0x80401040,
			0x128000: 0x0,
			0x138000: 0x401000,
			0x148000: 0x400040,
			0x158000: 0x80000000,
			0x168000: 0x80001040,
			0x178000: 0x40,
			0x188000: 0x80000040,
			0x198000: 0x1000,
			0x1a8000: 0x80001000,
			0x1b8000: 0x80400040,
			0x1c8000: 0x1040,
			0x1d8000: 0x80401000,
			0x1e8000: 0x400000,
			0x1f8000: 0x401040
		}, {
			0x0: 0x80,
			0x1000: 0x1040000,
			0x2000: 0x40000,
			0x3000: 0x20000000,
			0x4000: 0x20040080,
			0x5000: 0x1000080,
			0x6000: 0x21000080,
			0x7000: 0x40080,
			0x8000: 0x1000000,
			0x9000: 0x20040000,
			0xa000: 0x20000080,
			0xb000: 0x21040080,
			0xc000: 0x21040000,
			0xd000: 0x0,
			0xe000: 0x1040080,
			0xf000: 0x21000000,
			0x800: 0x1040080,
			0x1800: 0x21000080,
			0x2800: 0x80,
			0x3800: 0x1040000,
			0x4800: 0x40000,
			0x5800: 0x20040080,
			0x6800: 0x21040000,
			0x7800: 0x20000000,
			0x8800: 0x20040000,
			0x9800: 0x0,
			0xa800: 0x21040080,
			0xb800: 0x1000080,
			0xc800: 0x20000080,
			0xd800: 0x21000000,
			0xe800: 0x1000000,
			0xf800: 0x40080,
			0x10000: 0x40000,
			0x11000: 0x80,
			0x12000: 0x20000000,
			0x13000: 0x21000080,
			0x14000: 0x1000080,
			0x15000: 0x21040000,
			0x16000: 0x20040080,
			0x17000: 0x1000000,
			0x18000: 0x21040080,
			0x19000: 0x21000000,
			0x1a000: 0x1040000,
			0x1b000: 0x20040000,
			0x1c000: 0x40080,
			0x1d000: 0x20000080,
			0x1e000: 0x0,
			0x1f000: 0x1040080,
			0x10800: 0x21000080,
			0x11800: 0x1000000,
			0x12800: 0x1040000,
			0x13800: 0x20040080,
			0x14800: 0x20000000,
			0x15800: 0x1040080,
			0x16800: 0x80,
			0x17800: 0x21040000,
			0x18800: 0x40080,
			0x19800: 0x21040080,
			0x1a800: 0x0,
			0x1b800: 0x21000000,
			0x1c800: 0x1000080,
			0x1d800: 0x40000,
			0x1e800: 0x20040000,
			0x1f800: 0x20000080
		}, {
			0x0: 0x10000008,
			0x100: 0x2000,
			0x200: 0x10200000,
			0x300: 0x10202008,
			0x400: 0x10002000,
			0x500: 0x200000,
			0x600: 0x200008,
			0x700: 0x10000000,
			0x800: 0x0,
			0x900: 0x10002008,
			0xa00: 0x202000,
			0xb00: 0x8,
			0xc00: 0x10200008,
			0xd00: 0x202008,
			0xe00: 0x2008,
			0xf00: 0x10202000,
			0x80: 0x10200000,
			0x180: 0x10202008,
			0x280: 0x8,
			0x380: 0x200000,
			0x480: 0x202008,
			0x580: 0x10000008,
			0x680: 0x10002000,
			0x780: 0x2008,
			0x880: 0x200008,
			0x980: 0x2000,
			0xa80: 0x10002008,
			0xb80: 0x10200008,
			0xc80: 0x0,
			0xd80: 0x10202000,
			0xe80: 0x202000,
			0xf80: 0x10000000,
			0x1000: 0x10002000,
			0x1100: 0x10200008,
			0x1200: 0x10202008,
			0x1300: 0x2008,
			0x1400: 0x200000,
			0x1500: 0x10000000,
			0x1600: 0x10000008,
			0x1700: 0x202000,
			0x1800: 0x202008,
			0x1900: 0x0,
			0x1a00: 0x8,
			0x1b00: 0x10200000,
			0x1c00: 0x2000,
			0x1d00: 0x10002008,
			0x1e00: 0x10202000,
			0x1f00: 0x200008,
			0x1080: 0x8,
			0x1180: 0x202000,
			0x1280: 0x200000,
			0x1380: 0x10000008,
			0x1480: 0x10002000,
			0x1580: 0x2008,
			0x1680: 0x10202008,
			0x1780: 0x10200000,
			0x1880: 0x10202000,
			0x1980: 0x10200008,
			0x1a80: 0x2000,
			0x1b80: 0x202008,
			0x1c80: 0x200008,
			0x1d80: 0x0,
			0x1e80: 0x10000000,
			0x1f80: 0x10002008
		}, {
			0x0: 0x100000,
			0x10: 0x2000401,
			0x20: 0x400,
			0x30: 0x100401,
			0x40: 0x2100401,
			0x50: 0x0,
			0x60: 0x1,
			0x70: 0x2100001,
			0x80: 0x2000400,
			0x90: 0x100001,
			0xa0: 0x2000001,
			0xb0: 0x2100400,
			0xc0: 0x2100000,
			0xd0: 0x401,
			0xe0: 0x100400,
			0xf0: 0x2000000,
			0x8: 0x2100001,
			0x18: 0x0,
			0x28: 0x2000401,
			0x38: 0x2100400,
			0x48: 0x100000,
			0x58: 0x2000001,
			0x68: 0x2000000,
			0x78: 0x401,
			0x88: 0x100401,
			0x98: 0x2000400,
			0xa8: 0x2100000,
			0xb8: 0x100001,
			0xc8: 0x400,
			0xd8: 0x2100401,
			0xe8: 0x1,
			0xf8: 0x100400,
			0x100: 0x2000000,
			0x110: 0x100000,
			0x120: 0x2000401,
			0x130: 0x2100001,
			0x140: 0x100001,
			0x150: 0x2000400,
			0x160: 0x2100400,
			0x170: 0x100401,
			0x180: 0x401,
			0x190: 0x2100401,
			0x1a0: 0x100400,
			0x1b0: 0x1,
			0x1c0: 0x0,
			0x1d0: 0x2100000,
			0x1e0: 0x2000001,
			0x1f0: 0x400,
			0x108: 0x100400,
			0x118: 0x2000401,
			0x128: 0x2100001,
			0x138: 0x1,
			0x148: 0x2000000,
			0x158: 0x100000,
			0x168: 0x401,
			0x178: 0x2100400,
			0x188: 0x2000001,
			0x198: 0x2100000,
			0x1a8: 0x0,
			0x1b8: 0x2100401,
			0x1c8: 0x100401,
			0x1d8: 0x400,
			0x1e8: 0x2000400,
			0x1f8: 0x100001
		}, {
			0x0: 0x8000820,
			0x1: 0x20000,
			0x2: 0x8000000,
			0x3: 0x20,
			0x4: 0x20020,
			0x5: 0x8020820,
			0x6: 0x8020800,
			0x7: 0x800,
			0x8: 0x8020000,
			0x9: 0x8000800,
			0xa: 0x20800,
			0xb: 0x8020020,
			0xc: 0x820,
			0xd: 0x0,
			0xe: 0x8000020,
			0xf: 0x20820,
			0x80000000: 0x800,
			0x80000001: 0x8020820,
			0x80000002: 0x8000820,
			0x80000003: 0x8000000,
			0x80000004: 0x8020000,
			0x80000005: 0x20800,
			0x80000006: 0x20820,
			0x80000007: 0x20,
			0x80000008: 0x8000020,
			0x80000009: 0x820,
			0x8000000a: 0x20020,
			0x8000000b: 0x8020800,
			0x8000000c: 0x0,
			0x8000000d: 0x8020020,
			0x8000000e: 0x8000800,
			0x8000000f: 0x20000,
			0x10: 0x20820,
			0x11: 0x8020800,
			0x12: 0x20,
			0x13: 0x800,
			0x14: 0x8000800,
			0x15: 0x8000020,
			0x16: 0x8020020,
			0x17: 0x20000,
			0x18: 0x0,
			0x19: 0x20020,
			0x1a: 0x8020000,
			0x1b: 0x8000820,
			0x1c: 0x8020820,
			0x1d: 0x20800,
			0x1e: 0x820,
			0x1f: 0x8000000,
			0x80000010: 0x20000,
			0x80000011: 0x800,
			0x80000012: 0x8020020,
			0x80000013: 0x20820,
			0x80000014: 0x20,
			0x80000015: 0x8020000,
			0x80000016: 0x8000000,
			0x80000017: 0x8000820,
			0x80000018: 0x8020820,
			0x80000019: 0x8000020,
			0x8000001a: 0x8000800,
			0x8000001b: 0x0,
			0x8000001c: 0x20800,
			0x8000001d: 0x820,
			0x8000001e: 0x20020,
			0x8000001f: 0x8020800
		}];

		// Masks that select the SBOX input
		var SBOX_MASK = [0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000, 0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f];

		/**
   * DES block cipher algorithm.
   */
		var DES = C_algo.DES = BlockCipher.extend({
			_doReset: function _doReset() {
				// Shortcuts
				var key = this._key;
				var keyWords = key.words;

				// Select 56 bits according to PC1
				var keyBits = [];
				for (var i = 0; i < 56; i++) {
					var keyBitPos = PC1[i] - 1;
					keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
				}

				// Assemble 16 subkeys
				var subKeys = this._subKeys = [];
				for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
					// Create subkey
					var subKey = subKeys[nSubKey] = [];

					// Shortcut
					var bitShift = BIT_SHIFTS[nSubKey];

					// Select 48 bits according to PC2
					for (var i = 0; i < 24; i++) {
						// Select from the left 28 key bits
						subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;

						// Select from the right 28 key bits
						subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
					}

					// Since each subkey is applied to an expanded 32-bit input,
					// the subkey can be broken into 8 values scaled to 32-bits,
					// which allows the key to be used without expansion
					subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
					for (var i = 1; i < 7; i++) {
						subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
					}
					subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
				}

				// Compute inverse subkeys
				var invSubKeys = this._invSubKeys = [];
				for (var i = 0; i < 16; i++) {
					invSubKeys[i] = subKeys[15 - i];
				}
			},

			encryptBlock: function encryptBlock(M, offset) {
				this._doCryptBlock(M, offset, this._subKeys);
			},

			decryptBlock: function decryptBlock(M, offset) {
				this._doCryptBlock(M, offset, this._invSubKeys);
			},

			_doCryptBlock: function _doCryptBlock(M, offset, subKeys) {
				// Get input
				this._lBlock = M[offset];
				this._rBlock = M[offset + 1];

				// Initial permutation
				exchangeLR.call(this, 4, 0x0f0f0f0f);
				exchangeLR.call(this, 16, 0x0000ffff);
				exchangeRL.call(this, 2, 0x33333333);
				exchangeRL.call(this, 8, 0x00ff00ff);
				exchangeLR.call(this, 1, 0x55555555);

				// Rounds
				for (var round = 0; round < 16; round++) {
					// Shortcuts
					var subKey = subKeys[round];
					var lBlock = this._lBlock;
					var rBlock = this._rBlock;

					// Feistel function
					var f = 0;
					for (var i = 0; i < 8; i++) {
						f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
					}
					this._lBlock = rBlock;
					this._rBlock = lBlock ^ f;
				}

				// Undo swap from last round
				var t = this._lBlock;
				this._lBlock = this._rBlock;
				this._rBlock = t;

				// Final permutation
				exchangeLR.call(this, 1, 0x55555555);
				exchangeRL.call(this, 8, 0x00ff00ff);
				exchangeRL.call(this, 2, 0x33333333);
				exchangeLR.call(this, 16, 0x0000ffff);
				exchangeLR.call(this, 4, 0x0f0f0f0f);

				// Set output
				M[offset] = this._lBlock;
				M[offset + 1] = this._rBlock;
			},

			keySize: 64 / 32,

			ivSize: 64 / 32,

			blockSize: 64 / 32
		});

		// Swap bits across the left and right words
		function exchangeLR(offset, mask) {
			var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
			this._rBlock ^= t;
			this._lBlock ^= t << offset;
		}

		function exchangeRL(offset, mask) {
			var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
			this._lBlock ^= t;
			this._rBlock ^= t << offset;
		}

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
   */
		C.DES = BlockCipher._createHelper(DES);

		/**
   * Triple-DES block cipher algorithm.
   */
		var TripleDES = C_algo.TripleDES = BlockCipher.extend({
			_doReset: function _doReset() {
				// Shortcuts
				var key = this._key;
				var keyWords = key.words;

				// Create DES instances
				this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
				this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
				this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
			},

			encryptBlock: function encryptBlock(M, offset) {
				this._des1.encryptBlock(M, offset);
				this._des2.decryptBlock(M, offset);
				this._des3.encryptBlock(M, offset);
			},

			decryptBlock: function decryptBlock(M, offset) {
				this._des3.decryptBlock(M, offset);
				this._des2.encryptBlock(M, offset);
				this._des1.decryptBlock(M, offset);
			},

			keySize: 192 / 32,

			ivSize: 64 / 32,

			blockSize: 64 / 32
		});

		/**
   * Shortcut functions to the cipher's object interface.
   *
   * @example
   *
   *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
   *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
   */
		C.TripleDES = BlockCipher._createHelper(TripleDES);
	})();

	return CryptoJS.TripleDES;
});

},{"./cipher-core":16,"./core":17,"./enc-base64":18,"./evpkdf":20,"./md5":25}],48:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (root, factory) {
	if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	} else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	} else {
		// Global (browser)
		factory(root.CryptoJS);
	}
})(undefined, function (CryptoJS) {

	(function (undefined) {
		// Shortcuts
		var C = CryptoJS;
		var C_lib = C.lib;
		var Base = C_lib.Base;
		var X32WordArray = C_lib.WordArray;

		/**
   * x64 namespace.
   */
		var C_x64 = C.x64 = {};

		/**
   * A 64-bit word.
   */
		var X64Word = C_x64.Word = Base.extend({
			/**
    * Initializes a newly created 64-bit word.
    *
    * @param {number} high The high 32 bits.
    * @param {number} low The low 32 bits.
    *
    * @example
    *
    *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
    */
			init: function init(high, low) {
				this.high = high;
				this.low = low;
			}

			/**
    * Bitwise NOTs this word.
    *
    * @return {X64Word} A new x64-Word object after negating.
    *
    * @example
    *
    *     var negated = x64Word.not();
    */
			// not: function () {
			// var high = ~this.high;
			// var low = ~this.low;

			// return X64Word.create(high, low);
			// },

			/**
    * Bitwise ANDs this word with the passed word.
    *
    * @param {X64Word} word The x64-Word to AND with this word.
    *
    * @return {X64Word} A new x64-Word object after ANDing.
    *
    * @example
    *
    *     var anded = x64Word.and(anotherX64Word);
    */
			// and: function (word) {
			// var high = this.high & word.high;
			// var low = this.low & word.low;

			// return X64Word.create(high, low);
			// },

			/**
    * Bitwise ORs this word with the passed word.
    *
    * @param {X64Word} word The x64-Word to OR with this word.
    *
    * @return {X64Word} A new x64-Word object after ORing.
    *
    * @example
    *
    *     var ored = x64Word.or(anotherX64Word);
    */
			// or: function (word) {
			// var high = this.high | word.high;
			// var low = this.low | word.low;

			// return X64Word.create(high, low);
			// },

			/**
    * Bitwise XORs this word with the passed word.
    *
    * @param {X64Word} word The x64-Word to XOR with this word.
    *
    * @return {X64Word} A new x64-Word object after XORing.
    *
    * @example
    *
    *     var xored = x64Word.xor(anotherX64Word);
    */
			// xor: function (word) {
			// var high = this.high ^ word.high;
			// var low = this.low ^ word.low;

			// return X64Word.create(high, low);
			// },

			/**
    * Shifts this word n bits to the left.
    *
    * @param {number} n The number of bits to shift.
    *
    * @return {X64Word} A new x64-Word object after shifting.
    *
    * @example
    *
    *     var shifted = x64Word.shiftL(25);
    */
			// shiftL: function (n) {
			// if (n < 32) {
			// var high = (this.high << n) | (this.low >>> (32 - n));
			// var low = this.low << n;
			// } else {
			// var high = this.low << (n - 32);
			// var low = 0;
			// }

			// return X64Word.create(high, low);
			// },

			/**
    * Shifts this word n bits to the right.
    *
    * @param {number} n The number of bits to shift.
    *
    * @return {X64Word} A new x64-Word object after shifting.
    *
    * @example
    *
    *     var shifted = x64Word.shiftR(7);
    */
			// shiftR: function (n) {
			// if (n < 32) {
			// var low = (this.low >>> n) | (this.high << (32 - n));
			// var high = this.high >>> n;
			// } else {
			// var low = this.high >>> (n - 32);
			// var high = 0;
			// }

			// return X64Word.create(high, low);
			// },

			/**
    * Rotates this word n bits to the left.
    *
    * @param {number} n The number of bits to rotate.
    *
    * @return {X64Word} A new x64-Word object after rotating.
    *
    * @example
    *
    *     var rotated = x64Word.rotL(25);
    */
			// rotL: function (n) {
			// return this.shiftL(n).or(this.shiftR(64 - n));
			// },

			/**
    * Rotates this word n bits to the right.
    *
    * @param {number} n The number of bits to rotate.
    *
    * @return {X64Word} A new x64-Word object after rotating.
    *
    * @example
    *
    *     var rotated = x64Word.rotR(7);
    */
			// rotR: function (n) {
			// return this.shiftR(n).or(this.shiftL(64 - n));
			// },

			/**
    * Adds this word with the passed word.
    *
    * @param {X64Word} word The x64-Word to add with this word.
    *
    * @return {X64Word} A new x64-Word object after adding.
    *
    * @example
    *
    *     var added = x64Word.add(anotherX64Word);
    */
			// add: function (word) {
			// var low = (this.low + word.low) | 0;
			// var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
			// var high = (this.high + word.high + carry) | 0;

			// return X64Word.create(high, low);
			// }
		});

		/**
   * An array of 64-bit words.
   *
   * @property {Array} words The array of CryptoJS.x64.Word objects.
   * @property {number} sigBytes The number of significant bytes in this word array.
   */
		var X64WordArray = C_x64.WordArray = Base.extend({
			/**
    * Initializes a newly created word array.
    *
    * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
    * @param {number} sigBytes (Optional) The number of significant bytes in the words.
    *
    * @example
    *
    *     var wordArray = CryptoJS.x64.WordArray.create();
    *
    *     var wordArray = CryptoJS.x64.WordArray.create([
    *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
    *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
    *     ]);
    *
    *     var wordArray = CryptoJS.x64.WordArray.create([
    *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
    *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
    *     ], 10);
    */
			init: function init(words, sigBytes) {
				words = this.words = words || [];

				if (sigBytes != undefined) {
					this.sigBytes = sigBytes;
				} else {
					this.sigBytes = words.length * 8;
				}
			},

			/**
    * Converts this 64-bit word array to a 32-bit word array.
    *
    * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
    *
    * @example
    *
    *     var x32WordArray = x64WordArray.toX32();
    */
			toX32: function toX32() {
				// Shortcuts
				var x64Words = this.words;
				var x64WordsLength = x64Words.length;

				// Convert
				var x32Words = [];
				for (var i = 0; i < x64WordsLength; i++) {
					var x64Word = x64Words[i];
					x32Words.push(x64Word.high);
					x32Words.push(x64Word.low);
				}

				return X32WordArray.create(x32Words, this.sigBytes);
			},

			/**
    * Creates a copy of this word array.
    *
    * @return {X64WordArray} The clone.
    *
    * @example
    *
    *     var clone = x64WordArray.clone();
    */
			clone: function clone() {
				var clone = Base.clone.call(this);

				// Clone "words" array
				var words = clone.words = this.words.slice(0);

				// Clone each X64Word object
				var wordsLength = words.length;
				for (var i = 0; i < wordsLength; i++) {
					words[i] = words[i].clone();
				}

				return clone;
			}
		});
	})();

	return CryptoJS;
});

},{"./core":17}],49:[function(require,module,exports){
'use strict';

module.exports = require('./lib/csjs');

},{"./lib/csjs":55}],50:[function(require,module,exports){
'use strict';

module.exports = require('./lib/get-css');

},{"./lib/get-css":58}],51:[function(require,module,exports){
'use strict';

var csjs = require('./csjs');

module.exports = csjs;
module.exports.csjs = csjs;
module.exports.getCss = require('./get-css');

},{"./csjs":49,"./get-css":50}],52:[function(require,module,exports){
'use strict';

/**
 * base62 encode implementation based on base62 module:
 * https://github.com/andrew/base62.js
 */

var CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = function encode(integer) {
  if (integer === 0) {
    return '0';
  }
  var str = '';
  while (integer > 0) {
    str = CHARS[integer % 62] + str;
    integer = Math.floor(integer / 62);
  }
  return str;
};

},{}],53:[function(require,module,exports){
'use strict';

var makeComposition = require('./composition').makeComposition;

module.exports = function createExports(classes, keyframes, compositions) {
  var keyframesObj = Object.keys(keyframes).reduce(function (acc, key) {
    var val = keyframes[key];
    acc[val] = makeComposition([key], [val], true);
    return acc;
  }, {});

  var exports = Object.keys(classes).reduce(function (acc, key) {
    var val = classes[key];
    var composition = compositions[key];
    var extended = composition ? getClassChain(composition) : [];
    var allClasses = [key].concat(extended);
    var unscoped = allClasses.map(function (name) {
      return classes[name] ? classes[name] : name;
    });
    acc[val] = makeComposition(allClasses, unscoped);
    return acc;
  }, keyframesObj);

  return exports;
};

function getClassChain(obj) {
  var visited = {},
      acc = [];

  function traverse(obj) {
    return Object.keys(obj).forEach(function (key) {
      if (!visited[key]) {
        visited[key] = true;
        acc.push(key);
        traverse(obj[key]);
      }
    });
  }

  traverse(obj);
  return acc;
}

},{"./composition":54}],54:[function(require,module,exports){
'use strict';

module.exports = {
  makeComposition: makeComposition,
  isComposition: isComposition
};

/**
 * Returns an immutable composition object containing the given class names
 * @param  {array} classNames - The input array of class names
 * @return {Composition}      - An immutable object that holds multiple
 *                              representations of the class composition
 */
function makeComposition(classNames, unscoped, isAnimation) {
  var classString = classNames.join(' ');
  return Object.create(Composition.prototype, {
    classNames: { // the original array of class names
      value: Object.freeze(classNames),
      configurable: false,
      writable: false,
      enumerable: true
    },
    unscoped: { // the original array of class names
      value: Object.freeze(unscoped),
      configurable: false,
      writable: false,
      enumerable: true
    },
    className: { // space-separated class string for use in HTML
      value: classString,
      configurable: false,
      writable: false,
      enumerable: true
    },
    selector: { // comma-separated, period-prefixed string for use in CSS
      value: classNames.map(function (name) {
        return isAnimation ? name : '.' + name;
      }).join(', '),
      configurable: false,
      writable: false,
      enumerable: true
    },
    toString: { // toString() method, returns class string for use in HTML
      value: function value() {
        return classString;
      },
      configurable: false,
      writeable: false,
      enumerable: false
    }
  });
}

/**
 * Returns whether the input value is a Composition
 * @param value      - value to check
 * @return {boolean} - whether value is a Composition or not
 */
function isComposition(value) {
  return value instanceof Composition;
}

/**
 * Private constructor for use in `instanceof` checks
 */
function Composition() {}

},{}],55:[function(require,module,exports){
'use strict';

var extractExtends = require('./css-extract-extends');
var isComposition = require('./composition').isComposition;
var buildExports = require('./build-exports');
var scopify = require('./scopeify');
var cssKey = require('./css-key');

module.exports = function csjsHandler(strings) {
  // Fast path to prevent arguments deopt
  var values = Array(arguments.length - 1);
  for (var i = 1; i < arguments.length; i++) {
    values[i - 1] = arguments[i];
  }
  var css = joiner(strings, values.map(selectorize));

  var ignores = values.reduce(function (acc, val) {
    if (isComposition(val)) {
      val.classNames.forEach(function (name, i) {
        acc[name] = val.unscoped[i];
      });
    }
    return acc;
  }, {});

  var scoped = scopify(css, ignores);
  var extracted = extractExtends(scoped.css);

  var localClasses = without(scoped.classes, ignores);
  var localKeyframes = without(scoped.keyframes, ignores);
  var compositions = extracted.compositions;

  var exports = buildExports(localClasses, localKeyframes, compositions);

  return Object.defineProperty(exports, cssKey, {
    enumerable: false,
    configurable: false,
    writeable: false,
    value: extracted.css
  });
};

/**
 * Replaces class compositions with comma seperated class selectors
 * @param  value - the potential class composition
 * @return       - the original value or the selectorized class composition
 */
function selectorize(value) {
  return isComposition(value) ? value.selector : value;
}

/**
 * Joins template string literals and values
 * @param  {array} strings - array of strings
 * @param  {array} values  - array of values
 * @return {string}        - strings and values joined
 */
function joiner(strings, values) {
  return strings.map(function (str, i) {
    return i !== values.length ? str + values[i] : str;
  }).join('');
}

/**
 * Returns first object without keys of second
 * @param  {object} obj      - source object
 * @param  {object} unwanted - object with unwanted keys
 * @return {object}          - first object without unwanted keys
 */
function without(obj, unwanted) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (!unwanted[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

},{"./build-exports":53,"./composition":54,"./css-extract-extends":56,"./css-key":57,"./scopeify":61}],56:[function(require,module,exports){
'use strict';

var makeComposition = require('./composition').makeComposition;

var regex = /\.([^\s]+)(\s+)(extends\s+)(\.[^{]+)/g;

module.exports = function extractExtends(css) {
  var found,
      matches = [];
  while (found = regex.exec(css)) {
    matches.unshift(found);
  }

  function extractCompositions(acc, match) {
    var extendee = getClassName(match[1]);
    var keyword = match[3];
    var extended = match[4];

    // remove from output css
    var index = match.index + match[1].length + match[2].length;
    var len = keyword.length + extended.length;
    acc.css = acc.css.slice(0, index) + " " + acc.css.slice(index + len + 1);

    var extendedClasses = splitter(extended);

    extendedClasses.forEach(function (className) {
      if (!acc.compositions[extendee]) {
        acc.compositions[extendee] = {};
      }
      if (!acc.compositions[className]) {
        acc.compositions[className] = {};
      }
      acc.compositions[extendee][className] = acc.compositions[className];
    });
    return acc;
  }

  return matches.reduce(extractCompositions, {
    css: css,
    compositions: {}
  });
};

function splitter(match) {
  return match.split(',').map(getClassName);
}

function getClassName(str) {
  var trimmed = str.trim();
  return trimmed[0] === '.' ? trimmed.substr(1) : trimmed;
}

},{"./composition":54}],57:[function(require,module,exports){
'use strict';

/**
 * CSS identifiers with whitespace are invalid
 * Hence this key will not cause a collision
 */

module.exports = ' css ';

},{}],58:[function(require,module,exports){
'use strict';

var cssKey = require('./css-key');

module.exports = function getCss(csjs) {
  return csjs[cssKey];
};

},{"./css-key":57}],59:[function(require,module,exports){
'use strict';

/**
 * djb2 string hash implementation based on string-hash module:
 * https://github.com/darkskyapp/string-hash
 */

module.exports = function hashStr(str) {
  var hash = 5381;
  var i = str.length;

  while (i) {
    hash = hash * 33 ^ str.charCodeAt(--i);
  }
  return hash >>> 0;
};

},{}],60:[function(require,module,exports){
'use strict';

var encode = require('./base62-encode');
var hash = require('./hash-string');

module.exports = function fileScoper(fileSrc) {
  var suffix = encode(hash(fileSrc));

  return function scopedName(name) {
    return name + '_' + suffix;
  };
};

},{"./base62-encode":52,"./hash-string":59}],61:[function(require,module,exports){
'use strict';

var fileScoper = require('./scoped-name');

var findClasses = /(\.)(?!\d)([^\s\.,{\[>+~#:)]*)(?![^{]*})/.source;
var findKeyframes = /(@\S*keyframes\s*)([^{\s]*)/.source;
var ignoreComments = /(?!(?:[^*/]|\*[^/]|\/[^*])*\*+\/)/.source;

var classRegex = new RegExp(findClasses + ignoreComments, 'g');
var keyframesRegex = new RegExp(findKeyframes + ignoreComments, 'g');

module.exports = scopify;

function scopify(css, ignores) {
  var makeScopedName = fileScoper(css);
  var replacers = {
    classes: classRegex,
    keyframes: keyframesRegex
  };

  function scopeCss(result, key) {
    var replacer = replacers[key];
    function replaceFn(fullMatch, prefix, name) {
      var scopedName = ignores[name] ? name : makeScopedName(name);
      result[key][scopedName] = name;
      return prefix + scopedName;
    }
    return {
      css: result.css.replace(replacer, replaceFn),
      keyframes: result.keyframes,
      classes: result.classes
    };
  }

  var result = Object.keys(replacers).reduce(scopeCss, {
    css: css,
    keyframes: {},
    classes: {}
  });

  return replaceAnimations(result);
}

function replaceAnimations(result) {
  var animations = Object.keys(result.keyframes).reduce(function (acc, key) {
    acc[result.keyframes[key]] = key;
    return acc;
  }, {});
  var unscoped = Object.keys(animations);

  if (unscoped.length) {
    var regexStr = '((?:animation|animation-name)\\s*:[^};]*)(' + unscoped.join('|') + ')([;\\s])' + ignoreComments;
    var regex = new RegExp(regexStr, 'g');

    var replaced = result.css.replace(regex, function (match, preamble, name, ending) {
      return preamble + animations[name] + ending;
    });

    return {
      css: replaced,
      keyframes: result.keyframes,
      classes: result.classes
    };
  }

  return result;
}

},{"./scoped-name":60}],62:[function(require,module,exports){
(function (global){
'use strict';

var topLevel = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":13}],63:[function(require,module,exports){
(function (global){
"use strict";

if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined") {
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],64:[function(require,module,exports){
'use strict';

module.exports = attributeToProperty;

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
};

function attributeToProperty(h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr];
        delete attrs[attr];
      }
    }
    return h(tagName, attrs, children);
  };
}

},{}],65:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var attrToProp = require('hyperscript-attribute-to-property');

var VAR = 0,
    TEXT = 1,
    OPEN = 2,
    CLOSE = 3,
    ATTR = 4;
var ATTR_KEY = 5,
    ATTR_KEY_W = 6;
var ATTR_VALUE_W = 7,
    ATTR_VALUE = 8;
var ATTR_VALUE_SQ = 9,
    ATTR_VALUE_DQ = 10;
var ATTR_EQ = 11,
    ATTR_BREAK = 12;

module.exports = function (h, opts) {
  h = attrToProp(h);
  if (!opts) opts = {};
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b);
  };

  return function (strings) {
    var state = TEXT,
        reg = '';
    var arglen = arguments.length;
    var parts = [];

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i + 1];
        var p = parse(strings[i]);
        var xstate = state;
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE;
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE;
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE;
        if (xstate === ATTR) xstate = ATTR_KEY;
        p.push([VAR, xstate, arg]);
        parts.push.apply(parts, p);
      } else parts.push.apply(parts, parse(strings[i]));
    }

    var tree = [null, {}, []];
    var stack = [[tree, -1]];
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length - 1][0];
      var p = parts[i],
          s = p[0];
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length - 1][1];
        if (stack.length > 1) {
          stack.pop();
          stack[stack.length - 1][0][2][ix] = h(cur[0], cur[1], cur[2].length ? cur[2] : undefined);
        }
      } else if (s === OPEN) {
        var c = [p[1], {}, []];
        cur[2].push(c);
        stack.push([c, cur[2].length - 1]);
      } else if (s === ATTR_KEY || s === VAR && p[1] === ATTR_KEY) {
        var key = '';
        var copyKey;
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1]);
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (_typeof(parts[i][2]) === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey];
                }
              }
            } else {
              key = concat(key, parts[i][2]);
            }
          } else break;
        }
        if (parts[i][0] === ATTR_EQ) i++;
        var j = i;
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1]);else cur[1][key] = concat(cur[1][key], parts[i][1]);
          } else if (parts[i][0] === VAR && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2]);else cur[1][key] = concat(cur[1][key], parts[i][2]);
          } else {
            if (key.length && !cur[1][key] && i === j && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase();
            }
            break;
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true;
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true;
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length - 1][1];
          stack.pop();
          stack[stack.length - 1][0][2][ix] = h(cur[0], cur[1], cur[2].length ? cur[2] : undefined);
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = '';else if (!p[2]) p[2] = concat('', p[2]);
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2]);
        } else {
          cur[2].push(p[2]);
        }
      } else if (s === TEXT) {
        cur[2].push(p[1]);
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s);
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift();
    }

    if (tree[2].length > 2 || tree[2].length === 2 && /\S/.test(tree[2][1])) {
      throw new Error('multiple root elements must be wrapped in an enclosing tag');
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string' && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2]);
    }
    return tree[2][0];

    function parse(str) {
      var res = [];
      if (state === ATTR_VALUE_W) state = ATTR;
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg]);
          reg = '';
          state = OPEN;
        } else if (c === '>' && !quot(state)) {
          if (state === OPEN) {
            res.push([OPEN, reg]);
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY, reg]);
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE, reg]);
          }
          res.push([CLOSE]);
          reg = '';
          state = TEXT;
        } else if (state === TEXT) {
          reg += c;
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg]);
          reg = '';
          state = ATTR;
        } else if (state === OPEN) {
          reg += c;
        } else if (state === ATTR && /[\w-]/.test(c)) {
          state = ATTR_KEY;
          reg = c;
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY, reg]);
          res.push([ATTR_BREAK]);
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY, reg]);
          reg = '';
          state = ATTR_KEY_W;
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY, reg], [ATTR_EQ]);
          reg = '';
          state = ATTR_VALUE_W;
        } else if (state === ATTR_KEY) {
          reg += c;
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ]);
          state = ATTR_VALUE_W;
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK]);
          if (/[\w-]/.test(c)) {
            reg += c;
            state = ATTR_KEY;
          } else state = ATTR;
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ;
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ;
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
          reg = '';
          state = ATTR;
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
          reg = '';
          state = ATTR;
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE;
          i--;
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
          reg = '';
          state = ATTR;
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ) {
          reg += c;
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT, reg]);
        reg = '';
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE, reg]);
        reg = '';
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE, reg]);
        reg = '';
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE, reg]);
        reg = '';
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY, reg]);
        reg = '';
      }
      return res;
    }
  };

  function strfn(x) {
    if (typeof x === 'function') return x;else if (typeof x === 'string') return x;else if (x && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') return x;else return concat('', x);
  }
};

function quot(state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ;
}

var hasOwn = Object.prototype.hasOwnProperty;
function has(obj, key) {
  return hasOwn.call(obj, key);
}

var closeRE = RegExp('^(' + ['area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed', 'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr',
// SVG TAGS
'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri', 'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath', 'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view', 'vkern'].join('|') + ')(?:[.#][a-zA-Z0-9\x7F-\uFFFF_:-]+)*$');
function selfClosing(tag) {
  return closeRE.test(tag);
}

},{"hyperscript-attribute-to-property":64}],66:[function(require,module,exports){
'use strict';

var numberIsNan = require('number-is-nan');

module.exports = Number.isFinite || function (val) {
	return !(typeof val !== 'number' || numberIsNan(val) || val === Infinity || val === -Infinity);
};

},{"number-is-nan":70}],67:[function(require,module,exports){
'use strict';

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
module.exports = self.fetch.bind(self);

},{"whatwg-fetch":79}],68:[function(require,module,exports){
'use strict';
// Create a range object for efficently rendering strings to elements.

var range;

var doc = typeof document !== 'undefined' && document;

var testEl = doc ? doc.body || doc.createElement('div') : {};

var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var hasAttributeNS;

if (testEl.hasAttributeNS) {
    hasAttributeNS = function hasAttributeNS(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    hasAttributeNS = function hasAttributeNS(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    hasAttributeNS = function hasAttributeNS(el, namespaceURI, name) {
        return !!el.getAttributeNode(name);
    };
}

function toElement(str) {
    if (!range && doc.createRange) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = doc.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function OPTION(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function INPUT(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function TEXTAREA(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        if (fromEl.firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            if (newValue === '' && fromEl.firstChild.nodeValue === fromEl.placeholder) {
                return;
            }

            fromEl.firstChild.nodeValue = newValue;
        }
    }
};

function noop() {}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize && fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
    toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
            // If the target element is a virtual DOM node then we may need to normalize the tag name
            // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
            // are converted to upper case
            return fromNodeName === toNodeName.toUpperCase();
        } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
}

/**
 * Loop over all of the attributes on the target node and make sure the original
 * DOM node has the same attributes. If an attribute found on the original node
 * is not on the new node then remove it from the original node.
 *
 * @param  {Element} fromNode
 * @param  {Element} toNode
 */
function morphAttrs(fromNode, toNode) {
    if (toNode.assignAttributes) {
        toNode.assignAttributes(fromNode);
    } else {
        var attrs = toNode.attributes;
        var i;
        var attr;
        var attrName;
        var attrNamespaceURI;
        var attrValue;
        var fromValue;

        for (i = attrs.length - 1; i >= 0; --i) {
            attr = attrs[i];
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;
            attrValue = attr.value;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;
                fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

                if (fromValue !== attrValue) {
                    fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
                }
            } else {
                fromValue = fromNode.getAttribute(attrName);

                if (fromValue !== attrValue) {
                    fromNode.setAttribute(attrName, attrValue);
                }
            }
        }

        // Remove any extra attributes found on the original DOM element that
        // weren't found on the target element.
        attrs = fromNode.attributes;

        for (i = attrs.length - 1; i >= 0; --i) {
            attr = attrs[i];
            if (attr.specified !== false) {
                attrName = attr.name;
                attrNamespaceURI = attr.namespaceURI;

                if (attrNamespaceURI) {
                    attrName = attr.localName || attrName;

                    if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
                        fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                    }
                } else {
                    if (!hasAttributeNS(toNode, null, attrName)) {
                        fromNode.removeAttribute(attrName);
                    }
                }
            }
        }
    }
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdom(fromNode, toNode, options) {
    if (!options) {
        options = {};
    }

    if (typeof toNode === 'string') {
        if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
            var toNodeHtml = toNode;
            toNode = doc.createElement('html');
            toNode.innerHTML = toNodeHtml;
        } else {
            toNode = toElement(toNode);
        }
    }

    var getNodeKey = options.getNodeKey || defaultGetNodeKey;
    var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
    var onNodeAdded = options.onNodeAdded || noop;
    var onBeforeElUpdated = options.onBeforeElUpdated || noop;
    var onElUpdated = options.onElUpdated || noop;
    var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
    var onNodeDiscarded = options.onNodeDiscarded || noop;
    var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
    var childrenOnly = options.childrenOnly === true;

    // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
    var fromNodesLookup = {};
    var keyedRemovalList;

    function addKeyedRemoval(key) {
        if (keyedRemovalList) {
            keyedRemovalList.push(key);
        } else {
            keyedRemovalList = [key];
        }
    }

    function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {

                var key = undefined;

                if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                    // If we are skipping keyed nodes then we add the key
                    // to a list so that it can be handled at the very end.
                    addKeyedRemoval(key);
                } else {
                    // Only report the node as discarded if it is not keyed. We do this because
                    // at the end we loop through all keyed elements that were unmatched
                    // and then discard them in one final pass.
                    onNodeDiscarded(curChild);
                    if (curChild.firstChild) {
                        walkDiscardedChildNodes(curChild, skipKeyedNodes);
                    }
                }

                curChild = curChild.nextSibling;
            }
        }
    }

    /**
     * Removes a DOM node out of the original DOM
     *
     * @param  {Node} node The node to remove
     * @param  {Node} parentNode The nodes parent
     * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
     * @return {undefined}
     */
    function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
            return;
        }

        if (parentNode) {
            parentNode.removeChild(node);
        }

        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
    }

    // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
    // function indexTree(root) {
    //     var treeWalker = document.createTreeWalker(
    //         root,
    //         NodeFilter.SHOW_ELEMENT);
    //
    //     var el;
    //     while((el = treeWalker.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }

    // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
    //
    // function indexTree(node) {
    //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
    //     var el;
    //     while((el = nodeIterator.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }

    function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {
                var key = getNodeKey(curChild);
                if (key) {
                    fromNodesLookup[key] = curChild;
                }

                // Walk recursively
                indexTree(curChild);

                curChild = curChild.nextSibling;
            }
        }
    }

    indexTree(fromNode);

    function handleNodeAdded(el) {
        onNodeAdded(el);

        var curChild = el.firstChild;
        while (curChild) {
            var nextSibling = curChild.nextSibling;

            var key = getNodeKey(curChild);
            if (key) {
                var unmatchedFromEl = fromNodesLookup[key];
                if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                    curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                    morphEl(unmatchedFromEl, curChild);
                }
            }

            handleNodeAdded(curChild);
            curChild = nextSibling;
        }
    }

    function morphEl(fromEl, toEl, childrenOnly) {
        var toElKey = getNodeKey(toEl);
        var curFromNodeKey;

        if (toElKey) {
            // If an element with an ID is being morphed then it is will be in the final
            // DOM so clear it out of the saved elements collection
            delete fromNodesLookup[toElKey];
        }

        if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
            return;
        }

        if (!childrenOnly) {
            if (onBeforeElUpdated(fromEl, toEl) === false) {
                return;
            }

            morphAttrs(fromEl, toEl);
            onElUpdated(fromEl);

            if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                return;
            }
        }

        if (fromEl.nodeName !== 'TEXTAREA') {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeKey;

            var fromNextSibling;
            var toNextSibling;
            var matchingFromEl;

            outer: while (curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeKey = getNodeKey(curToNodeChild);

                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;

                    if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    curFromNodeKey = getNodeKey(curFromNodeChild);

                    var curFromNodeType = curFromNodeChild.nodeType;

                    var isCompatible = undefined;

                    if (curFromNodeType === curToNodeChild.nodeType) {
                        if (curFromNodeType === ELEMENT_NODE) {
                            // Both nodes being compared are Element nodes

                            if (curToNodeKey) {
                                // The target node has a key so we want to match it up with the correct element
                                // in the original DOM tree
                                if (curToNodeKey !== curFromNodeKey) {
                                    // The current element in the original DOM tree does not have a matching key so
                                    // let's check our lookup to see if there is a matching element in the original
                                    // DOM tree
                                    if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                                        if (curFromNodeChild.nextSibling === matchingFromEl) {
                                            // Special case for single element removals. To avoid removing the original
                                            // DOM node out of the tree (since that can break CSS transitions, etc.),
                                            // we will instead discard the current node and wait until the next
                                            // iteration to properly match up the keyed target element with its matching
                                            // element in the original tree
                                            isCompatible = false;
                                        } else {
                                            // We found a matching keyed element somewhere in the original DOM tree.
                                            // Let's moving the original DOM node into the current position and morph
                                            // it.

                                            // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                            // the `removeNode()` function for the node that is being discarded so that
                                            // all lifecycle hooks are correctly invoked
                                            fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                            fromNextSibling = curFromNodeChild.nextSibling;

                                            if (curFromNodeKey) {
                                                // Since the node is keyed it might be matched up later so we defer
                                                // the actual removal to later
                                                addKeyedRemoval(curFromNodeKey);
                                            } else {
                                                // NOTE: we skip nested keyed nodes from being removed since there is
                                                //       still a chance they will be matched up later
                                                removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                            }

                                            curFromNodeChild = matchingFromEl;
                                        }
                                    } else {
                                        // The nodes are not compatible since the "to" node has a key and there
                                        // is no matching keyed node in the source tree
                                        isCompatible = false;
                                    }
                                }
                            } else if (curFromNodeKey) {
                                // The original has a key
                                isCompatible = false;
                            }

                            isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                            if (isCompatible) {
                                // We found compatible DOM elements so transform
                                // the current "from" node to match the current
                                // target DOM node.
                                morphEl(curFromNodeChild, curToNodeChild);
                            }
                        } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                            // Both nodes being compared are Text or Comment nodes
                            isCompatible = true;
                            // Simply update nodeValue on the original node to
                            // change the text value
                            curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                        }
                    }

                    if (isCompatible) {
                        // Advance both the "to" child and the "from" child since we found a match
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    // No compatible match so remove the old node from the DOM and continue trying to find a
                    // match in the original DOM. However, we only do this if the from node is not keyed
                    // since it is possible that a keyed node might match up with a node somewhere else in the
                    // target tree and we don't want to discard it just yet since it still might find a
                    // home in the final DOM tree. After everything is done we will remove any keyed nodes
                    // that didn't find a home
                    if (curFromNodeKey) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }

                    curFromNodeChild = fromNextSibling;
                }

                // If we got this far then we did not find a candidate match for
                // our "to node" and we exhausted all of the children "from"
                // nodes. Therefore, we will just append the current "to" node
                // to the end
                if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                    fromEl.appendChild(matchingFromEl);
                    morphEl(matchingFromEl, curToNodeChild);
                } else {
                    var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                    if (onBeforeNodeAddedResult !== false) {
                        if (onBeforeNodeAddedResult) {
                            curToNodeChild = onBeforeNodeAddedResult;
                        }

                        if (curToNodeChild.actualize) {
                            curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                        }
                        fromEl.appendChild(curToNodeChild);
                        handleNodeAdded(curToNodeChild);
                    }
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            // We have processed all of the "to nodes". If curFromNodeChild is
            // non-null then we still have some from nodes left over that need
            // to be removed
            while (curFromNodeChild) {
                fromNextSibling = curFromNodeChild.nextSibling;
                if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
                    // Since the node is keyed it might be matched up later so we defer
                    // the actual removal to later
                    addKeyedRemoval(curFromNodeKey);
                } else {
                    // NOTE: we skip nested keyed nodes from being removed since there is
                    //       still a chance they will be matched up later
                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                }
                curFromNodeChild = fromNextSibling;
            }
        }

        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
            specialElHandler(fromEl, toEl);
        }
    } // END: morphEl(...)

    var morphedNode = fromNode;
    var morphedNodeType = morphedNode.nodeType;
    var toNodeType = toNode.nodeType;

    if (!childrenOnly) {
        // Handle the case where we are given two DOM nodes that are not
        // compatible (e.g. <div> --> <span> or <div> --> TEXT)
        if (morphedNodeType === ELEMENT_NODE) {
            if (toNodeType === ELEMENT_NODE) {
                if (!compareNodeNames(fromNode, toNode)) {
                    onNodeDiscarded(fromNode);
                    morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                }
            } else {
                // Going from an element node to a text node
                morphedNode = toNode;
            }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
            // Text or comment node
            if (toNodeType === morphedNodeType) {
                morphedNode.nodeValue = toNode.nodeValue;
                return morphedNode;
            } else {
                // Text node to something else
                morphedNode = toNode;
            }
        }
    }

    if (morphedNode === toNode) {
        // The "to node" was not compatible with the "from node" so we had to
        // toss out the "from node" and use the "to node"
        onNodeDiscarded(fromNode);
    } else {
        morphEl(morphedNode, toNode, childrenOnly);

        // We now need to loop over any keyed nodes that might need to be
        // removed. We only do the removal if we know that the keyed node
        // never found a match. When a keyed node is matched up we remove
        // it out of fromNodesLookup and we use fromNodesLookup to determine
        // if a keyed node has been matched up or not
        if (keyedRemovalList) {
            for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
                var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                if (elToRemove) {
                    removeNode(elToRemove, elToRemove.parentNode, false);
                }
            }
        }
    }

    if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
            morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        // If we had to swap out the from node with a new node because the old
        // node was not compatible with the target node then we need to
        // replace the old DOM node in the original DOM tree. This is only
        // possible if the original DOM node was part of a DOM tree which
        // we know is the case if it has a parent node.
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
    }

    return morphedNode;
}

module.exports = morphdom;

},{}],69:[function(require,module,exports){
'use strict';

var numberIsFinite = require('is-finite');

module.exports = Number.isInteger || function (x) {
	return numberIsFinite(x) && Math.floor(x) === x;
};

},{"is-finite":66}],70:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function (x) {
	return x !== x;
};

},{}],71:[function(require,module,exports){
'use strict';

/* global MutationObserver */
var document = require('global/document');
var window = require('global/window');
var watch = Object.create(null);
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36);
var KEY_ATTR = 'data-' + KEY_ID;
var INDEX = 0;

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return;
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff);
        continue;
      }
      eachMutation(mutations[i].removedNodes, turnoff);
      eachMutation(mutations[i].addedNodes, turnon);
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  });
}

module.exports = function onload(el, on, off, caller) {
  on = on || function () {};
  off = off || function () {};
  el.setAttribute(KEY_ATTR, 'o' + INDEX);
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller];
  INDEX += 1;
  return el;
};

function turnon(index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el);
    watch[index][2] = 1;
  }
}

function turnoff(index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el);
    watch[index][2] = 0;
  }
}

function eachAttr(mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR);
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue];
    return;
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target);
  }
  if (watch[newValue]) {
    on(newValue, mutation.target);
  }
}

function sameOrigin(oldValue, newValue) {
  if (!oldValue || !newValue) return false;
  return watch[oldValue][3] === watch[newValue][3];
}

function eachMutation(nodes, fn) {
  var keys = Object.keys(watch);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR);
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i]);
        }
      });
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn);
    }
  }
}

},{"global/document":62,"global/window":63}],72:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function (qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],73:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var stringifyPrimitive = function stringifyPrimitive(v) {
  switch (typeof v === 'undefined' ? 'undefined' : _typeof(v)) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    return map(objectKeys(obj), function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map(xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],74:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":72,"./encode":73}],75:[function(require,module,exports){
/*
* This package edit the url-formatter of rawgit.
* The original source code is https://github.com/rgrove/rawgit/blob/master/public/js/url-formatter.js
*/
"use strict";

var REGEX_GIST_URL = /^(https?):\/\/gist\.github(?:usercontent)?\.com\/(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+\..+)$/i;
var REGEX_RAW_URL = /^(https?):\/\/raw\.github(?:usercontent)?\.com\/([^\/]+\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+\..+)/i;
var REGEX_REPO_URL = /^(https?):\/\/github\.com\/(.+?)\/(.+?)\/(?:(?:blob|raw)\/)?(.+?\/.+)/i;

var cdnDomain = 'cdn.rawgit.com';
var devDomain = 'rawgit.com';

module.exports = function (url) {
	var result = {};

	if (REGEX_RAW_URL.test(url)) {
		result.dev = url.replace(REGEX_RAW_URL, '$1://' + devDomain + '/$2/$3');
		result.cdn = url.replace(REGEX_RAW_URL, '$1://' + cdnDomain + '/$2/$3');
	} else if (REGEX_REPO_URL.test(url)) {
		result.dev = url.replace(REGEX_REPO_URL, '$1://' + devDomain + '/$2/$3/$4');
		result.cdn = url.replace(REGEX_REPO_URL, '$1://' + cdnDomain + '/$2/$3/$4');
	} else if (REGEX_GIST_URL.test(url)) {
		result.dev = url.replace(REGEX_GIST_URL, '$1://' + devDomain + '/$2');
		result.cdn = url.replace(REGEX_GIST_URL, '$1://' + cdnDomain + '/$2');
	} else {
		result.dev = url;
		result.cdn = url;
	}

	return result;
};

},{}],76:[function(require,module,exports){
'use strict';

var numberIsInteger = require('number-is-integer');

function round(fn, x, precision) {
	if (typeof x !== 'number') {
		throw new TypeError('Expected value to be a number');
	}

	if (!numberIsInteger(precision)) {
		throw new TypeError('Expected precision to be an integer');
	}

	var exponent = precision > 0 ? 'e' : 'e-';
	var exponentNeg = precision > 0 ? 'e-' : 'e';
	precision = Math.abs(precision);

	return Number(Math[fn](x + exponent + precision) + exponentNeg + precision);
}

var fn = module.exports = round.bind(null, 'round');
fn.up = round.bind(null, 'ceil');
fn.down = round.bind(null, 'floor');

},{"number-is-integer":69}],77:[function(require,module,exports){
'use strict';

module.exports = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;

  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) {// .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' && selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function (range) {
        selection.addRange(range);
      });
    }

    active && active.focus();
  };
};

},{}],78:[function(require,module,exports){
'use strict';

/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/** 
 * @file sha3.js
 * @author Marek Kotewicz <marek@ethdev.com>
 * @date 2015
 */

var CryptoJS = require('crypto-js');
var sha3 = require('crypto-js/sha3');

module.exports = function (value, options) {
    if (options && options.encoding === 'hex') {
        if (value.length > 2 && value.substr(0, 2) === '0x') {
            value = value.substr(2);
        }
        value = CryptoJS.enc.Hex.parse(value);
    }

    return sha3(value, {
        outputLength: 256
    }).toString();
};

},{"crypto-js":23,"crypto-js/sha3":44}],79:[function(require,module,exports){
'use strict';

(function (self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ',' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (typeof input === 'string') {
      this.url = input;
    } else {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, { body: this._bodyInit });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split('\r\n').forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

},{}],80:[function(require,module,exports){
'use strict';

var bel = require('bel'); // turns template tag into DOM elements
var morphdom = require('morphdom'); // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js'); // default events to be copied when dom elements update

module.exports = bel;

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {};
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier;
  }

  return morphdom(fromNode, toNode, opts);

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier(f, t) {
    // copy events:
    var events = opts.events || defaultEvents;
    for (var i = 0; i < events.length; i++) {
      var ev = events[i];
      if (t[ev]) {
        // if new element has a whitelisted attribute
        f[ev] = t[ev]; // update existing element
      } else if (f[ev]) {
        // if existing element has it and new one doesnt
        f[ev] = undefined; // remove it from existing element
      }
    }
    // copy values for form elements
    if (f.nodeName === 'INPUT' && f.type !== 'file' || f.nodeName === 'SELECT') {
      if (t.getAttribute('value') === null) t.value = f.value;
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value;
    }
  }
};

},{"./update-events.js":81,"bel":12,"morphdom":68}],81:[function(require,module,exports){
'use strict';

module.exports = [
// attribute events (can be set with attributes)
'onclick', 'ondblclick', 'onmousedown', 'onmouseup', 'onmouseover', 'onmousemove', 'onmouseout', 'ondragstart', 'ondrag', 'ondragenter', 'ondragleave', 'ondragover', 'ondrop', 'ondragend', 'onkeydown', 'onkeypress', 'onkeyup', 'onunload', 'onabort', 'onerror', 'onresize', 'onscroll', 'onselect', 'onchange', 'onsubmit', 'onreset', 'onfocus', 'onblur', 'oninput',
// other common events
'oncontextmenu', 'onfocusin', 'onfocusout'];

},{}]},{},[1]);
