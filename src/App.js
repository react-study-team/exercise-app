import React, { PureComponent } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  top: {
    display: 'flex',
    alignItems: 'center',
    background: '#EEE',
  },
  button: {
    marginRight: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  content: {
    position: 'absolute',
    top: '36px',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const Names = ['liuxiong', 'suwei','cyy'];

function Empty(props) {
  return <div>查无此人</div>
}

class App extends PureComponent {
  state = {
    name: Names[0],
    open: false,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    let { classes } = this.props;
    let PalyReactView = Empty; 
    try {
      PalyReactView = require(`./${this.state.name}/PlayReact`).default;
    } catch(err) {
      alert('You have not do this exercise');
    }

    return (
      <div>
        <div className={classes.top}>
          <Button className={classes.button} onClick={this.handleOpen}>
            Select User
          </Button>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.name}
            onChange={this.handleChange}
            inputProps={{
              name: 'name',
              id: 'demo-controlled-open-select',
            }}
          >
            {Names.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)}
          </Select>
        </div>
        <div className={classes.content}>
          <PalyReactView />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
