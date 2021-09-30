import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { Link } from "react-router-dom";
import UUID from 'uuidjs';

const RoomsList = ({ isLoading, rooms, getAdditionalRooms }) => {
  return (
    <React.Fragment>
      <h3>チャット</h3>
      <div>
        {isLoading ?
          <div>
            <CircularProgress size={25} />
          </div>
          :
          <List disablePadding>
            {rooms.map(room => (
              <RoomItem room={room} />
            ))}
            <ListItem key='loadmore'>
              <ListItemText
                primary={
                  <Button onClick={() => getAdditionalRooms()}>もっと見る</Button>
                }
              />
            </ListItem>
          </List>
        }
      </div>
    </React.Fragment>
  );
}

const RoomItem = ({ room }) => {
  const roomURL = () => {
    return '../message/' + room.id;
  }
  if (room) {
    return (
      <ListItem key={UUID.generate()}>
      <Link to={roomURL()}>"{ room.roomTitle }"のチャットルームへ行く</Link>
      </ListItem>
    )
  } else {
    return (
      <ListItem key={UUID.generate()}></ListItem>
    )
  }
}


export default RoomsList;
