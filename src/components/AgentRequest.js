import React, { useState, useEffect, useReducer } from 'react';
import {API, graphqlOperation } from 'aws-amplify';
import { listRequestBySpecificArea } from '../graphql/queries';
import { onCreateRequest } from '../graphql/subscriptions'
import RequestList from './RequestList';

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';

const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.requests;
    case ADDITIONAL_QUERY:
      return [...state, ...action.requests]
    case SUBSCRIPTION:
      return [action.request, ...state]
    default:
      return state;
  }
};

const AgentRequest = (props) => {
  const [requests, dispatch] = useReducer(reducer, []);
  const [nextToken, setNextToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRequest = async (type, nextToken = null) => {
    if (props.area !== null) {
      const res = await API.graphql(
        graphqlOperation(listRequestBySpecificArea, {
          area: props.area,
          sortDirection: 'DESC',
          limit: 20,
          nextToken: nextToken,
        }
      ));
      dispatch({ type: type, requests: res.data.listRequestBySpecificArea.items })
      setNextToken(res.data.listRequestBySpecificArea.nextToken);
    }
    setIsLoading(false);
  }

  const getAdditionalRequests = () => {
    if (nextToken === null) return;
    getRequest(ADDITIONAL_QUERY, nextToken);
  }

  useEffect(() => {
    getRequest(INITIAL_QUERY);

    const subscription = API.graphql(graphqlOperation(
        onCreateRequest
      )
    ).subscribe({
      next: (msg) => {
        const request = msg.value.data.onCreateRequest;
        dispatch({ type: SUBSCRIPTION, requests: requests });
      }
    });
    return () => subscription.unsubscribe();
  }, []);


  return (
    <React.Fragment>
      <h2>All Requests in {props.area}</h2>
      <RequestList
        isLoading={isLoading}
        requests={requests}
        getAdditionalRequests={getAdditionalRequests}
      />
    </React.Fragment>
  )
}

export default AgentRequest;
