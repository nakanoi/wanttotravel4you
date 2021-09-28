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
      <h3>Rooms</h3>
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
                  <Button onClick={() => getAdditionalRooms()}> More </Button>
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
  const roomURL = (roomID) => {
    return '../message/' + String(roomID)
  }
  if (room === null) {
    return (
      <ListItem key={UUID.generate()}></ListItem>
    )
  } else {
    return (
      <ListItem key={UUID.generate()}>
      <Link to={roomURL(room.roomID)}>Go To Message Room</Link>
        <p>{ room.roomTitle }</p>
      </ListItem>
    )
  }
}


export default RoomsList;
