import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  listRoot: {
    width: '100%',
    wordBreak: 'break-all',
    overflow: 'scroll',
    borderRight: '1px solid #37444C',
  },
  alignCenter: {
    textAlign: 'center',
  },
  loader: {
    textAlign: 'center',
    paddingTop: 20,
  },
  listHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 1200,
    backgroundColor: '#15202B',
    borderBottom: '1px solid #37444C',
  },
  clickable: {
    cursor: 'pointer',
  }
}));

export default function RequestList({ isLoading, requests, getAdditionalRequests, listHeaderTitle, listHeaderTitleButton }) {
  const classes = useStyles();
  return (
    <div className={classes.listRoot}>
      {isLoading ?
        <div className={classes.loader}>
          <CircularProgress size={25} />
        </div>
        :
        <List disablePadding>
          {requests.map(request => (
            <RequestItem request={request} />
          ))}
          <ListItem
            key='loadmore'
          >
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

  return (
    <ListItem alignItems='flex-start' key={request.id}>
      <ListItemText
        primary={
          <React.Fragment>
            {request.owner}/
            {request.area}/
            {request.cost}/
            {request.date}/
            {request.days}/
            {request.number}/
            {request.context}/
            {timestampToTime(request.timestamp)}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}
