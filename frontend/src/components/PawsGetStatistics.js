import React,{Component} from "react";
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
        console.log(this.props);
        this.setState
            (
              {
                applications:this.props.location.state.data
              }
            );
}

    render(){
       
       const deptdata = this.props.location.state.data.data;
       console.log(deptdata);
        return(
           <div>
            <h1 className="text-center" color="info">Statistics</h1>
            {deptdata.map(
                (application,key)=><div>

                <DepartmentCount item={application} />
                <br />
                </div>
            )

            }
          </div>
        
        )
    }      
    
}

export default GetApplicants;