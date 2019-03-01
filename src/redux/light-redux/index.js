// import createStore from './lib/light-redux';
import { counter, incrementAsync } from './lib/light-redux.test';
import ReactDOM from 'react-dom';
import React from 'react';
// import { Provider, connect } from './lib/light-react-redux';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const store = createStore(counter, 0, applyMiddleware(thunk, createLogger()));

class App extends React.Component {
  render() {
    return (
      <div className={'App'}>
        <p>light-react-redux</p>
        <p>初始值 {this.props.num}</p>
        <button onClick={() => this.props.increment()}>increment</button>
        <button onClick={() => this.props.decrement()}>decrement</button>
        <button onClick={() => store.dispatch(incrementAsync())}>increment async</button>
      </div>
    );
  }
}

App = connect(
  state => ({
    num: state
  }),
  dispatch => ({
    increment: () => {
      dispatch({ type: 'INCREMENT' });
    },
    decrement: () => {
      dispatch({ type: 'DECREMENT' });
    }
  })
)(App);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

