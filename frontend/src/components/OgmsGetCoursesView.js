import React,{Component} from "react"
import {Table} from "reactstrap"

class Get_Courses_View extends Component{
	constructor(props){
		super(props)
		this.state={
			courses:[]
		}
	}

componentDidMount()
{
console.log(this.props.location.state.data.data)	
	this.setState({
	courses:this.props.location.state.data.data
	});
}


render(){
	return(
		<div>
		<h1>List of Courses</h1>
                <Table>
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Course Number</th>
                            <th>Prefix</th>
                            <th>Title</th>
                            <th>Hours</th>
                        </tr>
                </thead>
                <tbody>
                        {this.state.courses.map(
                            (course,index)=>
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td >{course.cno}</td>
                                <td>{course.cprefix}</td>
                                <td >{course.ctitle}</td>
                                <td>{course.chours}</td>
                            </tr>
                            )}
                </tbody>
                </Table>
		</div>
	)
}
}

export default Get_Courses_View;