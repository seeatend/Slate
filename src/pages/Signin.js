import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';
import Editor from './Editor';

import firebase from '../Firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allUsers: [],
      name: "",
      email: "",
      password: "",
      msg: "",
      loginFlag: false
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.login = this.login.bind(this);
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

  changeEmail(e) {
    this.setState({ email: e.target.value });
  }
  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  login() {
    if(this.state.email === "" || this.state.password === "") {
      this.setState({ msg: "Please fill the email & password fields." });
      return false;
    }
    
    let msg = "";
    let username = "";
    this.state.allUsers.map(user => {
      if(user.email === this.state.email && user.password === this.state.password) {
        msg = "Logged in successfully!";
        username = user.name;
      }
    });
    
    if(msg !== "") {
      this.setState({ msg, loginFlag: true, name: username });
    } else {
      this.setState({ msg: "Failed to log in. Please try again." });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          !this.state.loginFlag ?
            <div>
              <p className="App-intro username">
                <span className="warn-msg"><i>{this.state.msg}</i></span>
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
                <button onClick={this.login} >Log In</button>
                <Link to="/signup">Sign up</Link>
              </p>
            </div>
            :
            <Editor name={this.state.name} email={this.state.email} />
        }

      </div>
    );
  }
}

export default App;