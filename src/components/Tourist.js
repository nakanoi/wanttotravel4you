import React from "react";
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

export default withAuthenticator(Tourist);
