import React from 'react';
import{ Auth, API, graphqlOperation } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import {
  Button,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { createTourist } from '../graphql/mutations'
import { listTouristBySpecificOwner } from '../graphql/queries';

const Account = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  const [type, SetType] = React.useState(null);

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, [SetType]);

  // UserType
  const getUserType = async () => {
    const res = await API.graphql(
      graphqlOperation(
        listTouristBySpecificOwner,
        {
          owner: user.username
        }
      )
    );
    if (res.data.listTouristBySpecificOwner.items.length == 0) {
      SetType(null);
    } else {
      SetType(res.data.listTouristBySpecificOwner.items.type); 
    }
  }
  getUserType();

  // Tourist Register
  const registerTourist = async () => {
    const res = await API.graphql(
      graphqlOperation(createTourist, {
        input: {
          type: "tourist",
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    );
  }

  // Agent Register
  const registerAgent = async () => {
    const res = await API.graphql(
      graphqlOperation(createTourist, {
        input: {
          type: "agent",
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    );
  }

  return authState === AuthState.SignedIn && user ? (
      <div>
        <div>Hello, {type} {user.username}</div>
        {type === null ? (
          <List>
            <ListItem>
              <ListItemText primary={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={registerTourist}
                >Tourist</Button>
              } />
            </ListItem>
            <ListItem>
              <ListItemText primary={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={registerAgent}
                >Agent</Button>
              } />
            </ListItem>
          </List>
        ) : (
          <p>{ type }</p>
        )}
        <div>{user.attributes.email}</div>
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

export default withAuthenticator(Account);
