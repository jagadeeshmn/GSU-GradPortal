import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

class RegistrationSuccessForm extends Component {
  constructor(props) {
    super(props);
    
  }
  
   render() {
   return (
      <div className="App">
        <div className="App__Form">
           <h1>Congratulations!! Now you are a registered user</h1>
           <p>
             <b>
           <NavLink to="/login" className="but">Click here to Sign-In::</NavLink>
            </b>
           </p>
        </div>
      </div>
);
  }
}

export default RegistrationSuccessForm;
