import React, { Component } from 'react';

import Dialog from '../../components/Dialog';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import {places, capitalize} from '../utils';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedValue: places[0],
      temp: '',
    }
  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
  };

  handleClose(value){
    this.setState({
      selectedValue: value,
      open: false
    });
  };

  async _post() {
    try {
      if(isNaN(this.state.temp)) {
        alert('Bad variables');
        return
      }
      await fetch("/api?temp="+this.state.temp+"&place="+this.state.selectedValue, { method: "POST" })
        .then((response) => {
          if (response.status >= 400) {
            alert("Can't send data");
            throw new Error("Bad response from server");
          }
        })
      alert('Added data');
    } catch (e) {
      console.log(e);
    }
  }

  render() {

    return (
      <div className="App full">
        <Dialog
          data={places}
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={(value) => this.handleClose(value)}
        />
        <div className="bottom">
          <p>Selecetd: {capitalize(this.state.selectedValue)}</p>
          <Button onClick={() => this.handleClickOpen()}>Change place</Button>
          <TextField
            label="Temperature"
            type="number"
            value={this.state.temp}
            onChange={(e) => this.setState({temp: e.target.value})}
            margin="normal"
          />
          <Button onClick={() => this._post()}>SEND!</Button>
          <Button onClick={() => window.location = '/'}>Back</Button>
        </div>
      </div>
    );
  }
}

export default Add;
