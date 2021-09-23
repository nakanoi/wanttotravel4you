import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Home from './components/Home'
import Services from './components/Services';
import Account from './components/Account'
import Tourist from './components/Tourist'
import Agent from './components/Agent';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services/">Services</Link></li>
          <li><Link to="/account/">Sign Up or Sign In</Link></li>
        </ul>
      </nav>
      <Route path="/" exact component={Home} />
      <Route path="/services/" exact component={Services} />
      <Route path="/account/" exact component={Account} />
      <Route path="/tourist/" exact component={Tourist} />
      <Route path="/agent/" exact component={Agent} />
    </Router>
  );
}

export default App;

