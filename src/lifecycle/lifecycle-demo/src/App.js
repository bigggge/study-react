import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect, Switch } from 'react-router-dom';
import Page1 from './pages/page1/Page1';
import Page2 from './pages/page2/Page2';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/*https://github.com/react-translate-team/react-router-CN/blob/master/packages/react-router/docs/api/Switch.md*/}
          <Switch>
            <Redirect from='/' to='/home' exact />
            <Route path="/home" component={Home} />
            <Route path="/page1" component={Page1} />
            <Route path="/page2" component={Page2} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const Home = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/page1">page1</Link></li>
      <li><Link to="/page2">page2</Link></li>
    </ul>
  </div>
);

const NoMatch = () => (
  <div>
    NoMatch
  </div>
);

export default App;
