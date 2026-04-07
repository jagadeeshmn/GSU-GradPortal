import React, { Component } from 'react';
import axios from 'axios';
import {Container,Button} from 'reactstrap';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fields: {},
        errors: {}
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
 }
 componentDidMount()
{
    console.log(this.props.match.params.aid)
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
    var apiBaseUrl = "/apply";
    var self = this;
    var payload = {
        "dname":this.state.fields['dname'],
        "program":this.state.fields['program'],
        "termOfAdmission":this.state.fields['termofAdmission'],
        "yearOfAdmission":this.state.fields['yearofAdmission'],
        "admissionStatus":'PENDING',
        "aid":this.props.match.params.aid
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
          self.props.history.push
          (
      
            {
            pathname: '/appsucc',
            }
          );
        }
        else if(response.data.status === 200)
        {
          alert("Looks like you have already applied");
        }
 
        else if(response.data.status === 404)
        {
          alert("Applicant not found");
        }
        else{
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
    if (!fields["dname"]) {
      formIsValid = false;
      errors["dname"] = "*Please enter your Department.";
    }
    if (!fields["program"]) {
      formIsValid = false;
      errors["program"] = "*Please enter your Program.";
    }
    if (!fields["termofAdmission"]) {
        formIsValid = false;
        errors["termofAdmission"] = "*Please enter the term.";
      }
      if (!fields["yearofAdmission"]) {
        formIsValid = false;
        errors["yearofAdmission"] = "*Please enter the year.";
        
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
      <div>
    <form onSubmit={this.handleSubmit}>
    <label>Select Department</label>
       <select value={this.state.dname} name="dname" onChange={this.handleChange}>
          <option value="">--- Select Department-Name --</option>
          <option value="CSC">Computer Science</option>
          <option value="PHYS">Physics</option>
       </select>
       <div>{this.state.errors.dname}</div>
          <br></br>
          <label>Select Program</label>   
       <select value={this.state.program} name="program" onChange={this.handleChange}>
          <option value="">--- Select Program --</option>
          <option value="MS">Master's</option>
          <option value="PhD">PhD</option>
       </select>
       <div>{this.state.errors.program}</div>
          <br></br>
          <label>Select Term</label>
       <select  value={this.state.termofAdmission} name="termofAdmission" onChange={this.handleChange}>
          <option value="">--- Select Term --</option>
          <option value="SP">Spring</option>
          <option value="SU">Summer</option>
          <option value="FA">Fall</option>
       </select>
       <div>{this.state.errors.termofAdmission}</div>
       <br></br>
        <label htmlFor="yearofAdmission">Year of Admission</label>
        <input type="number" max="2099" min="2000" id="GREA" placeholder="Enter the joining year" name="yearofAdmission" value={this.state.yearofadmission} onChange={this.handleChange} />
        <div>{this.state.errors.yearofAdmission}</div>
        <br />
        <div className="FormField">
        <Button color="success" size="block">Apply</Button>
          
      </div> 
  </form>
   </div>
    </Container>
    
);
  }
}

export default ApplicationForm;