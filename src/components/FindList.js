import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@material-ui/core';
import UUID from 'uuidjs';

export default function FindList({ isLoading, agents, getAdditionalAgents }) {
  return (
    <div>
      {isLoading ?
        <div>
          <CircularProgress size={25} />
        </div>
        :
        <List disablePadding>
          {agents.map(agent => (
            <FindItem agent={agent} />
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

function FindItem({ agent }) {
  const getLink = (name) => {
    return '../' + name;
  }
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
      </div>
    </ListItem>
  )
}
