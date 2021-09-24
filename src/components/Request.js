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
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Select from 'react-select'
import UUID from 'uuidjs'
import { createRequest } from '../graphql/mutations'
import * as options from './RequestOptions'

const Request = () => {
  const [area, SetArea] = useState('');
  const [cost, SetCost] = useState(0);
  const [number, SetNumber] = useState(0);
  const [date, SetDate] = useState('');
  const [days, SetDays] = useState(0);
  const [genre, SetGenre] = useState('');
  const [range, SetRange] = useState(0);
  const [context, SetContext] = useState('');
  const [status, SetStatus] = useState('running');
  const [tags, SetTags] = useState([])

  const sendRequest = async () => {
    function ZP(num,length){
      return ('0000000' + num).slice(-length);
    }
    var format = date.getFullYear() + '-' + ZP(date.getMonth() + 1, 2) + '-' + ZP(date.getDay(), 2)
    const postID = UUID.generate()
    const res = await API.graphql(
      graphqlOperation(createRequest, {
        input: {
          type: "post",
          id: postID,
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
    alert('Successfully Requested.')
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

  // Handers
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
    <List>
      <ListItem key='post-input-field'>
        <div>DESCRIPTION</div>
        <Select
          id="area"
          onChange={handleArea}
          options={options.AREA_OPTIONS}
        />
      </ListItem>
      <ListItem key='post-input-field'>
        <ListItemText primary={
          <TextField
            id="cost"
            label="COST"
            multiline
            rowsMax="8"
            variant="filled"
            type="number"
            value={cost}
            onChange={handleCost}
            margin="normal"
          />
        } />
      </ListItem>
      <ListItem key='post-input-field'>
        <ListItemText primary={
          <TextField
            id="number"
            label="FELLOW NUMBER"
            multiline
            rowsMax="8"
            variant="filled"
            type="number"
            value={number}
            onChange={handleNumber}
            margin="normal"
          />
        } />
      </ListItem>
      <ListItem key='post-input-field'>
        <div>DEPARTURE</div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            value={date}
            onChange={handleDate}
          />
        </MuiPickersUtilsProvider>
      </ListItem>
      <ListItem key='post-input-field'>
        <ListItemText primary={
          <TextField
            id="days"
            label="STAYS"
            multiline
            rowsMax="8"
            type="number"
            variant="filled"
            value={days}
            onChange={handleDays}
            endAdornment={<InputAdornment position="end">stays</InputAdornment>}
            margin="normal"
          />
        } />
      </ListItem>
      <ListItem key='post-input-field'>
        <div>GENRE</div>
        <Select
          id="genre"
          label="GENRE"
          onChange={handleGenre}
          options={options.GENRE_OPTIONS}
        />
      </ListItem>
      <ListItem key='post-input-field'>
        <ListItemText primary={
          <TextField
            id="range"
            label="RANGE"
            multiline
            rowsMax="8"
            type="number"
            variant="filled"
            value={range}
            onChange={handleRange}
            margin="normal"
          />
        } />
      </ListItem>
      <ListItem key='post-input-field'>
        <ListItemText primary={
          <TextField
            id="context"
            label="DETAILS"
            multiline
            rowsMax="8"
            variant="filled"
            value={context}
            onChange={handleContext}
            margin="normal"
          />
        } />
      </ListItem>
      <ListItem key='post-button'>
        <ListItemText primary={
          <Button
            variant="contained"
            color="primary"
            onClick={sendRequest}
          >Request</Button>
        } />
      </ListItem>
    </List>
  );
}

export default Request;
