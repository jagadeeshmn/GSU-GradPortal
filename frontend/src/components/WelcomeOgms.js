import React, {Component} from "react";
import gsuOgms from './GSU_OGMS.png';
import {NavLink } from 'react-router-dom';
import {Container} from 'reactstrap';

class WelcomeOgms extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                
                <img src={gsuOgms} height="180" width="180"/>
                
                <Container className="Welcome" >
                
                <br />
                <NavLink to="/getstudents" >Get Students</NavLink>
                <br />
                <NavLink to="/getenrolls" >Get Enrolls</NavLink>
                <br />
                <NavLink to="/getcourses" >Get Courses</NavLink>
                <br />
                <NavLink to="/awardassistantship" >Assign Assistantship</NavLink>
                <br />
                <NavLink to="/gradeupdate" > Update Grade</NavLink>
                </Container>
                
            </div>
        )
    }
}

export default WelcomeOgms;