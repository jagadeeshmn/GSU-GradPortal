import React,{Component} from "react";
import axios from "axios";
import { Table } from 'reactstrap';

class GetApplicants extends Component{
    constructor(){
        super();
        
        this.state = {
            applications:[]
        }
        
       
    }
    componentDidMount()
    {   
        console.log("HERE");
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
                applications:res.data.data
              }
            );
        })
        
    }


    render(){
        return(
           <div>
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
          </div>
        
        )
    }      
    
}

export default GetApplicants;