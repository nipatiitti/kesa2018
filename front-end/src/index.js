import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import './index.css';
import App from './views/App';
import Add from './views/Add';
import Loc from './views/Loc';
import NoMatch from './views/404'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
});

function Application() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact component={App}/>
          <Route path="/add" component={Add}/>
          <Route path="/loc/:location" component={Loc}/>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

ReactDOM.render(<Application />, document.getElementById('root'));
registerServiceWorker();
