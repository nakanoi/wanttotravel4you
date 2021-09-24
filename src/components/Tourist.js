/*import React from "react";
import logo from './../logo.svg';
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut,
  withAuthenticator
} from '@aws-amplify/ui-react'

function Tourist () {
  return (
    <div>
      <h1>Tourist</h1>
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>We now have Auth!</h2>
        <p></p>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(Tourist);*/
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

const Tourist = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
          <div>Hello, {user.username}</div>
          <AmplifySignOut />
      </div>
    ) : (
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
  );
}

export default Tourist;
