import createStore, { applyMiddleware } from './light-redux';
import thunk from 'redux-thunk';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return 0;
  }
}

export function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: 'INCREMENT' });
    }, 2000);
  };
}

const store = createStore(counter, 0, applyMiddleware(thunk));
const init = store.getState();

console.log(`light-redux init ${init}`);

function listener() {
  const current = store.getState();
  console.log(`current ${current}`);
}

store.subscribe(listener);
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
store.dispatch({ type: 'DECREMENT' });
store.dispatch(incrementAsync());