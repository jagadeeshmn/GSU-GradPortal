import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {Container} from 'reactstrap';
import {NotificationManager} from "react-notifications";

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fields: {},
        errors: {}
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
 }
 componentDidMount(){
     console.log(this.props.match.params.aid)
    var config = {
      header: {'Access-Control-Allow-Origin': '*'}  
    };
    var aid=this.props.match.params.aid
    axios.get('/'+aid+'/fetch_profile',config)
        .then(res => {
            this.setState({
                fields:res.data.data
              });
              console.log(this.state.fields.state)
        })
        

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

var apiBaseUrl = "/edit_profile";
var self = this;
var payload = {

  "fname":this.state.fields['fname'],
  "lname":this.state.fields['lname'],
  "address1":this.state.fields['address1'],
  "address2":this.state.fields['address2'],
  "city":this.state.fields['city'],
  "state":this.state.fields['state'],
  "zip":this.state.fields['zip'],
  "GREQ":this.state.fields['GREQ'],
  "GREV":this.state.fields['GREV'],
  "GREA":this.state.fields['GREA'],
  "TOEFL":this.state.fields['TOEFL'],
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
    if (response.data.status === 200 ) 
    {
      NotificationManager.success('Success','Profile updated');
      self.props.history.push(
        {
          pathname: '/home',
          state: {email: self.state.fields['email'],aid: self.props.match.params.aid}
        });
    }
    else if(response.data.status === 404)
    {
      NotificationManager.error('Unable to update Profile','');
      self.props.history.push({
        pathname: '/login'
       
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
//else
//{alert("Fill the form details");}
}
    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["fname"]) {
          formIsValid = false;
          errors["fname"] = "*Please enter your Firstname.";
        }
        if (!fields["lname"]) {
          formIsValid = false;
          errors["lname"] = "*Please enter your Lastname.";
        }
        if (!fields["address1"]) {
            formIsValid = false;
            errors["address1"] = "*Please enter your address.";
          }
          if (!fields["address2"]) {
            formIsValid = false;
            errors["address2"] = "*Please enter your address.";
          }
          if (!fields["city"]) {
            formIsValid = false;
            errors["city"] = "*Please enter your city.";
          }
          if (!fields["state"]) {
            formIsValid = false;
            errors["state"] = "*Please enter your state.";
          }
          if (!fields["zip"]) {
            formIsValid = false;
            errors["zip"] = "*Please enter your zip-code.";
          }
          if (!fields["GREQ"]) {
            formIsValid = false;
            errors["GREQ"] = "*Please enter your GREQ.";
          }
          if (!fields["GREV"]) {
            formIsValid = false;
            errors["GREV"] = "*Please enter your GREV.";
           }
           if (!fields["GREA"]) {
            formIsValid = false;
            errors["GREA"] = "*Please enter your GREA.";
           }
           if (!fields["TOEFL"]) {
            formIsValid = false;
            errors["TOEFL"] = "*Please enter your TOEFL.";
           }
        this.setState({
          errors: errors
        });
        return formIsValid;
    
      }
    render() {
   return (
    <Container className="Login">
      <div className="FormCenter" >
    <form className="FormFields" onSubmit={this.handleSubmit}>
      <div className="FormField">
        <label className="FormField__Label" htmlFor="fname">First-Name</label>
        <input type="text" id="fname" className="FormField__Input" placeholder="Enter your First Name" name="fname" value={this.state.fields.fname} onChange={this.handleChange} />
        <div>{this.state.errors.fname}</div>
      </div>
      <div className="FormField">
        <label className="FormField__Label" htmlFor="lname">Last-Name</label>
        <input type="text" id="lname" className="FormField__Input" placeholder="Enter your Last Name" name="lname" value={this.state.fields.lname} onChange={this.handleChange} />
        <div>{this.state.errors.fname}</div>
      </div>
      <div className="FormField">
        <label className="FormField__Label" htmlFor="address1">Address1</label>
        <input type="text" id="address1" className="FormField__Input" placeholder="Enter your address" name="address1" value={this.state.fields.address1} onChange={this.handleChange} />
        <div>{this.state.errors.address1}</div>
      </div>
      <div className="FormField">
        <label className="FormField__Label" htmlFor="address2">Address2</label>
        <input type="text" id="address2" className="FormField__Input" placeholder="Enter your address" name="address2" value={this.state.fields.address2} onChange={this.handleChange} />
        <div>{this.state.errors.address2}</div>
      </div>
      <div className="FormField">
        <label className="FormField__Label" htmlFor="state">City</label>
        <input type="text" id="city" className="FormField__Input" placeholder="Enter your city" name="city" value={this.state.fields.city} onChange={this.handleChange} />
        <div>{this.state.errors.city}</div>
      </div>
      <div className="FormField">
        <label className="FormField__Label" htmlFor="state">State</label>
        <input type="text" id="state" className="FormField__Input" placeholder="Enter your state" name="state" value={this.state.fields.state} onChange={this.handleChange} />
        <div>{this.state.errors.state}</div>
      </div>
      <div className="FormField">
        <label className="FormField__Label" htmlFor="state">Zip-Code</label>
        <input type="number" id="zip" className="FormField__Input" placeholder="Enter your zip-code" name="zip" value={this.state.fields.zip} onChange={this.handleChange} />
        <div>{this.state.errors.zip}</div>
      </div>
      <div className="FormField">
        <label className="FormField__Label" htmlFor="GREQ">GREQ</label>
        <input type="number" id="GREQ" className="FormField__Input" placeholder="Enter your GREQ" name="GREQ" value={this.state.fields.GREQ} onChange={this.handleChange} />
        <div>{this.state.errors.GREQ}</div>
      </div>
      <div className="FormField">
        <label className="FormField__Label" htmlFor="GREV">GREV</label>
        <input type="number" id="GREV" className="FormField__Input" placeholder="Enter your GREV" name="GREV" value={this.state.fields.GREV} onChange={this.handleChange} />
        <div>{this.state.errors.GREV}</div>
      </div>
      <div className="FormField">
        <label className="FormField__Label" htmlFor="GREA">GREA</label>
        <input type="number" id="GREA" className="FormField__Input" placeholder="Enter your GREA" name="GREA" value={this.state.fields.GREA} onChange={this.handleChange} />
        <div>{this.state.errors.GREA}</div>
      </div>
      <div className="FormField">
        <label className="FormField__Label" htmlFor="TOEFL">TOEFL</label>
        <input type="number" id="TOEFL" className="FormField__Input" placeholder="Enter your TOEFL" name="TOEFL" value={this.state.fields.TOEFL} onChange={this.handleChange} />
        <div>{this.state.errors.TOEFL}</div>
      </div>
      <div className="FormField">
          <button className="FormField__Button mr-20">Update</button> 
      </div>     
  </form>
  </div>
    </Container>
    
);
  }
}

export default ProfileForm;
