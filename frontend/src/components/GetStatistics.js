import React,{Component} from "react";
import axios from "axios";
import { Table,Card, CardText, CardBody,CardTitle, CardSubtitle } from 'reactstrap';
import DepartmentCount from "./DepartmentCount";

class GetApplicants extends Component{
    constructor(props)
{
        super(props);
        
        this.state = {
            applications:[]
        }
}
    componentDidMount()
    {
      
        this.setState
            (
              {
                applications:this.props.location.state.data
              }
            );
}



    render(){
       
       const data = this.props.location.state.data
        return(
           <div>
            <h1 className="text-center" color="info">Statistics</h1>
            {data.data.map(
                (application,key)=>
                <Card>
                    <CardBody>
                    <CardTitle className="text-left">Department: {Object.keys(application)[0]}</CardTitle>
                    <CardSubtitle>Total Count: {application[Object.keys(application)[0]].total_department}</CardSubtitle>
                    <CardText>
                        {/* <DepartmentCount item={application[Object.keys(application)[0]]} /> */}
                        <DepartmentCount item={application} />
                    </CardText>
                    </CardBody>
                </Card>
            )

            }
          </div>
        
        )
    }      
    
}

export default GetApplicants;