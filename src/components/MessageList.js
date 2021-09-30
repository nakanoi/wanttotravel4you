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
      <h3>メッセージ</h3>
      <div>
        {isLoading ?
          <div>
            <CircularProgress size={25} />
          </div>
          :
          <List disablePadding className="message-list-wrap">
            {messages.map(message => (
              <MessageItem message={message} />
            ))}
            <ListItem key='loadmore'>
              <ListItemText
                primary={
                  <Button onClick={() => getAdditionalMessages()}>もっと見る</Button>
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
        <div className="message-list">
          <div className="message-context">{ message.context }</div>
          <div className="message-info">
            <div className="message-info-wrap">
              <p>{ message.userID }</p>
              <p>{ date(message.timestamp) }</p>
            </div>
          </div>
        </div>
      </ListItem>
    )
  } else {
    return (
      <ListItem key={UUID.generate()}></ListItem>
    )
  }
}

export default MessageList;
