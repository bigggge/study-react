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
})({3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.applyMiddleware = applyMiddleware;
exports.applyMiddlewares = applyMiddlewares;
/**
 * light-redux.js
 *
 * @author bigggge
 * 2018/3/14.
 */
/**
 * createStore
 * 创建一个 redux store
 *
 * @param reducer      返回下一状态的函数
 * @param initialState 初始状态
 * @param enhancer     使用 applyMiddlewares 包装后的中间件函数
 * @return store
 */
var createStore = function createStore(reducer, initialState, enhancer) {
  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
    enhancer = initialState;
    initialState = undefined;
  }

  // middlewares
  if (enhancer) {
    return enhancer(createStore(reducer, initialState));
  }

  var store = {};
  store.state = initialState;
  store.listeners = [];

  store.subscribe = function (listener) {
    store.listeners.push(listener);
  };

  store.dispatch = function (action) {
    store.state = reducer(store.state, action);
    store.listeners.forEach(function (listener) {
      return listener();
    });
  };
  store.getState = function () {
    return store.state;
  };
  return store;
};

// 中间件机制
// Redux middleware 提供了一个分类处理 action 的机会。在 middleware 中，
// 我们可以检阅每一个流过的 action,并挑选出特定类型的 action 进行相应操作，以此来改变 action。

// 中间件示例 (返回 dispatch)
// const logger = ({ dispatch, getState }) => action => {
//   console.log(action, getState());
//   return dispatch(action);
// };
// export default logger;

function applyMiddleware(middleware) {
  return function (store) {
    var dispatch = middleware({
      getPrevState: store.getState,
      dispatch: store.dispatch
    });

    return _extends({}, store, {
      dispatch: dispatch
    });
  };
}

/**
 * 支持多个中间件
 * @param middlewares
 * @return {function(*)}
 */
// const logger = ({ dispatch, getPrevState }) => next => action => {
//   console.log('[redux-logger] ', action, getPrevState());
//   return next(action);
// };
function applyMiddlewares() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (store) {
    console.log('applyMiddlewares', middlewares);

    var _dispatch = function dispatch() {};

    var middlewareAPI = {
      getPrevState: store.getState,
      dispatch: function dispatch(action) {
        return _dispatch(action);
      }
    };

    var middlewareChain = middlewares.map(function (middleware) {
      return middleware(middlewareAPI);
    });

    _dispatch = compose(middlewareChain)(store.dispatch);

    return _extends({}, store, {
      dispatch: _dispatch
    });
  };
}

/**
 * compose
 *
 * @param fns [fn1, fn2]
 * @return {*}
 */
// dispatch = f1(f2(f3(store.dispatch))))
function compose(fns) {
  if (fns.length === 1) {
    return fns[0];
  }
  return fns.reduce(function (ret, middleware) {
    return function (dispatch) {
      return ret(middleware(dispatch));
    };
  });
}

exports.default = createStore;
},{}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports.default = thunk;
},{}],4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.counter = counter;
exports.incrementAsync = incrementAsync;

var _lightRedux = require('./light-redux');

var _lightRedux2 = _interopRequireDefault(_lightRedux);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INCREMENT = 'INCREMENT';
var DECREMENT = 'DECREMENT';

function counter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments[1];

  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return 0;
  }
}

function incrementAsync() {
  return function (dispatch) {
    setTimeout(function () {
      dispatch({ type: 'INCREMENT' });
    }, 2000);
  };
}

function init() {

  var store = (0, _lightRedux2.default)(counter, 0, (0, _lightRedux.applyMiddlewares)(_reduxThunk2.default));
  var init = store.getState();

  function listener() {
    var current = store.getState();
    console.log('current ' + current);
  }

  store.subscribe(listener);
  store.dispatch({ type: 'INCREMENT' });
  store.dispatch({ type: 'INCREMENT' });
  store.dispatch({ type: 'DECREMENT' });
  store.dispatch({ type: 'DECREMENT' });
  store.dispatch(incrementAsync());
}
},{"./light-redux":3,"redux-thunk":8}],7:[function(require,module,exports) {
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * react.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/9/3.
 */

function log() {
  // console.log(arguments)
}

function createElement(tag, attrs) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    attrs: attrs,
    children: children
  };
}

function _render2(vnode, container) {
  return container.appendChild(_render(vnode));
}

function _render(vnode) {
  log(' [React] _render vnode', vnode);

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
      return _render2(child, dom);
    });
  }
  return dom;
}

// 设置属性
function setAttribute(dom, name, value) {
  log(' [React] setAttribute dom,name,value', dom, name, value);

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
      log(' [React] setState stateChange', stateChange);

      Object.assign(this.state, stateChange);
      // 渲染组件
      renderComponent(this);
    }
  }]);

  return Component;
}();

// 创建组件


function createComponent(component, props) {
  log(' [React] createComponent component,props', component, props);

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
  log(' [React] setComponentProps component,props', component, props);
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
  log(' [React] renderComponent component', component);

  var element = void 0;

  var vnode = component.render();
  if (component.element && component.componentWillUpdate) {
    component.componentWillUpdate();
  }
  element = _render(vnode);
  // element = diff(component.element, vnode);

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
  render: function render(vnode, container) {
    container.innerHTML = '';
    return _render2(vnode, container);
  },
  Component: Component
};

exports.default = React;
},{}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var logger = function logger(_ref) {
  var dispatch = _ref.dispatch,
      getPrevState = _ref.getPrevState;
  return function (nextDispatch) {
    return function (action) {

      console.log('[redux-logger] %c prev state', 'color:gray', getPrevState());
      console.log('[redux-logger]', action);
      var next = nextDispatch(action);
      console.log('[redux-logger] %c next state', 'color:cornflowerblue', getPrevState());
      return next;
    };
  };
};

exports.default = logger;

// const logger = ({ dispatch, getPrevState }) => action => {
//   console.log(action, getPrevState());
//   return dispatch(action);
// };
//
// export default logger;
},{}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var thunk = function thunk(_ref) {
  var dispatch = _ref.dispatch,
      getPrevState = _ref.getPrevState;
  return function (nextDispatch) {
    return function (action) {
      if (typeof action === 'function') {
        return action(dispatch, getPrevState);
      }

      return nextDispatch(action);
    };
  };
};

exports.default = thunk;
},{}],2:[function(require,module,exports) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lightRedux = require('./lib/light-redux');

var _lightRedux2 = _interopRequireDefault(_lightRedux);

var _lightRedux3 = require('./lib/light-redux.test');

var _react = require('../../light-react/lib/react');

var _react2 = _interopRequireDefault(_react);

var _lightReduxLogger = require('./lib/light-redux-logger');

var _lightReduxLogger2 = _interopRequireDefault(_lightReduxLogger);

var _lightReduxThunk = require('./lib/light-redux-thunk');

var _lightReduxThunk2 = _interopRequireDefault(_lightReduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const store0 = createStore(counter, 0, applyMiddleware(logger));
var store = (0, _lightRedux2.default)(_lightRedux3.counter, 0, (0, _lightRedux.applyMiddlewares)(_lightReduxThunk2.default, _lightReduxLogger2.default));

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var store = this.props.store;
      var num = store.getState();
      return _react2.default.createElement(
        'div',
        { className: 'App' },
        _react2.default.createElement(
          'p',
          null,
          'light-redux-with-react'
        ),
        _react2.default.createElement(
          'p',
          null,
          '\u521D\u59CB\u503C ',
          num
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              store.dispatch({ type: 'INCREMENT' });
            } },
          'increment'
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return store.dispatch({ type: 'DECREMENT' });
            } },
          'decrement'
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              return store.dispatch((0, _lightRedux3.incrementAsync)());
            } },
          'increment async'
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

function render() {
  _react2.default.render(_react2.default.createElement(App, { store: store }), document.getElementById('root'));
}

render();

store.subscribe(render);
},{"./lib/light-redux":3,"./lib/light-redux.test":4,"../../light-react/lib/react":7,"./lib/light-redux-logger":5,"./lib/light-redux-thunk":6}],9:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '64676' + '/');
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
},{}]},{},[9,2])
//# sourceMappingURL=/index-0.aa2681a3.map