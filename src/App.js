import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsmobile from './aws-exports';

import Home from './components/Home'
import Services from './components/Services';
import Type from './components/Type';
Amplify.configure(awsmobile);

const App = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div>
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services/">Services</Link></li>
          </ul>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/services/" exact component={Services} />
      </Router>
      <div>Hello, {user.username}</div>
      <AmplifySignOut />
      <Type user={user.username} />
    </div>
  ) : (
    <div>
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services/">Services</Link></li>
          </ul>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/services/" exact component={Services} />
      </Router>
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          formFields={[
            { type: "username" },
            { type: "password" },
            { type: "email" }
          ]}
        />
      </AmplifyAuthenticator>
    </div>
  );
}

export default withAuthenticator(App);
