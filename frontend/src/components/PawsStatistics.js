import React,{Component} from "react";
import axios from "axios";
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button
} from 'reactstrap';

class Statistics extends Component {
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
    var apiBaseUrl = "/getstats";
    var self = this;
    var payload = {
        "termOfAdmission":this.state.fields['termofAdmission'],
        "yearOfAdmission":this.state.fields['yearofAdmission'],

 }
 var config = {
    
    header: {'Access-Control-Allow-Origin': '*'}
    
};
if (this.validateForm()) {
    axios.post(apiBaseUrl, payload, config).then(function (response) 
    {
      console.log(response.data);

        if (response.data.status === 200 ) 
        {
            self.props.history.push
          (
      
            {
            pathname: '/getstats',
            state: {data: response.data}
            }
          );
        }
    else{
          alert("Internal Server Error");  
        }
    }
    )
    
    .catch(function (error)
     {
      console.log(error);
    });
    event.preventDefault();
    }
}

validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
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
render() {

    return (
      <Container className="Login">
          <h2>Get Statistics</h2>
          <Form className="form" onSubmit={this.handleSubmit}>
            <Col>
              <FormGroup>
                <Label>Term of Admission<span className="text-danger">*</span></Label>
                <select  value={this.state.termofAdmission} name="termofAdmission" onChange={this.handleChange}>
                  <option value="">--- Select Term --</option>
                  <option value="SP">Spring</option>
                  <option value="SU">Summer</option>
                  <option value="FA">Fall</option>
                </select>
                <div className="text-danger">{this.state.errors.termofAdmission}</div>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="yearofAdmission">Year of Admission:<span className="text-danger">*</span></Label>
                <input type="number" max="2099" min="2000" id="yearofAdmission" name="yearofAdmission" value={this.state.yearofadmission} onChange={this.handleChange} />
                <div className="text-danger">{this.state.errors.yearofAdmission}</div>
              </FormGroup>
            </Col>
            <Button>Submit</Button>
          </Form>
        </Container>
     );
}
}

export default Statistics;