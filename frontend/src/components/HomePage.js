import React, { Component } from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import {Container} from 'reactstrap';

class MenuForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        
    }
    componentDidMount()
    {
        console.log(this.props.location.state.aid)
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push("/login");
    
    }
    handleUpdate(event) {
        event.preventDefault();
        this.props.history.push("/register"); 
    }

    render() {
        const aid = this.props.location.state.aid
        return (
          <Container className="Login">
            <div className="App">
          <div className="App__Form">
          <form className="FormFields" onSubmit={this.handleSubmit}>
          <div className="FormField" style={{textAlign:"right"}}>
                  <button className="FormField__Button mr-20"  >Sign Out</button> 
          </div>
          <br />
          </form> 
          <p>
             <b>
           <NavLink to={`${aid}/profile`}  className="but">Click Here</NavLink>
           <span> to complete your profile</span> 
             </b>
           </p> 
           <p>
             <b>
           <NavLink to={`${aid}/apply`}  className="but">Click Here</NavLink>
           <span> to apply</span> 
             </b>
           </p> 
         </div>  
         </div>
          </Container>
          
  
        );
   }
 }
 
 export default MenuForm;
 