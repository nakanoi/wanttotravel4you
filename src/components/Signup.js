import React from "react";
import Amplify from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut,
  withAuthenticator
} from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from './../aws-exports';

Amplify.configure(awsconfig);

const  Signup = () => {
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

export default Signup;
