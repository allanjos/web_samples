import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class App extends React.Component {
  items = [];
  newName = '';

  state = {
    items: this.items,
    newName: ''
  }

  handleChange = (e) =>{ 
    this.newName = e.target.value;

    this.setState(state => ({
      newName: this.newName
    }));
  }

  onButtonAddClick = (e) => {
    console.log('onButtonAddClick()');

    console.log('items count: ' + this.items.length);

    if (!this.newName) {
      console.error('Invalid name');
      return;
    }

    let newItem = {
      id: this.items.length + 1,
      title: this.newName
    };

    this.items.push(newItem);

    this.newName = '';

    this.setState(state => ({
      newName: this.newName,
      items: this.items
    }));

    console.log(this.state.items);
  }

  render = () => {
    const {items} = this.state
    
    return (
      <div className="App">
        <header className="App-header">
          Demo React App
        </header>

        <div className="App-body">
          <Paper className="Paper-form">
            <h2>Register new item</h2>

            <TextField
              id="newName"
              label="Name"
              value={this.state.newName}
              onChange={this.handleChange}
              margin="normal"/>

            <br/>

            <Button onClick={this.onButtonAddClick} variant="contained" color="primary">
              Add item
            </Button>
          </Paper>

          <br/>

          <Paper className="Paper-form">
            <h2>Registered items</h2>

            <List component="nav">
              {
                items.map(item => (
                  <ListItem button key={item.id} href="#simple-list">
                    <ListItemText primary={item.title}></ListItemText>
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </div>

      </div>
    );
  }
}

export default App;
