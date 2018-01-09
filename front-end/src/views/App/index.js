import React, { Component } from 'react';

import './App.css';

import Loading from '../../components/Loading';
import Items from '../../components/Items';

import Button from 'material-ui/Button';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
    }
  }

  componentDidMount() {
    this._getData();
  }

  async _getData() {
    try {
      let data = await fetch('/api?mode=every')
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

    const content = this.state.loading ?
      <Loading open={true} />
    :
      <Items data={this.state.data} />

    return (
      <div className="App">
        <div className="bottom">
          <Button raised color="primary" onClick={() => window.location = '/add'}>
            Add data
          </Button>
        </div>
        {content}
      </div>
    );
  }
}

export default App;
