import React, { Component } from 'react';
import './style.css';

class Page2 extends Component {
  constructor(props) {
    super(props);
    console.log(1);
  }

  componentWillMount() {
    console.log('page2 componentWillMount');
  }

  componentDidMount() {
    console.log('page2 componentDidMount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('page2 componentWillReceiveProps', nextProps);
  }

  render() {
    console.log('page2 render');
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Page2</h1>
        </header>
      </div>
    );
  }
}

export default Page2;
