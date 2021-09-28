import React from 'react';
import { Link } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@material-ui/core';
import UUID from 'uuidjs';
import { createRoom, createMember } from '../graphql/mutations';

export default function FindList({ isLoading, agents, getAdditionalAgents, username }) {
  return (
    <div>
      {isLoading ?
        <div>
          <CircularProgress size={25} />
        </div>
        :
        <List disablePadding>
          {agents.map(agent => (
            <FindItem agent={agent} username={username} />
          ))}
          <ListItem
            key={UUID.generate()}
          >
            <ListItemText
              primary={
                <Button onClick={() => getAdditionalAgents()}> More </Button>
              }
            />
          </ListItem>
        </List>
      }
    </div>
  )
}

function FindItem({ agent, username }) {
  const getLink = (name) => {
    return '../' + name;
  }
  const buildRoom = async () => {
    const roomID = UUID.generate();
    const timestamp = Math.floor(Date.now() / 1000);
    alert('New Message created.');
    const room = await API.graphql(
      graphqlOperation(createRoom, {
        input: {
          id: roomID,
          requestID: UUID.generate(),
          requestUser: agent.owner,
          roomTitle: "Agent Room",
          timestamp: timestamp,
          type: 'room'
        }
      })
    );
    const mes1 = await API.graphql(
      graphqlOperation(createMember, {
        input: {
          type: 'member',
          roomID: roomID,
          roomTitle: "Agent Room",
          userID: username,
          timestamp: timestamp
        }
      })
    );
    const mes2 = await API.graphql(
      graphqlOperation(createMember, {
        input: {
          type: 'member',
          roomID: roomID,
          roomTitle: "Agent Room",
          userID: agent.owner,
          timestamp: timestamp
        }
      })
    );
  }
  if (agent.owner === username) {
    return (
      <ListItem key={UUID.generate()} />
    )
  } else {
    return (
      <ListItem alignItems='flex-start' key={UUID.generate()}>
        <div>
          <table className="list-profile">
            <tr>
              <th>Name</th>
              <td>{agent.owner}</td>
            </tr>
            <tr>
              <th>Area</th>
              <td>{agent.area}</td>
            </tr>
            <tr>
              <th>Business</th>
              <td>{agent.business}</td>
            </tr>
          </table>
          <div>
            <div>
              <Link to={getLink(agent.owner)}>See Profile</Link>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={buildRoom}
          >Message</Button>
        </div>
      </ListItem>
    )
  }
}
