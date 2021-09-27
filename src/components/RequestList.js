import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@material-ui/core';
import UUID from 'uuidjs';

const RequestList = ({ isLoading, requests, getAdditionalRequests, listHeaderTitle, listHeaderTitleButton }) => {
  return (
    <div>
      {isLoading ?
        <div>
          <CircularProgress size={25} />
        </div>
        :
        <List disablePadding>
          {requests.map(request => (
            <RequestItem request={request} />
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

function RequestItem({ request }) {
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

  return (
    <ListItem alignItems='flex-start' key={UUID.generate()}>
      <table>
        <tr>
          <th>Name</th>
          <tr><Link to={getLink(request.owner)}>{request.owner}</Link></tr>
        </tr>
        <tr>
          <th>Area</th>
          <tr>{request.area}</tr>
        </tr>
        <tr>
          <th>Cost</th>
          <tr>{request.cost}</tr>
        </tr>
        <tr>
          <th>Data</th>
          <tr>{request.date}</tr>
        </tr>
        <tr>
          <th>Days</th>
          <tr>{request.date}</tr>
        </tr>
        <tr>
          <th>Number</th>
          <tr>{request.number}</tr>
        </tr>
        <tr>
          <th>Message</th>
          <tr>{request.context}</tr>
        </tr>
        <tr>
          <th>Requested At</th>
          <tr>{timestampToTime(request.timestamp)}</tr>
        </tr>
      </table>
    </ListItem>
  );
}

export default withRouter(RequestList);
