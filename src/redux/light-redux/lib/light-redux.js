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
const createStore = (reducer, initialState, enhancer) => {
  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
    enhancer = initialState;
    initialState = undefined;
  }

  // middlewares
  if (enhancer) {
    return enhancer(createStore(reducer, initialState));
  }

  const store = {};
  store.state = initialState;
  store.listeners = [];

  store.subscribe = (listener) => {
    store.listeners.push(listener);
  };

  store.dispatch = (action) => {
    store.state = reducer(store.state, action);
    store.listeners.forEach(listener => listener());
  };
  store.getState = () => store.state;
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

export function applyMiddleware(middleware) {
  return store => {
    const dispatch = middleware({
      getPrevState: store.getState,
      dispatch: store.dispatch
    });

    return {
      ...store,
      dispatch
    };
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
export function applyMiddlewares(...middlewares) {
  return store => {
    console.log('applyMiddlewares', middlewares);

    let dispatch = () => {};

    let middlewareAPI = {
      getPrevState: store.getState,
      dispatch: action => dispatch(action)
    };

    const middlewareChain = middlewares.map(middleware => middleware(middlewareAPI));

    dispatch = compose(middlewareChain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
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
  return fns.reduce((ret, middleware) => dispatch => ret(middleware(dispatch)));
}

export default createStore;

