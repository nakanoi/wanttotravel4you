import React, { useState, useEffect, useReducer } from 'react';
import { withRouter } from 'react-router';
import {API, graphqlOperation } from 'aws-amplify';
import { listAgentBySpecificArea } from '../graphql/queries';
import FindList from './FindList';

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';

const reducer = (state, action) => {
  switch (action.type) {
    case INITIAL_QUERY:
      return action.agents;
    case ADDITIONAL_QUERY:
      return [...state, ...action.agents]
    case SUBSCRIPTION:
      return [action.agent, ...state]
    default:
      return state;
  }
};

const Find = (props) => {
  const [agents, dispatch] = useReducer(reducer, []);
  const [nextToken, setNextToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let res = null;

  const getAgent = async (type, nextToken = null) => {
    if (props.area !== null) {
      res = await API.graphql(
        graphqlOperation(listAgentBySpecificArea, {
          area: props.area,
          sortDirection: 'DESC',
          limit: 10,
          nextToken: nextToken,
          }
        )
      );
      dispatch({ type: type, agents: res.data.listAgentBySpecificArea.items });
      setNextToken(res.data.listAgentBySpecificArea.nextToken);
    }
    setIsLoading(false);
  }

  const getAdditionalAgents = () => {
    if (nextToken === null) return;
    getAgent(ADDITIONAL_QUERY, nextToken);
  }

  useEffect(() => {
    getAgent(INITIAL_QUERY);
  }, []);


  return (
    <React.Fragment>
      <h2>Agents Find in {props.area}</h2>
      <FindList
        isLoading={isLoading}
        agents={agents}
        getAdditionalAgents={getAdditionalAgents}
      />
    </React.Fragment>
  )
}

export default withRouter(Find);