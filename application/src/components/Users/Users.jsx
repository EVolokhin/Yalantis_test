import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import DirectorsTable from '../UsersTable/UsersTable';
import UsersForm from '../UsersForm/UsersForm';

import withHocs from './UsersHoc';

class Users extends React.Component {
  state = {
    open: false,
    name: '',
    surname: '',
    email: '',
    photo: '',
  }

  handleClickOpen = (data) => {
    this.setState({
      open: true,
      ...data,
    });
  };

  handleClose = () => { this.setState({ name: '', surname: '', email: '', photo: '', open: false }); };

  handleChange = name => ({ target }) => { this.setState({ [name]: target.value }); };
  handleSelectChange = ({ target }) => { this.setState({ [target.name]: target.value }); };

  render() {
    const { name, surname, email, photo, open } = this.state;
    const { classes } = this.props;

    return (
      <>
        <UsersForm handleChange={this.handleChange} handleSelectChange={this.handleSelectChange} selectedValue={{ name, surname, email, photo }} open={open} onClose={this.handleClose} />
        <div className={classes.wrapper}>
          <DirectorsTable onOpen={this.handleClickOpen} onClose={this.handleClose} />
          <Fab onClick={() => this.handleClickOpen(null)} color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </div>
      </>
    );
  }
};

export default withHocs(Users);
