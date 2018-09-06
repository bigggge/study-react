import createStore from './lib/light-redux';
import { counter } from './lib/light-redux.test';
import React from '../../light-react/lib/react';

const store = createStore(counter, 0);

class App extends React.Component {
  render() {
    const store = this.props.store;
    const num = store.getState();
    return (
      <div className={'App'}>
        <p>light-redux-with-react</p>
        <p>初始值 {num}</p>
        <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>increment</button>
        <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>decrement</button>
      </div>
    );
  }

}

function render() {
  React.render(
    <App store={store} />,
    document.getElementById('root')
  );
}

render();

store.subscribe(render);