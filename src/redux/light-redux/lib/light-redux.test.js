import createStore from './light-redux';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export function counter(state, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return 0;
  }
}

const store = createStore(counter, 0);
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