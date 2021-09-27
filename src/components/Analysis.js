import React, { useState, useEffect, useReducer } from 'react';
import {API, graphqlOperation } from 'aws-amplify';
import { listRequestBySpecificArea } from '../graphql/queries';
import { onCreateRequest } from '../graphql/subscriptions'
import AnalysisList from './AnalysisList';

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

const Analysis = (props) => {


  const [requests, dispatch] = useReducer(reducer, []);
  const [nextToken, setNextToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRequest = async (type, nextToken = null) => {
    const res = await API.graphql(
      graphqlOperation(listRequestBySpecificArea, {
        area: props.area
      }
    ));
    dispatch({ type: type, requests: res.data.listRequestBySpecificArea.items })
    setNextToken(res.data.listRequestBySpecificArea.nextToken);
    setIsLoading(false);
  }

  const getAdditionalRequests = () => {
    if (nextToken === null) return;
    getRequest(ADDITIONAL_QUERY, nextToken);
  }


  useEffect(() => {
    if (props.area !== null) {
      getRequest(INITIAL_QUERY);
  
      const subscription = API.graphql(
        graphqlOperation(
          onCreateRequest
        )
      ).subscribe({
        next: (msg) => {
          const request = msg.value.data.onCreateRequest;
          dispatch({ type: SUBSCRIPTION, requests: requests });
        }
      }); 
      return () => subscription.unsubscribe();
    } else {
      return null
    }
  }, []);


  return (
    <React.Fragment>
      <AnalysisList
        isLoading={isLoading}
        requests={requests}
        getAdditionalRequests={getAdditionalRequests}
      />
    </React.Fragment>
  )
}

export default Analysis;


/*
import React from 'react';
import {API, graphqlOperation } from 'aws-amplify';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { listRequestBySpecificArea } from '../graphql/queries';
import { GENRE_OPTIONS } from './Options';

const Analysis = (props) => {
  console.log('props', props);
  const DAYS_LENGTH = 11;
  const NUMBER_LENGTH = 11;
  const ANALYSIS_LENGTH = 5;
  const array_days = [...Array(DAYS_LENGTH)].map((_, i) => i);
  const array_number = [...Array(NUMBER_LENGTH)].map((_, i) => i);
  const array_genre = GENRE_OPTIONS.map(genre => genre.value);
  var map_days = new Map();
  var map_number = new Map();
  var map_genre = new Map();
  var dic_days = {};
  var dic_number = {};
  var dic_genre = {};
  var genreList = [];
  var numberList = [];
  var daysList = [];
  array_days.forEach((e) => { dic_days[e] = 0 });
  array_number.forEach((e) => { dic_number[e] = 0 });
  array_genre.forEach((e) => { dic_genre[e] = 0 });

  const getRequestByArea = async () => {
    if (props.area !== null) {
      const res = await API.graphql(
        graphqlOperation(
          listRequestBySpecificArea,
          {
            area: props.area,
          }
        )
      ).then((res) => {
        const items = res.data.listRequestBySpecificArea.items;
        // items
        items.forEach(item => {
          map_days.set(item.days, item.id);
          map_number.set(item.number, item.id);
          map_genre.set(item.genre, item.id);
        });
        array_days.forEach((n) => {
          var o = map_days.get(n);
          if (o !== undefined && n < 11) {dic_days[n] += 1}
        });
        array_number.forEach((n) => {
          var o = map_number.get(n);
          if (o !== undefined && n < 11) {dic_number[n] += 1}
        });
        array_genre.forEach((n) => {
          var o = map_genre.get(n);
          if (o !== undefined) {dic_genre[n] += 1}
        });
        var list_days = Object.keys(dic_days).map((k)=>({ key: k, count: dic_days[k] }));
        var list_number = Object.keys(dic_number).map((k)=>({ key: k, count: dic_number[k] }));
        var list_genre = Object.keys(dic_genre).map((k)=>({ key: k, count: dic_genre[k] }));
        list_days.sort((a, b) => b.count - a.count);
        list_number.sort((a, b) => b.count - a.count);
        list_genre.sort((a, b) => b.count - a.count);

        // list
        var j = 0;
        for (j = 0; j < ANALYSIS_LENGTH; j++) {
          daysList.push(
            <li>{list_days[j].count}</li>
          );
        }
        for (j = 0; j < ANALYSIS_LENGTH; j++) {
          numberList.push(
            <li>
              <p>{list_number[j].key}</p>
              <p>{list_number[j].count}</p>
            </li>
          );
        }
        for (j = 0; j < ANALYSIS_LENGTH; j++) {
          genreList.push(list_genre[j]);
        }
        console.log('GENREEE', genreList);
        genreList.map((data) => {
          console.log('DATA', data)
        })
      })
    }
  }
  getRequestByArea();
  
  return (
    <div>
      This is us
      <ul>
        {genreList.map((data) => {
          console.log('ININDATA', data);
          return <li>{data.key}</li>;
        })}
    </ul>
    </div>
  )
}

export default Analysis;
*/