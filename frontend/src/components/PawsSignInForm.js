import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class SignInForm extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          fields: {},
          errors: {}
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    

    handleChange(event) 
  {
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
      fields
    });
  }
    handleSubmit(event) {
      console.log("HERE")
        event.preventDefault();

    var apiBaseUrl = "/paws/login";
    var self = this;
    var payload = {
 
      "email":this.state.fields['email'],
      "password":this.state.fields['password']
      
    }
    console.log(payload);
    console.log(this.validateForm());
    console.log(this.state.errors);
    var config = {
        
        header: {'Access-Control-Allow-Origin': '*'}
        
};
    if (this.validateForm()) {
    axios.post(apiBaseUrl, payload, config).then(function (response) 
   {  
        if (response.data.status === 200 ) 
        {
          self.props.history.push({
            pathname: '/paws/home',
            state: {email: self.state.fields['email'],sid: response.data.sid}
            });
        }
        else if(response.data.status === 401)
        {
          alert("Invalid credentials");
          self.props.history.push({
            pathname: '/paws/login'
           
          });
        }
        else {
          alert("Internal Server Error");
          self.props.history.push({
            pathname: '/serverError'
          });
        }
      
    }
    )
  
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }
  }
  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your Email";
    }
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your Password";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;

  }
   render() {
        
        return (
          <Container className="Login">
          <h2>Sign In</h2>
          <Form className="form" onSubmit={this.handleSubmit}>
            <Col>
              <FormGroup>
                <Label>Email<span className="text-danger">*</span></Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="myemail@email.com"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <div className="text-danger">{this.state.errors.email}</div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Password">Password<span className="text-danger">*</span></Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <div className="text-danger">{this.state.errors.password}</div>
              </FormGroup>
            </Col>
            <Button>Sign In</Button>&emsp;
            {/* <NavLink to="/register" >Register</NavLink> */}
          </Form>
        </Container>
        );
    }
}
export default withRouter(SignInForm);