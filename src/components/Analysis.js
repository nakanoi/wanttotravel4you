import React, { useState, useEffect, useReducer } from 'react';
import {API, graphqlOperation } from 'aws-amplify';
import { listRequestBySpecificArea } from '../graphql/queries';
import AnalysisList from './AnalysisList';
import { GENRE_OPTIONS } from './Options';

const SUBSCRIPTION = 'SUBSCRIPTION';
const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';
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
array_days.forEach((e) => { dic_days[e] = 0 });
array_number.forEach((e) => { dic_number[e] = 0 });
array_genre.forEach((e) => { dic_genre[e] = 0 });
var d, n, g;

const ReshapeData = (items) => {
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
  var list_days = Object.keys(dic_days).map(k => ({ key: k, count: dic_days[k] }));
  var list_number = Object.keys(dic_number).map(k => ({ key: k, count: dic_number[k] }));
  var list_genre = Object.keys(dic_genre).map(k => ({ key: k, count: dic_genre[k] }));
  list_days.sort((a, b) => b.count - a.count);
  list_number.sort((a, b) => b.count - a.count);
  list_genre.sort((a, b) => b.count - a.count);

  return [list_days.slice(0, ANALYSIS_LENGTH), list_number.slice(0, ANALYSIS_LENGTH), list_genre.slice(0, ANALYSIS_LENGTH)];
}

const Analysis = ({ match, area }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ld, SetLD] = useState(null);
  const [ln, SetLN] = useState(null);
  const [lg, SetLG] = useState(null);

  const getRequest = async (type) => {
    if (area !== null) {
      const res = await API.graphql(
        graphqlOperation(listRequestBySpecificArea, {
          area: area
        }
      ));
      setIsLoading(false);
      [d, n, g] = ReshapeData(res.data.listRequestBySpecificArea.items);
      SetLD(d);
      SetLN(n);
      SetLG(g);
    }
  }

  useEffect(() => {
    if (area !== null) {
      getRequest(INITIAL_QUERY);
    } else {
      return null
    }
  }, []);

  return (
    <React.Fragment>
      <h2>Analysis in {area}</h2>
      {ld !== null && ln !== null && lg !== null ? (
        <AnalysisList isLoading={isLoading} genre={lg} unitGenre="" days={ld} unitDays="days" number={ln} unitNumber="people" />
      ) : (
        <p>NOOO</p>
      )}
    </React.Fragment>
  )
}

export default Analysis;
