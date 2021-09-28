import React, { Fragment } from 'react';
import {
  List,
  ListItem,
  CircularProgress,
} from '@material-ui/core';
import UUID from 'uuidjs';

const AnalysisList = ({ isLoading, genre, unitGenre, days, unitDays, number, unitNumber }) => {
  return (
    <div>
      {isLoading ?
        <div>
          <CircularProgress size={25} />
        </div>
        :
        <List disablePadding>
          <h3>Genre</h3>
          <ListItem key={UUID.generate()}>
            <DataList data={genre} unit={unitGenre} />
          </ListItem>
          <h3>Stay Days</h3>
          <ListItem key={UUID.generate()}>
            <DataList data={days} unit={unitDays} />
          </ListItem>
          <h3>Brings</h3>
          <ListItem key={UUID.generate()}>
            <DataList data={number} unit={unitNumber} />
          </ListItem>
        </List>
      }
    </div>
  )
}

const DataList = ({ data, unit }) => {
  var count = {count: data[0].count, update: true}
  var rank = 0;
  return (
    <Fragment>
      <List className="analysis-flex">
        {Object.keys(data).map(key => {
          if (data[key].count !== count) {
            count = data[key].count;
            rank += 1;
          }
          return (
            <ListItem alignItems='flex-start' key={UUID.generate()}>
              <AnalysisItem rank={rank} item={data[key]} unit={unit} />
            </ListItem>
          )
        })}
      </List>
    </Fragment>
  )
}

const AnalysisItem = ({ rank, item, unit }) => {
  return (
    <Fragment>
      <table>
        <tbody>
          <tr>
            <th>No.</th>
            <td>{rank}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{item.key}{unit}</td>
          </tr>
          <tr>
            <th>Count</th>
            <td>{item.count}</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  )
}

export default AnalysisList;
