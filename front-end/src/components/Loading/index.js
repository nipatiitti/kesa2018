import React from 'react';
import PropTypes from 'prop-types';

import './loading.css';

import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';


const Loading = ({open, ...options}) => (
    <div className={open ? "" : "hide"} {...options}>
      <CircularProgress size={50} style={{ color: purple[500] }} />
    </div>
);

Loading.propTypes = {
  open: PropTypes.bool.isRequired,
  options: PropTypes.object,
};

export default Loading;
