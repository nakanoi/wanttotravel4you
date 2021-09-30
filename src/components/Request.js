import React, { useState } from 'react';
import{ API, graphqlOperation } from 'aws-amplify';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  InputAdornment
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from 'react-select';
import UUID from 'uuidjs';
import { createRequest } from '../graphql/mutations';
import * as options from './Options';

const Request = () => {
  const [title, SetTitle] = useState('');
  const [area, SetArea] = useState('');
  const [cost, SetCost] = useState(0);
  const [number, SetNumber] = useState(0);
  const [date, SetDate] = useState('');
  const [days, SetDays] = useState(0);
  const [genre, SetGenre] = useState('');
  const [range, SetRange] = useState(0);
  const [context, SetContext] = useState('');
  const [status, SetStatus] = useState('running');
  const [tags, SetTags] = useState([]);

  const sendRequest = async () => {
    function ZP(num,length){
      return ('0000000' + num).slice(-length);
    }
    var format = date.getFullYear() + '-' + ZP(date.getMonth() + 1, 2) + '-' + ZP(date.getDay(), 2)
    const requestID = UUID.generate();
    const res = await API.graphql(
      graphqlOperation(createRequest, {
        input: {
          type: "request",
          id: requestID,
          title: title,
          area: area,
          cost: Number(cost),
          number: Number(number),
          date: format,
          days: Number(days),
          genre: genre,
          range: Number(range),
          context: context,
          status: status,
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    );
    alert('Successfully Requested.');
    SetTitle('');
    SetArea('');
    SetCost(0);
    SetNumber(0);
    SetDate('');
    SetDays(0);
    SetGenre('');
    SetRange(0);
    SetContext('');
    SetStatus('running');
    SetTags([])
  }

  // Handlers
  const handleTitle = event => {
    SetTitle(event.target.value);
  }
  const handleArea = event => {
    SetArea(event.value);
  }
  const handleCost = event => {
    SetCost(event.target.value);
  }
  const handleNumber = event => {
    SetNumber(event.target.value);
  }
  const handleDate = event => {
    SetDate(event)
  }
  const handleDays = event => {
    SetDays(event.target.value);
  }
  const handleGenre = event => {
    SetGenre(event.value);
  }
  const handleRange = event => {
    SetRange(event.target.value);
  }
  const handleContext = event => {
    SetContext(event.target.value);
  }
  const handleTags = event => {
    SetTags(event.value);
  }

  return (
    <React.Fragment>
      <h2>リクエスト</h2>
      <List>
        <ListItem key='request_title'>
          <p>旅行タイトル</p>
          <ListItemText primary={
          <TextField
            id="title"
            multiline
            rowsMax="8"
            variant="filled"
            value={title}
            onChange={handleTitle}
            margin="normal"
            className="input"
          />
        } />
        </ListItem>
        <ListItem key='request_area'>
          <p>目的地</p>
          <Select
            id="area"
            onChange={handleArea}
            options={options.AREA_OPTIONS}
            className="input"
          />
        </ListItem>
        <ListItem key='request_cost'>
          <p>費用</p>
          <ListItemText primary={
            <TextField
              id="cost"
              multiline
              rowsMax="8"
              variant="filled"
              type="number"
              value={cost}
              onChange={handleCost}
              margin="normal"
              className="input"
            />
          } />
        </ListItem>
        <ListItem key='request_number'>
          <p>同行者数</p>
          <ListItemText primary={
            <TextField
              id="number"
              multiline
              rowsMax="8"
              variant="filled"
              type="number"
              value={number}
              onChange={handleNumber}
              margin="normal"
              className="input"
            />
          } />
        </ListItem>
        <ListItem key='request_date'>
          <p>出発日</p>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              value={date}
              onChange={handleDate}
              className="input"
            />
          </MuiPickersUtilsProvider>
        </ListItem>
        <ListItem key='request_days'>
          <p>滞在日数</p>
          <ListItemText primary={
            <TextField
              id="days"
              multiline
              rowsMax="8"
              type="number"
              variant="filled"
              value={days}
              onChange={handleDays}
              endAdornment={<InputAdornment position="end">stays</InputAdornment>}
              margin="normal"
              className="input"
            />
          } />
        </ListItem>
        <ListItem key='request_genre'>
          <p>旅行ジャンル</p>
          <Select
            id="genre"
            onChange={handleGenre}
            options={options.GENRE_OPTIONS}
            className="input"
          />
        </ListItem>
        <ListItem key='request_range'>
          <p>旅行範囲</p>
          <ListItemText primary={
            <TextField
              id="range"
              multiline
              rowsMax="8"
              type="number"
              variant="filled"
              value={range}
              onChange={handleRange}
              margin="normal"
              className="input"
            />
          } />
        </ListItem>
        <ListItem key='request_context'>
          <p>詳細</p>
          <ListItemText primary={
            <TextField
              id="context"
              multiline
              rowsMax="8"
              variant="filled"
              value={context}
              onChange={handleContext}
              margin="normal"
              className="input textarea"
            />
          } />
        </ListItem>
        <ListItem key='request-button'>
          <ListItemText primary={
            <Button
              variant="contained"
              color="primary"
              className="input textarea"
              onClick={sendRequest}
            >Request</Button>
          } />
        </ListItem>
      </List>
    </React.Fragment>
  );
}

export default Request;
