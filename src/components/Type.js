import React, { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Button,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Select from 'react-select';
import UUID from 'uuidjs';

import { createTourist, createAgent, updateAgent } from '../graphql/mutations'
import { listTouristBySpecificOwner, listAgentBySpecificOwner } from '../graphql/queries';
import Request from './Request';
import * as options from './Options';
import Analysis from './Analysis';

const Type = (props) => {
  const [type, SetType] = useState(null);
  const [isAgentRegisterd, SetIsAgentRegisterd] = useState(false);
  const [agentArea, SetAgentArea] = useState(null);
  const [touristCount, touristCounter] = useState(0);
  const [agentCount, agentCounter] = useState(0);
  const [area, SetArea] = useState('');
  const [business, SetBusiness] = useState('');
  const [agentID, SetAgentID] = useState(UUID.generate());

  // Handlers
  const handleArea = event => {
    SetArea(event.value);
  }
  const handleBusiness = event => {
    SetBusiness(event.value);
  }

  // UserType
  const getTouristType = async () => {
    if (type === null && touristCount === 0) {
      touristCounter(1);
      const res = await API.graphql(
        graphqlOperation(
          listTouristBySpecificOwner,
          {
            owner: props.user
          }
        )
      );
      if (res.data.listTouristBySpecificOwner == null) {
        SetType(null);
      } else {
        if (res.data.listTouristBySpecificOwner.items.length > 0) {
          var info = res.data.listTouristBySpecificOwner.items[0];
          SetType(info.type);
        }
      }
    }
  }
  const getAgentType = async () => {
    if (type === null && agentCount === 0) {
      agentCounter(1);
      const res = await API.graphql(
        graphqlOperation(
          listAgentBySpecificOwner,
          {
            owner: props.user
          }
        )
      );
      if (res.data.listAgentBySpecificOwner == null) {
        SetType(null);
      } else {
        if (res.data.listAgentBySpecificOwner.items.length > 0) {
          var info = res.data.listAgentBySpecificOwner.items[0];
          SetType(info.type);
          SetAgentID(info.id);
          if (info.area !== null && info.business !== null) {
            SetIsAgentRegisterd(true);
            SetAgentArea(info.area);
          }
        }
      }
    }
  }
  getTouristType();
  getAgentType();

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
    SetType("tourist");
  }

  // Agent Register
  const registerAgent = async () => {
    const res = await API.graphql(
      graphqlOperation(createAgent, {
        input: {
          id: agentID,
          type: "agent",
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    );
    SetType("agent");
  }

  // Agent Information
  const updateAgentInfo = async () => {
    const res = await API.graphql(
      graphqlOperation(updateAgent, {
        input: {
          type: "agent",
          id: agentID,
          area: area,
          business: business,
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    );
    SetIsAgentRegisterd(true);
  }

  return  type === null ? (
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
      {type === "agent" ? (
        (isAgentRegisterd ? (
          <div>
            {agentArea === null ? (
              <div></div>
            ) : (
              <Analysis area={agentArea} />
            )}
            <p>You Are { type }</p>
          </div>
        ) : (
          <div>
            <List>
              <ListItem key='agent-field_area'>
                <div>Area</div>
                <Select
                  id="area"
                  onChange={handleArea}
                  options={options.AREA_OPTIONS}
                />
              </ListItem>
              <ListItem key='pagent-field_business'>
                <div>Business</div>
                <Select
                  id="business"
                  onChange={handleBusiness}
                  options={options.BUSINESS_OPTIONS}
                />
              </ListItem>
              <ListItem key='agent-button'>
                <ListItemText primary={
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={updateAgentInfo}
                  >Register</Button>
                } />
              </ListItem>
            </List>
          </div>
        ))
      ) : (
        <div>
          <Request />
        </div>
      )}
   </div>
  );
}

export default Type;
