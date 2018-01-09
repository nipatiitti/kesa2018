import React from 'react';
import PropTypes from 'prop-types';

const NoMatch = ({ location }) => (
  <div>
    <h3>404. No match for <code>{location.pathname}</code></h3>
  </div>
);

NoMatch.propTypes = {
  location: PropTypes.object.isRequired,
};

export default NoMatch;
