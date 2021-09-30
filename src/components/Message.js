import React, { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { API, graphqlOperation } from 'aws-amplify';
import {
  Button,
  TextField,
} from '@material-ui/core';
import { createMessage, createMember } from '../graphql/mutations'
import { listMessageByRoomIDinTimestamp, getRoom } from '../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions'
import MessageList from './MessageList';
import { createPortal } from 'react-dom';

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';

const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.messages;
    case ADDITIONAL_QUERY:
      return [...state, ...action.messages]
    case SUBSCRIPTION:
      return [action.message, ...state]
    default:
      return state;
  }
};

const Message = ({ username }) => {
  const params = useParams();
  const [messages, dispatch] = useReducer(reducer, []);
  const [nextToken, setNextToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [context, SetContext] = useState('');
  const [joinUser, SetJoinUser] = useState('');
  var roomInfo;

  // Hander
  const handleContext = event => {
    SetContext(event.target.value);
  }
  const handleJoin = event => {
    SetJoinUser(event.target.value);
  }

  const getRoomInfo = async () => {
    const res = await API.graphql(
      graphqlOperation(getRoom, {
        id: params.roomID
      })
    )
    if (res.data.getRoom) {
      roomInfo = res.data.getRoom;
    }
  }
  getRoomInfo();

  const sendMessage = () => {
    API.graphql(
      graphqlOperation(createMessage, {
        input: {
          type: 'message',
          roomID: params.roomID,
          context: context,
          userID: username,
          timestamp: Math.floor(Date.now() / 1000)
        }
      }
    ));
    SetContext('');
  }
  const joinMember = () => {
    if (roomInfo) {
      API.graphql(
        graphqlOperation(createMember, {
          input: {
            type: 'member',
            roomID: params.roomID,
            roomTitle: roomInfo.roomTitle,
            userID: joinUser,
            timestamp: Math.floor(Date.now() / 1000)
          }
        })
      )
    }
    alert('Invited Member ' + joinUser);
    SetJoinUser('');
  }

  const getMessage = async (type, nextToken = null) => {
    const res = await API.graphql(
      graphqlOperation(listMessageByRoomIDinTimestamp, {
        roomID: params.roomID,
        sortDirection: 'DESC',
        limit: 20,
        nextToken: nextToken,
      }
    ));
    if (res.data.listMessageByRoomIDinTimestamp !== null) {
      dispatch({ type: type, messages: res.data.listMessageByRoomIDinTimestamp.items })
      setNextToken(res.data.listMessageByRoomIDinTimestamp.nextToken);
    }
    setIsLoading(false);
  }

  const getAdditionalMessage = () => {
    if (nextToken === null) return;
    getMessage(ADDITIONAL_QUERY, nextToken);
  }

  useEffect(() => {
    getMessage(INITIAL_QUERY);

    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (msg) => {
        const message = msg.value.data.onCreateMessage;
        dispatch({ type: SUBSCRIPTION, message: message });
      }
    });
    return () => subscription.unsubscribe();
  }, [params]);

  return (
    <React.Fragment>
      <div id="message-wrap">
        <TextField
          id="message"
          label="メッセージ"
          multiline
          rowsMax="8"
          variant="filled"
          value={context}
          onChange={handleContext}
          margin="normal"
          className="message"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
        >送信</Button>
      </div>
      <div id="invite-wrap">
        <TextField
          id="invite"
          label="ユーザー名"
          multiline
          rowsMax="8"
          variant="filled"
          value={joinUser}
          onChange={handleJoin}
          margin="normal"
          className="invite"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={joinMember}
        >招待</Button>
        <MessageList
          isLoading={isLoading}
          messages={messages}
          getAdditionalMessages={getAdditionalMessage}
        />
      </div>
    </React.Fragment>
  )
}

export default Message;
