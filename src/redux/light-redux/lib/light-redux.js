/**
 * light-redux.js
 *
 * @author bigggge
 * 2018/3/14.
 */
const createStore = (reducer, initialState) => {
  if (initialState === undefined) {
    throw new Error('[light-redux] initialState is undefined');
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

export default createStore;

