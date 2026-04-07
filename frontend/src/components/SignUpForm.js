import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
class SignUpForm extends Component 
{
    constructor() 
    {
        super();

        this.state = 
        {
          fields: {},
          errors: {}
        };

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
  
  handleSubmit(event) 
  {
       
      event.preventDefault();
      var apiBaseUrl = "/register";
      var self = this;
      var payload = 
      {
        "email":this.state.fields['email'],
        "fname":this.state.fields['fname'],
        "lname":this.state.fields['lname'],
        "password":this.state.fields['password'],
      }
      var config = 
      {
          
          header: {'Access-Control-Allow-Origin': '*'}
          
      };
      if (this.validateForm()) 
      {
      axios.post(apiBaseUrl, payload, config).then(function (response)
       {
        console.log(response);
        
          if (response.data.status === 201) 
          {
            self.props.history.push
            (
        
              {
              pathname: '/regsucc',
              state: {email: self.state.email}
              }
            );
          }
          else if(response.data.status === 200)
        {
          alert("Please use a different email");
          self.props.history.push({
            pathname: '/register'
           
          });
        }
          else 
          {
            alert("Internal Server Error: Unable to register");
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
    //else
    //{alert("Fill the form details");}
    }
    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
      if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "*Please enter your Email";
      }
      if (!fields["fname"]) {
        formIsValid = false;
        errors["fname"] = "*Please enter your First Name";
      }
      if (!fields["lname"]) {
        formIsValid = false;
        errors["lname"] = "*Please enter your Last Name";
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

    render() 
    {
        return (
          <Container className="Login">
          <h2>Sign Up</h2>
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
                <Label>First Name<span className="text-danger">*</span></Label>
                <Input
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="First Name"
                  value={this.state.fname}
                  onChange={this.handleChange}
                />
                <div className="text-danger">{this.state.errors.fname}</div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Last Name<span className="text-danger">*</span></Label>
                <Input
                  type="text"
                  name="lname"
                  id="lname"
                  placeholder="Last Name"
                  value={this.state.lname}
                  onChange={this.handleChange}
                />
                <div className="text-danger">{this.state.errors.lname}</div>
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
            <Button>Sign Up</Button>&emsp;
            <NavLink to="/login" >Login</NavLink>
          </Form>
        </Container>
        );
    }
  }
export default withRouter(SignUpForm);