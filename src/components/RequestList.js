import React from 'react';
import { Link, withRouter } from 'react-router-dom';
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

const RequestList = ({ isLoading, requests, getAdditionalRequests, listHeaderTitle, listHeaderTitleButton, agent }) => {
  return (
    <div>
      {isLoading ?
        <div>
          <CircularProgress size={25} />
        </div>
        :
        <List disablePadding>
          {requests.map(request => (
            <RequestItem request={request} agent={agent} />
          ))}
          <ListItem key='loadmore'>
            <ListItemText
              primary={
                <Button onClick={() => getAdditionalRequests()}> More </Button>
              }
            />
          </ListItem>
        </List>
      }
    </div>
  )
}

function RequestItem({ request, agent }) {
  const timestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const yyyy = `${date.getFullYear()}`;
    const MM = `0${date.getMonth() + 1}`.slice(-2);
    const dd = `0${date.getDate()}`.slice(-2);

    return `${yyyy}/${MM}/${dd}`;
  }
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
          requestID: request.id,
          requestUser: request.owner,
          roomTitle: request.title,
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
          roomTitle: request.title,
          userID: request.owner,
          timestamp: timestamp
        }
      })
    );
    const mes2 = await API.graphql(
      graphqlOperation(createMember, {
        input: {
          type: 'member',
          roomID: roomID,
          roomTitle: request.title,
          userID: agent,
          timestamp: timestamp
        }
      })
    );
  }

  return (
    <ListItem alignItems='flex-start' key={UUID.generate()}>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td><Link to={getLink(request.owner)}>{request.owner}</Link></td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{request.title}</td>
          </tr>
          <tr>
            <th>Area</th>
            <td>{request.area}</td>
          </tr>
          <tr>
            <th>Cost</th>
            <td>{request.cost}</td>
          </tr>
          <tr>
            <th>Data</th>
            <td>{request.date}</td>
          </tr>
          <tr>
            <th>Days</th>
            <td>{request.date}</td>
          </tr>
          <tr>
            <th>Number</th>
            <td>{request.number}</td>
          </tr>
          <tr>
            <th>Message</th>
            <td>{request.context}</td>
          </tr>
          <tr>
            <th>Requested At</th>
            <td>{timestampToTime(request.timestamp)}</td>
          </tr>
        </tbody>
      </table>
      <Button
        variant="contained"
        color="primary"
        onClick={buildRoom}
      >Message</Button>
    </ListItem>
  );
}

export default withRouter(RequestList);
