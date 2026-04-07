import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import HeaderSlate from './components/HeaderSlate'
import {NotificationContainer} from "react-notifications";


class App extends Component {
  constructor(){
    super()

  }
  render() {
    return (
      <div className="App">
        <HeaderSlate />
        <Routes />
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
