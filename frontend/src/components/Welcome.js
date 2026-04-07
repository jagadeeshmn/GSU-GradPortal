import React, { Component } from 'react';
import {NavLink } from 'react-router-dom';

class Welcome extends Component {
render() {
    return (
        <div>
          <h1>Georgia State University - Slate</h1>
          <h2>Returning Users:</h2>
              <p>
                <b>
              <NavLink to="/login" className="btn btn-primary">Sign In</NavLink>
              <span> to continue an application</span> 
                </b>
              </p>
            <h2 className="qwe"> New User:</h2>
              <p>
                <b>
              <NavLink exact to="/register" className="btn btn-primary">Sign Up</NavLink>
              <span> to create a new application</span>
                </b>
              </p>
        </div>
    );
}
}
export default Welcome;