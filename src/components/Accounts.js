import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Signin from "./Signin"
import Signup from "./Signup"

export default class Service extends React.Component {
  render() {
    return (
      <div>
        <h1>Accounts</h1>
        <Router>
          <nav>
            <ul>
              <li><Link to="/accounts/signin/">Signin</Link></li>
              <li><Link to="/accounts/signup/">Signup</Link></li>
            </ul>
          </nav>
          <Route path="/accounts/signin/" exact component={Signin} />
          <Route path="/accounts/signup/" exact component={Signup} />
        </Router>
      </div>
    );
  }
}
