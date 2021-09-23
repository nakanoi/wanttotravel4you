/*import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Home from './components/Home'
import Services from './components/Services';
import Accounts from './components/Accounts'

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services/">Services</Link></li>
          <li><Link to="/accounts/">Accounts</Link></li>
        </ul>
      </nav>
      <Route path="/" exact component={Home} />
      <Route path="/services/" exact component={Services} />
      <Route path="/accounts/" component={Accounts} />
    </Router>
  );
}

export default App;*/
import React from "react";
import Amplify from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut,
} from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

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
      <h2>Welcome! {user.username}</h2>
      <AmplifySignOut />
    </div>
  ) : (
    <div>
      <h2>Sign Up</h2>
      <AmplifyAuthenticator>
        <AmplifySignUp slot="sign-up" />
      </AmplifyAuthenticator>
    </div>
  );
}

export default App;

