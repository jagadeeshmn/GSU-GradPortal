import React,{Component} from "react";
import axios from "axios";
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class ApplicationList extends Component{
    constructor(){
        super()
        this.state = {
            applications:[]
        }
        
    }
    componentDidMount(){
        var config = {
            header: {'Access-Control-Allow-Origin': '*'}
        };

        axios.get('/get_all_applications',config)
        .then(res => {
            this.setState({
                applications:res.data.data
              });
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
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.applications.map(
                            (application,index)=>
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td >{application.fname}</td>
                                <td>{application.lname}</td>
                                <td><NavLink to={`${application.aid}/application`} className="btn btn-info">View Application</NavLink></td>
                                
                            </tr>
                            )}
                    </tbody>
                </Table>
            </div>
            
        )
    }
}



export default ApplicationList