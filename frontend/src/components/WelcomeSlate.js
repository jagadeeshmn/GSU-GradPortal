import React, {Component} from "react";
import gsuSlate from './GSU_SLATE.png';
import {NavLink } from 'react-router-dom';

class WelcomeSlate extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div style={{textAlign:"center"}}>
                <img src={gsuSlate} height="180" width="180"/>
                </div>
                <br />
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
        )
    }
}

export default WelcomeSlate;