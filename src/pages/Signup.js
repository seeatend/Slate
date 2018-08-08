import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import firebase from '../Firebase';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';

import Editor from './Editor';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allUsers: [],
      username: "",
      email: "",
      password: "",
      msg: "",
      openEditor: false
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signup = this.signup.bind(this);
    this.openEditor = this.openEditor.bind(this);
  }

  componentDidMount() {
    firebase.ref().child('users').on('value', snapshot => {
      let obj_data = snapshot.val();
      let data = [];
      Object.keys(obj_data).map(key => {
        data.push(obj_data[key]);
      });
      this.setState({ allUsers: data });
    });
  }

  changeUsername(e) {
    this.setState({ username: e.target.value });
  }
  changeEmail(e) {
    this.setState({ email: e.target.value });
  }
  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  openEditor() {
    this.setState({ openEditor: true })
  }

  signup() {
    if(this.state.username === "" || this.state.email === "" || this.state.password === "") {
      this.setState({ msg: "Please fill the fields and try again." });
      return false;
    }
    let newNode = {};
    let newId = uniqid("user-");
    newNode[newId] = "";

    let updates = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    
    firebase.ref().child('users/' + newId).update(updates);
    this.setState({ 
      username: "",
      email: "",
      password: "",
      msg: "Sign up successfully." 
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        {
          !this.state.openEditor ?
          <div>
            <p className="App-intro username">
              <span className="warn-msg"><i>{this.state.msg}</i></span>
            </p>
            <p className="App-intro username">
              <label>username :</label>
              <input type="text" value={this.state.username} onChange={this.changeUsername} />
            </p>
            <p className="App-intro email">
              <label>email :</label>
              <input type="text" value={this.state.email} onChange={this.changeEmail} />
            </p>
            <p className="App-intro password">
              <label>password :</label>
              <input type="password" value={this.state.password} onChange={this.changePassword} />
            </p>
            <p className="App-intro submit">
              <button onClick={this.openEditor} >Sign Up</button>
              <Link to="/">back to Sign in page</Link>
            </p>
          </div>
          :
          <Editor name={this.state.username} email={this.state.email} />
        }
        

      </div>
    );
  }
}

export default App;