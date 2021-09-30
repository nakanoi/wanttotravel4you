import React, { useState, useReducer, useEffect } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { listMemberByUserIDinTimestamp } from "../graphql/queries";
import { onCreateRoom } from "../graphql/subscriptions";
import RoomsList from "./RoomsList";

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';

const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.rooms;
    case ADDITIONAL_QUERY:
      return [...state, ...action.rooms]
    case SUBSCRIPTION:
      return [action.room, ...state]
    default:
      return state;
  }
};

const Profile = ({ user, usertype, area, business }) => {
  const [rooms, dispatch] = useReducer(reducer, []);
  const [nextToken, setNextToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRooms = async (type, nextToken = null) => {
    if (user.username !== null) {
      const res = await API.graphql(
        graphqlOperation(listMemberByUserIDinTimestamp, {
          userID: user.username,
          sortDirection: 'DESC',
          limit: 20,
          nextToken: nextToken,
        }
      ));
      if (res.data.listMemberByUserIDinTimestamp !== null) {
        dispatch({ type: type, rooms: res.data.listMemberByUserIDinTimestamp.items })
        setNextToken(res.data.listMemberByUserIDinTimestamp.nextToken);
      }
    }
    setIsLoading(false);
  }

  const getAdditionalRooms = () => {
    if (nextToken === null) return;
    getRooms(ADDITIONAL_QUERY, nextToken);
  }

  useEffect(() => {
    getRooms(INITIAL_QUERY);

    const subscription = API.graphql(
      graphqlOperation(onCreateRoom)
    ).subscribe({
      next: (msg) => {
        const room = msg.value.data.onCreateRoom;
        dispatch({ type: SUBSCRIPTION, room: room });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <React.Fragment>
      <table className="profile-table">
        <tbody>
          {user !== null && (
            <tr>
              <th>名前</th>
              <td>{ user.username }</td>
            </tr>
          )}
          {usertype === 'tourist' && (
            <tr>
              <th>種別</th>
              <td>旅行者</td>
            </tr>
          )}
          {usertype === 'agent' && (
            <tr>
              <th>種別</th>
              <td>事業者</td>
            </tr>
          )}
          {area !== null && (
            <tr>
              <th>地域</th>
              <td>{ area }</td>
            </tr>
          )}
          {business !== null && (
            <tr>
              <th>業種</th>
              <td>{ business }</td>
            </tr>
          )}
        </tbody>
      </table>
      <RoomsList
        isLoading={isLoading}
        rooms={rooms}
        getAdditionalRooms={getAdditionalRooms}
      />
    </React.Fragment>
  );
}

export default Profile;
