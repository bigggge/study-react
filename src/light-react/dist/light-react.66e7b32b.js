// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diff = diff;

var _react = require('./react');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * diff.js
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * @author bigggge(me@haoduoyu.cc)
                                                                                                                                                                                                     * 2018/9/5.
                                                                                                                                                                                                     */

// https://github.com/hujiulong/blog/issues

/**
 *
 * @param dom 真实DOM
 * @param vnode 虚拟DOM
 * @return 更新后的DOM
 */
function diff(dom, vnode) {
  var newDom = void 0;

  // 对比文本节点
  if (typeof vnode === 'string') {
    // 存在文本节点则更新
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vnode) {
        dom.textContent = vnode;
      }
      // 否则创建新文本节点
    } else {
      newDom = document.createTextNode(vnode);
      if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(newDom, dom);
      }
    }
    return newDom;
  }

  // diff component
  if (typeof vnode.tag === 'function') {
    return diffComponent(dom, vnode);
  }

  // 非文本节点，如果 DOM 不存在或新旧 DOM 类型不同，就新建一个节点
  if (!dom || dom.nodeName.toLowerCase() !== vnode.tag.toLowerCase()) {
    newDom = document.createElement(vnode.tag);
    if (dom) {
      [].concat(_toConsumableArray(dom.childNodes)).map(newDom.appendChild);
      if (dom.parentNode) {
        dom.parentNode.replaceChild(newDom, dom);
      }
    }
  }

  // 对比子节点
  if (vnode.children && vnode.children.length > 0 || newDom.childNodes && newDom.childNodes.length > 0) {
    diffChildren(newDom, vnode.children);
  }

  diffAttributes(newDom, vnode);

  return newDom;
}

function diffAttributes(dom, vnode) {
  var old = {};
  var attrs = vnode.attrs;

  for (var i = 0; i < dom.attributes.length; i++) {
    var attr = dom.attributes[i];
    old[attr.name] = attr.value;
  }

  // 移除不存在属性
  for (var name in old) {
    if (!(name in attrs)) {
      (0, _react.setAttribute)(dom, name, undefined);
    }
  }

  // 更新属性值
  for (var _name in attrs) {
    if (old[_name] !== attrs[_name]) {
      (0, _react.setAttribute)(dom, _name, attrs[_name]);
    }
  }
}

// 对比子节点
function diffChildren(dom, vchildren) {
  var domChildren = dom.childNodes;
  var children = [];

  var keyed = {};

  if (domChildren.length > 0) {
    for (var i = 0; i < domChildren.length; i++) {
      var child = domChildren[i];
      var key = child.key;
      if (key) {
        keyed[key] = child;
      } else {
        children.push(child);
      }
    }
  }

  if (vchildren && vchildren.length > 0) {
    var min = 0;
    var childrenLen = children.length;
    for (var _i = 0; _i < vchildren.length; _i++) {
      var vchild = vchildren[_i];
      var _key = vchild.key;
      var _child = void 0;

      if (_key) {
        if (keyed[_key]) {
          _child = keyed[_key];
          keyed[_key] = undefined;
        }
      } else if (min < childrenLen) {
        for (var j = min; j < childrenLen; j++) {
          var c = children[j];
          if (c && isSameNodeType(c, vchild)) {
            _child = c;
            children[j] = undefined;

            if (j === childrenLen - 1) childrenLen--;
            if (j === min) min++;
            break;
          }
        }
      }
    }
  }
}

function diffComponent(dom, vnode) {
  var c = dom && dom._component;
  var oldDom = dom;

  if (c && c.constructor === vnode.tag) {
    (0, _react.setComponentProps)(c, vnode.attrs);
    dom = c.element;
  } else {
    if (c) {
      unmountComponent(c);
      oldDom = null;
    }
    c = (0, _react.createComponent)(vnode.tag, vnode.attrs);

    (0, _react.setComponentProps)(c, vnode.attrs);
    dom = c.element;
    if (oldDom && dom !== oldDom) {
      oldDom._component = null;
      removeNode(oldDom);
    }
  }
  return dom;
}

function unmountComponent(component) {
  if (component.componentWillUnmount()) component.componentWillUnmount();
  removeNode(component.element);
}

function isSameNodeType(dom, vnode) {
  return true;
}

function removeNode(dom) {
  if (dom && dom.parentNode) {
    dom.parentNode.removeChild(dom);
  }
}
},{"./react":3}],3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.setAttribute = setAttribute;
exports.createComponent = createComponent;
exports.setComponentProps = setComponentProps;
exports.renderComponent = renderComponent;

var _diff = require('./diff');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * react.js
                                                                                                                                                           *
                                                                                                                                                           * @author bigggge(me@haoduoyu.cc)
                                                                                                                                                           * 2018/9/3.
                                                                                                                                                           */

function createElement(tag, attrs) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  console.log('createElement', arguments);
  return {
    tag: tag,
    attrs: attrs,
    children: children
  };
}

function render(vnode, container) {
  container.innerHTML = '';
  return container.appendChild(_render(vnode));
}

function _render(vnode) {
  console.log(' [React] _render vnode', vnode);

  if (vnode === null || vnode === undefined) {
    vnode = '';
  }

  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }

  // 渲染字符串
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
    // 渲染组件（函数）
  }

  // 渲染组件
  if (typeof vnode.tag === 'function') {
    var component = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(component, vnode.attrs);
    renderComponent(component);
    return component.element;
  }

  var dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(function (key) {
      var value = vnode.attrs[key];
      setAttribute(dom, key, value);
    });
  }

  if (vnode.children) {
    vnode.children.forEach(function (child) {
      return render(child, dom);
    });
  }
  return dom;
}

// 设置属性
function setAttribute(dom, name, value) {
  console.log(' [React] setAttribute dom,name,value', dom, name, value);

  if (name === 'className') name = 'class';

  if (/on\w+/.test(name)) {
    name = name.toLowerCase();
    dom[name] = value || '';
  } else if (name === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';
    } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      for (var _name in value) {
        dom.style[_name] = typeof value[_name] === 'number' ? value[_name] + 'px' : value[_name];
      }
    }
  } else {
    if (name in dom) {
      dom[name] = value || '';
    }
    if (value) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name, value);
    }
  }
}

// Component

var Component = function () {
  function Component() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Component);

    this.state = {};
    this.props = props;
  }

  _createClass(Component, [{
    key: 'setState',
    value: function setState(stateChange) {
      console.log(' [React] setState stateChange', stateChange);

      Object.assign(this.state, stateChange);
      // 渲染组件
      renderComponent(this);
    }
  }]);

  return Component;
}();

// 创建组件


function createComponent(component, props) {
  console.log(' [React] createComponent component,props', component, props);

  var inst = void 0;
  // 如果是类组件，直接返回实例
  if (component.prototype && component.prototype.render) {
    inst = new component(props);
    // 如果是函数定义组件
  } else {
    inst = new Component(props);
    inst.constructor = component;
    inst.render = function () {
      return this.constructor(props);
    };
  }
  return inst;
}

// 更新 props
function setComponentProps(component, props) {
  console.log(' [React] setComponentProps component,props', component, props);
  if (!component.element) {
    if (component.componentWillMount) {
      component.componentWillMount();
    } else if (component.componentWillReceiveProps) {
      component.componentWillReceiveProps(props);
    }
  }
  component.props = props;
}

function renderComponent(component) {
  console.log(' [React] renderComponent component', component);

  var element = void 0;

  var vnode = component.render();
  if (component.element && component.componentWillUpdate) {
    component.componentWillUpdate();
  }
  // element = _render(vnode);
  element = (0, _diff.diff)(component.element, vnode);

  if (component.element) {
    if (component.componentDidMount) {
      component.componentDidMount();
    } else if (component.componentDidUpdate) {
      component.componentDidUpdate();
    }
  }

  if (component.element) {
    component.element.parentNode.replaceChild(element, component.element);
  }

  component.element = element;
  element._component = component;
}

var React = {
  createElement: createElement,
  render: render,
  Component: Component
};

exports.default = React;
},{"./diff":7}],2:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('./lib/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Welcome(props) {
  return _react2.default.createElement(
    'h1',
    null,
    'Hello, ',
    props.name
  );
}

function App() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(Counter, null),
    _react2.default.createElement(Welcome, { name: 'peter1' }),
    _react2.default.createElement(Welcome, { name: 'peter2' }),
    _react2.default.createElement(Welcome, { name: 'peter3' })
  );
}

var Counter = function (_React$Component) {
  _inherits(Counter, _React$Component);

  function Counter(props) {
    _classCallCheck(this, Counter);

    var _this = _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).call(this, props));

    _this.state = {
      num: 0
    };
    return _this;
  }

  _createClass(Counter, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      console.log('mount');
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      console.log('update');
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      console.log('>>>', this);
      this.setState({ num: this.state.num + 1 });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'number:',
          this.state.num
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return _this2.onClick();
            } },
          'add'
        )
      );
    }
  }]);

  return Counter;
}(_react2.default.Component);

_react2.default.render(_react2.default.createElement(App, null), document.getElementById('root'));
// function tick() {
//   const element = (
//     <div>
//       <h1 onClick={() => console.log(123)}>Hello,world!</h1>
//       <h2 style={{ color: 'blue' }}>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//
//   React.render(
//     element,
//     document.getElementById('root')
//   );
// }
//
// setInterval(tick, 10000);
},{"./lib/react":3}],4:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55105' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[4,2])
//# sourceMappingURL=/light-react.66e7b32b.map