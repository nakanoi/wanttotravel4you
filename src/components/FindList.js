import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@material-ui/core';
import UUID from 'uuidjs';

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

export default function FindList({ isLoading, agents, getAdditionalAgents }) {
  const classes = useStyles();
  return (
    <div className={classes.listRoot}>
      {isLoading ?
        <div className={classes.loader}>
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
  return (
    <ListItem alignItems='flex-start' key={UUID.generate()}>
      <ListItemText
        primary={
          <React.Fragment>
            {agent.owner}/
            {agent.area}/
            {agent.business}/
          </React.Fragment>
        }
      />
    </ListItem>
  )
}
