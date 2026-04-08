import React,{Component} from "react"
import {Table} from "reactstrap"
import {Container} from 'reactstrap';

class Get_Students_View extends Component{
	constructor(props){
		super(props)
		this.state={
			students:[]
		}
	}

componentDidMount()
{
console.log(this.props.location.state.data.data)	
	this.setState({
	students:this.props.location.state.data.data
	});
}


render(){
	return(
       
            <div>
		<h1>List of Students</h1>
                <Table>
                <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                </thead>
                <tbody>
                        {this.state.students.map(
                            (student,index)=>
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td >{student.sid}</td>
                                <td>{student.email}</td>
                                <td >{student.fname}</td>
                                <td>{student.lname}</td>
                            </tr>
                            )}
                </tbody>
                </Table>
		</div>
		
	)
}
}

export default Get_Students_View;