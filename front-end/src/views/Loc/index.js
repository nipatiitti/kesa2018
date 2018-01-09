import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../../components/Loading';

import Button from 'material-ui/Button';

import {places, capitalize} from '../utils';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class Loc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      location: props.match.params.location
    }
  }

  componentDidMount() {
    if(places.indexOf(this.state.location) === -1) {
      window.location = '/404'
    }
    this._getData();
  }

  async _getData() {
    try {
      let data = await fetch('/api?mode=day&place='+this.state.location)
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
      this.setState({
        data,
        loading: false,
      })
    } catch (e) {
      console.log(e);
    }
  }

  render() {

    const content = this.state.loading ? <Loading open={true} /> :
      this.state.data.length > 0 ?
        <div>
          <p className="text">The highest one today: {this.state.data[this.state.data.length-1].temp}°C</p>
          <p className="text">The lowest one today: {this.state.data[0].temp}°C</p>
        </div>
      :
        <div>
          <p className="text">No data for today. Feel free to add some</p>
        </div>
    ;

    return (
      <div className="App full">
        <p className="text">{capitalize(this.state.location)}</p>
        {content}
        <Button onClick={() => window.location = '/'}>Back</Button>
      </div>
    );
  }
}

Loc.propTypes = {
  params: PropTypes.object,
};

export default Loc;
