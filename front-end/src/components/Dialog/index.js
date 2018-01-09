import React from 'react';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

class AddDialog extends React.Component {

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = (value) => {
    this.props.onClose(value);
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const {data, onClose, selectedValue, ...options } = this.props;

    return (
      <Dialog onClose={this.handleClose} {...options}>
        <DialogTitle>Choose place</DialogTitle>
        <div>
          <List>
            {data.map(place => (
              <ListItem button onClick={() => this.handleListItemClick(place)} key={place}>
                <ListItemText primary={this.capitalize(place)} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

AddDialog.propTypes = {
  data: PropTypes.array.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default AddDialog;
