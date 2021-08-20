import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SaveIcon from '@material-ui/icons/Save';

import withHocs from './UsersFormHoc';

class UsersForm extends React.Component {
  handleClose = () => { this.props.onClose(); };

  handleSave = () => {
    const { selectedValue, onClose, addUser } = this.props;
    const { name, surname, email, photo } = selectedValue;
    addUser({ name, surname, email, photo })
    onClose();
  };

  render() {
    const { data = {}, classes, open, handleChange, handleSelectChange, selectedValue = {} } = this.props;
    const { name, surname, email, photo } = selectedValue;


    console.log(selectedValue)
    console.log(handleSelectChange) // remove from cars and add to users

    return (
      <Dialog onClose={this.handleClose} open={open} aria-labelledby="simple-dialog-title">
        <DialogTitle className={classes.title} id="simple-dialog-title">Users information</DialogTitle>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={name}
            onChange={handleChange('name')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-rate"
            label="Surname"
            className={classes.textField}
            value={surname}
            onChange={handleChange('surname')}
            margin="normal"
            variant="outlined"
          />
          <TextField
              id="outlined-position"
              label="email"
              className={classes.textField}
              value={email}
              onChange={handleChange('email')}
              margin="normal"
              variant="outlined"
          />
          <TextField
              id="outlined-gender"
              label="Photo"
              className={classes.textField}
              value={photo}
              onChange={handleChange('photo')}
              margin="normal"
              variant="outlined"
          />
          <div className={classes.wrapper}>
            <Button onClick={this.handleSave} variant="contained" color="primary" className={classes.button}>
              <SaveIcon /> Save
            </Button>
          </div>
        </form>
      </Dialog>
    );
  }
};

  export default withHocs(UsersForm);
