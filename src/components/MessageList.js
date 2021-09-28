import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
} from '@material-ui/core';
import UUID from 'uuidjs';

const MessageList = ({ isLoading, messages, getAdditionalMessages }) => {
  return (
    <React.Fragment>
      <h3>Message</h3>
      <div>
        {isLoading ?
          <div>
            <CircularProgress size={25} />
          </div>
          :
          <List disablePadding>
            {messages.map(message => (
              <MessageItem message={message} />
            ))}
            <ListItem key='loadmore'>
              <ListItemText
                primary={
                  <Button onClick={() => getAdditionalMessages()}> More </Button>
                }
              />
            </ListItem>
          </List>
        }
      </div>
    </React.Fragment>
  );
}

const MessageItem = ({ message }) => {
  function zeroPadding(num,length){
    return ('0' + num).slice(-length);
  }
  const date = (timestamp) => {
    var obj = new Date(timestamp * 1000);
    return (
      obj.getFullYear() +'/' +
      zeroPadding(obj.getMonth() + 1, 2) + '/' +
      zeroPadding(obj.getDay(), 2) + ' ' +
      zeroPadding(obj.getHours(), 2) + ':' +
      zeroPadding(obj.getMinutes(), 2) + ':' +
      zeroPadding(obj.getSeconds(), 2)
    );
  }
  if (message) {
    return (
      <ListItem key={UUID.generate()}>
        <div>{ message.context }</div>
        <div>from { message.userID } || </div>
        <div>{ date(message.timestamp) }</div>
      </ListItem>
    )
  } else {
    return (
      <ListItem key={UUID.generate()}></ListItem>
    )
  }
}

export default MessageList;
