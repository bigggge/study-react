import React from './lib/react';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Counter />
      <Welcome name={'peter1'} />
      <Welcome name={'peter2'} />
      <Welcome name={'peter3'} />
    </div>
  );
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0
    };
  }

  componentWillMount() {
    console.log('mount');
  }

  componentWillUpdate() {
    console.log('update');
  }

  onClick() {
    this.setState({ num: this.state.num + 1 });
  }

  render() {
    return (
      <div onClick={() => this.onClick()}>
        <h1>number:{this.state.num}</h1>
        <button>add</button>
      </div>
    );
  }

}

React.render(
  <App />,
  document.getElementById('root')
);
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