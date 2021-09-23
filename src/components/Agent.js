import React from "react";
import logo from './../logo.svg';
import {
  AmplifySignOut,
  withAuthenticator
} from '@aws-amplify/ui-react'

function Agent () {
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

export default withAuthenticator(Agent);
