import React,{Component} from "react";
import axios from 'axios';
import { Table,Button } from 'reactstrap';

class Schedule extends Component{
    constructor(props){
        super(props)
        this.state ={
            courses:[],
            sid:''
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount(){
        var config = 
        {
            header: {'Access-Control-Allow-Origin': '*'}
        };
        var sid = this.props.location.state.sid
        this.setState({
            sid:sid
        })
        axios.get('/paws/'+sid+'/get_schedule',config)
        .then(res => {
            this.setState({
                courses:res.data.data
              });
              console.log(this.state.courses)
        })

    }
    handleClick(){
        var self = this;
		self.props.history.push({
            pathname: '/paws/semesterselect',
            state: {sid:this.state.sid}
            }
           );
    }

    render(){
        return(
            <div>
                <h1>Schedule</h1>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course Prefix</th>
                            <th>Course CRN</th>
							<th>Course Title</th>
                            <th>Days</th>
                            <th>Start Time</th>
							<th>End Time</th>
                            <th>Instructor</th>
							<th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.courses.map(
                            (course,index)=>
                            <tr key={index}>
								<th scope="row">{index+1}</th>
                                <td>{course.cprefix}</td>
								<td>{course.crn}</td>
								<td >{course.ctitle}</td>
                                <td>{course.days}</td>
								<td>{course.starttime}</td>
								<td >{course.endtime}</td>
                                <td>{course.instructor}</td>
								<td>{course.room}</td>
                                {/* <td><NavLink to={`${application.aid}/application`} className="btn btn-info">View Application</NavLink></td> */}
                                
                            </tr>
                            )}
                    </tbody>
                </Table>
                <Button onClick={this.handleClick}>Modify Schedule</Button>
            </div>
        )
    }
}

export default Schedule