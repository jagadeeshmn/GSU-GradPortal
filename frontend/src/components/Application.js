import React,{Component} from "react";
import axios from "axios";
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';
import {NotificationManager} from "react-notifications";
import { withRouter } from 'react-router';

class Application extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            application:{}
        }
        this.handleAcceptClick = this.handleAcceptClick.bind(this)
        this.handleRejectClick = this.handleRejectClick.bind(this)
    }

    componentDidMount(){
        var config = {
            header: {'Access-Control-Allow-Origin': '*'}
        };
        var aid=this.props.match.params.aid
        axios.get('/'+aid+'/fetch_application',config)
        .then(res => {
            this.setState({
                application:res.data.data
              });
        })
        
    }
    handleAcceptClick(){
        var self=this;
        var config = {
            header: {'Access-Control-Allow-Origin': '*'}
        };
        var payload = {
            "email":this.state.application.email,
            "admissionStatus":"ACCEPT"
          }
          axios.put("/update_status", payload, config).then(function (response) 
          {
             console.log(response);
            if(response.status===200){
                console.log(self.props);
                NotificationManager.success('Application Accepted','Success');

                setTimeout(()=>{
                    self.props.history.push('/applications')
                },1000)
                
            }
             
           })
           .catch(function (error) {
             console.log(error);
           });
    }
    handleRejectClick(){
        var self=this;
        var config = {
            header: {'Access-Control-Allow-Origin': '*'}
        };
        var payload = {
            "email":this.state.application.email,
            "admissionStatus":"REJECT"
          }
          axios.put("/update_status", payload, config).then(function (response) 
          {
            //  console.log(response);
             NotificationManager.error('Application Rejected','');
             setTimeout(()=>{
                self.props.history.push('/applications')
              },1000)
           })
           .catch(function (error) {
             console.log(error);
           });
    }

    render(){
        const displayStyle=this.state.application.admissionStatus === 'PENDING'?{}:{display:'none'}
        const acceptDisplayStyle = this.state.application.admissionStatus === 'ACCEPT' ? {}:{display:'none'}
        const rejectDisplayStyle = this.state.application.admissionStatus === 'REJECT' ? {}:{display:'none'}
        return(
            <div className="container">
                <h1 className="display-3">Application</h1>
                <Button outline color="success" size="lg" style={acceptDisplayStyle} disabled>ACCEPTED</Button>
                <Button outline color="danger" size="lg" style={rejectDisplayStyle} disabled>REJECTED</Button>
                <br /><br />
                <Card>
                    <CardBody>
                    <CardTitle className="text-left">Personal Details:</CardTitle>
                    <CardSubtitle>NAME: {this.state.application.fname} {this.state.application.lname}</CardSubtitle>
                    <CardText>
                        <p>Email: {this.state.application.email}</p>
                        <p>Address Line 1: {this.state.application.address1}</p>
                        <p>Address Line 2: {this.state.application.address2}</p>
                        <p>{this.state.application.city},{this.state.application.state},{this.state.application.zip}</p>
                    </CardText>
                    </CardBody>
                </Card>
                <br />
                <Card>
                    <CardBody>
                    <CardTitle className="text-left">Test Scores:</CardTitle>
                    <CardText>
                        <p>GRE Quant: {this.state.application.GREQ}</p>
                        <p>GRE Verbal: {this.state.application.GREV}</p>
                        <p>GRE AWA: {this.state.application.GREA}</p>
                        <p>GRE TOEFL: {this.state.application.TOEFL}</p>
                    </CardText>
                    </CardBody>
                </Card>
                <br />
                <Card>
                    <CardBody>
                        <CardTitle className="text-left">Course Details:</CardTitle>
                        <CardText>
                            <p>YEAR: {this.state.application.yearOfAdmission}</p>
                            <p>TERM: {this.state.application.termOfAdmission}</p>
                            <p>PROGRAM: {this.state.application.program}</p>
                            <p>DEPARTMENT NAME: {this.state.application.dname}</p>
                        </CardText>
                    </CardBody>
                </Card>
                <br /><br />
                <div style={displayStyle}>
                    <Button color="success" size="lg" onClick={this.handleAcceptClick}>Accept</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button color="danger" size="lg" onClick={this.handleRejectClick}>Reject</Button>
                </div>
                
            </div>
            
        )
    }
}

export default withRouter(Application);