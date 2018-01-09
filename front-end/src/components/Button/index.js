import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {
  root: {
    background: 'black',
    borderRadius: 3,
    borderColor: 'lightyellow',
    borderWidth: 1,
    borderStyle: 'solid',
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0px 1px 4px 1px rgba(255,255,255,1)',
  },
  label: {
    textTransform: 'capitalize',
  },
};

function NewButton(props) {
  return (
    <Button
      classes={{
        root: props.classes.root,
        label: props.classes.label,
      }}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
}

NewButton.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewButton);
