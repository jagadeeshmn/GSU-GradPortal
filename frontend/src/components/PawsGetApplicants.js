import React,{Component} from "react";
import axios from "axios";
import { Table,Button,Form } from 'reactstrap';
import {NotificationManager} from "react-notifications";

class GetApplicants extends Component{
    constructor(){
        super();
        
        this.state = {
            applications:[],
            showApplications:false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
       
    }
    

    componentDidMount()
    {
        this.setState({
            showApplications:false
        });   
    }
    handleClick(event) {
        console.log("HERE")
        
        var config = 
        {
            header: {'Access-Control-Allow-Origin': '*'}
        };
        axios.get('/get_accepted_applications',config)
        .then(res => {
            console.log(res)
            this.setState
            (
              {
                applications:res.data.data,
                showApplications:true
              }
            );
            console.log(this.state.applications)
        })
      }

    handleSubmit(event){
        var config = 
        {
            header: {'Access-Control-Allow-Origin': '*'}
        };
        axios.post('/paws/registration', this.state.applications,config).then(res=>{
            console.log(res)
            if(res.status === 200){
                NotificationManager.success('Applications Saved','Success');
                setTimeout(()=>{
                    window.location.reload()

                },1000)
                
            }
        })
    }


    render(){
        const displayStyle=this.state.showApplications?{}:{display:'none'}
        const buttonDisplayStyle=this.state.showApplications?{display:'none'}:{}
        return(
           <div>
               <Button style={buttonDisplayStyle} onClick={this.handleClick} className="btn btn-primary">Fetch New Applicants</Button>
               <div style={displayStyle}>
                   <Form className="form" onSubmit={this.handleSubmit}>
                        <h1 className="text-center" color="info">List of Applicants</h1>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>DOA</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.applications.map(
                                    (application,key)=>
                                    <tr key={key}>
                                        <th scope="row">{key+1}</th>
                                        <td>{application.dateOfApp}</td>
                                        <td>{application.email}</td>
                                        <td>{application.fname}</td>
                                        <td>{application.lname}</td>
        
                                    </tr>
                                    )}
                            </tbody>
                        </Table>
                        <Button>Save</Button>
                   </Form>
                    
                </div>
            
          </div>
        
        )
    }      
    
}

export default GetApplicants;