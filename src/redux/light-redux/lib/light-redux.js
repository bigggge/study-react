/**
 * light-redux.js
 *
 * @author bigggge
 * 2018/3/14.
 */
const createStore = (reducer, initialState, enhancer) => {
  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
    enhancer = initialState;
    initialState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

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

// 中间件示例
// const logger = ({ dispatch, getState }) => action => {
//   console.log(action, getState());
//   return dispatch(action);
// };
// export default logger;

export function applyMiddleware(middleware) {
  return store => {

    return {
      ...store,
      dispatch: middleware({
        getPrevState: store.getState,
        dispatch: store.dispatch
      })
    };
  };
}

export default createStore;

