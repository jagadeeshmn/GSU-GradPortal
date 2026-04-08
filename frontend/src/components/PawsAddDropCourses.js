import React, {Component} from 'react';
import axios from 'axios';
import { Table,Form,Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class AddDropCourses extends Component{
	constructor(props){
		super(props);
		this.state={
			courses:[],
			sid:''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event){
		// console.log(event.target)
		const {name, value, type, checked} = event.target
		
		
		if(checked){
			this.setState({[name]: value})
		}else{
			this.setState({[name]: false})
		}
		
	}

	componentDidMount()
	{
		var config = 
        {
            header: {'Access-Control-Allow-Origin': '*'}
		};
		var payload ={
			term:this.props.location.state.term
		}
		this.setState({
			sid:this.props.location.state.sid,
			term:this.props.location.state.term
		})
        axios.post('/paws/get_all_courses', payload,config).then(res=>{
			console.log(res)
			this.setState({
                courses:res.data.data
			  });
		})
		
		console.log(this.props);
	}
	
	handleSubmit(event){
		var self=this;
		console.log(this.state.courses);
		var selectedCourses = [];

		self.state.courses.map(
			(course,index )=>{
				if(course.crn in self.state){
					selectedCourses.push(course)
				}
			})
		var config = {
			header: {'Access-Control-Allow-Origin': '*'}
		};
		var payload ={
			'sid':self.state.sid,
			'courses':selectedCourses,
			'term':self.state.term
		}
		axios.post('/paws/modify_enrollment', payload,config).then(res=>{
			console.log(res)
		})

		self.props.history.push({
            pathname: '/paws/schedule',
            state: {selectedCourses: selectedCourses,sid:this.state.sid}
		});

	}

	render(){
		return(
			<div>
                <h1 className="text-center" color="info">Add/Drop Courses</h1>
				<Form onSubmit={this.handleSubmit}>
				<Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course No</th>
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
								<th scope="row"><input type="checkbox" name={course.crn} value={course.crn} checked={course.crn1} onChange={this.handleChange}/></th>
                                <td >{course.cno}</td>
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
					<Button color="success" size="lg">Submit Changes</Button>
				</Form>
                
            </div>
		)
	}
}

export default withRouter(AddDropCourses);