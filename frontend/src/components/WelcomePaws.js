import React, {Component} from "react";
import gsuPaws from './GSU_PAWS.png';
import {NavLink} from 'react-router-dom';

class WelcomePaws extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div style={{textAlign:"center"}}>
                <br />
                <img src={gsuPaws} height="180" width="180"/>
                </div>
                <br />
                <b>
            <NavLink to="/login" className="btn btn-primary">Sign In</NavLink>
            <span> to PAWS application</span> 
        </b>
        <br /><br />
        <b>
        <span>Director: </span> 
            <NavLink to="/applications" >Fetch Applicants</NavLink>
            <br />
            <NavLink to="/statistics" >University Stats</NavLink>
        </b>

            </div>
        )
    }
}

export default WelcomePaws;