import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Home from './Home'
import Tourist from './Tourist';
import Agent from './Agent';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <h2>Who Are You?</h2>
        <ul>
          <li><Link to="/tourist/">Tourist</Link></li>
          <li><Link to="/agent/">Tour Agent</Link></li>
        </ul>
        <Route path="/tourist/" exact component={Tourist} />
        <Route path="/agent/" exact component={Agent} />
      </Router>
    );
  }
}
