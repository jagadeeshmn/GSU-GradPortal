import React, { Component } from 'react';
import axios from 'axios';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button
} from 'reactstrap';
import {NotificationManager} from "react-notifications";

class AwardAssistantship extends Component {
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
    event.preventDefault();
    var apiBaseUrl = "/ogms/assign_assistantship";
    var self = this;
    var payload = {
        "sid":this.state.fields['sid'],
        "term":this.state.fields['term'],
        "year":this.state.fields['year']
}
 var config = {
    
    header: {'Access-Control-Allow-Origin': '*'}
    
};
if (this.validateForm()) {
    axios.post(apiBaseUrl, payload, config).then(function (response) 
    {
      console.log(response);
      
        //alert(response.data.status);
        if (response.data.status === 201 ) 
       {
         NotificationManager.success('Success','Assistantship Assigned')
       }
        else if(response.data.status === 200)
        {
          NotificationManager.error('Student is not eligible','')
        }

        else
        {
          alert("Internal Server Error");  
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
    if (!fields["sid"]) {
      formIsValid = false;
      errors["sid"] = "*Please enter Student ID:";
    }
    if (!fields["term"]) {
      formIsValid = false;
      errors["term"] = "*Please select a term";
    }
    if (!fields["year"]) {
      formIsValid = false;
      errors["year"] = "*Please select a year";
    }
     this.setState({
        errors: errors
      });
      return formIsValid;
  
    } 
    render() 
    {
   return (
    <Container className="Grade">
    <h2>Assistantship</h2>
    <Form className="form" onSubmit={this.handleSubmit}>
      <Col>
        <FormGroup>
          <Label>SID<span className="text-danger">*</span></Label>
          <Input type="number" id="sid" placeholder="Enter the Student ID" name="sid" value={this.state.sid} onChange={this.handleChange} />
          <div className="text-danger">{this.state.errors.sid}</div>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
        <Label for="term">Term<span className="text-danger">*</span></Label>
        <select  value={this.state.term} name="term" onChange={this.handleChange}>
          <option value="">--- Select Term --</option>
          <option value="SP">Spring</option>
          <option value="SU">Summer</option>
          <option value="FA">Fall</option>
        </select>
          <div className="text-danger">{this.state.errors.term}</div>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>Year of Admission<span className="text-danger">*</span></Label>
          <Input type="number" max="2099" min="2000" id="year" placeholder="Enter the joining year" name="year" value={this.state.year} onChange={this.handleChange} />
          <div className="text-danger">{this.state.errors.year}</div>
        </FormGroup>
      </Col>
      <Button color="success" size="block">Assign</Button>&emsp;
    </Form>
  </Container>
);
  }
}

export default AwardAssistantship;