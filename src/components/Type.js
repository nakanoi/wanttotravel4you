import React from 'react';
import{ API, graphqlOperation } from 'aws-amplify';
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import {
  Button,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { createTourist, createAgent, updateAgent } from '../graphql/mutations'
import { listTouristBySpecificOwner } from '../graphql/queries';
import Request from './Request';
import Agent from './Agent';
import UpdateAgent from './UpdateAgent';

const Type = (props) => {
  const [type, SetType] = React.useState(null);
  const [isAgentRegisterd, SetIsAgentRegisterd] = React.useState(false);
  const [agentArea, SetAgentArea] = React.useState(null);
  const [agentBusiness, SetAgentBusiness] = React.useState(null);
  const [count, Counter] = React.useState(0);

  // UserType
  const getUserType = async () => {
    if (type === null && count === 0) {
      Counter(1);
      const res = await API.graphql(
        graphqlOperation(
          listTouristBySpecificOwner,
          {
            owner: props.user
          }
        )
      );
      console.log('RES', res);
      if (res.data.listTouristBySpecificOwner == null) {
        SetType(null);
      } else {
        if (res.data.listTouristBySpecificOwner.items.length > 0) {
          var info = res.data.listTouristBySpecificOwner.items[0];
          SetType(info.type); 
          if (type === 'agent' && info.area !== null && info.business !== null) {
            SetAgentArea(info.area);
            SetAgentArea(info.business);
          }
        }
      }
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
    ).then(
      SetType("tourist")
    );
  }

  // Agent Register
  const registerAgent = async () => {
    const res = await API.graphql(
      graphqlOperation(createAgent, {
        input: {
          type: "agent",
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    );
  }

  // Agent Register Information
  const registerAgentInfo = async () => {
    const res = await API.graphql(
      graphqlOperation(updateAgent, {
        input: {
          type: "agent",
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    );
  }

  return type === null ? (
    <div>
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
    </div>
  ) : (
    <div>
      <p>You Are { type }</p>
      {type === "tourist" ? (
        <Request />
      ) : (
        {}
      )}
    </div>
  );
}

export default Type;
