import React from 'react';
import PropTypes from 'prop-types';

import Circle from '../Circle';
import Button from '../Button';

const Items = ({data, ...options}) => (
  <div className="container">
    {data.map((item, index) => {

      if (item === null)
        return (<div key={index}></div>);

      const colors = item.temp > 0 ?
        ['black', 'lightyellow', 'orange', 'orange']
      :
        ['black', 'lightyellow', 'lightblue', 'lightblue'];

      return (
        <div className="item" key={index}>
          <Circle
            number={item.temp}
            color={colors}
          />
          <Button text={item.place} onClick={() => window.location = '/loc/' + item.place}/>
        </div>
      )
    })}
  </div>
);

Items.propTypes = {
  data: PropTypes.array.isRequired,
  options: PropTypes.object,
};

export default Items;
