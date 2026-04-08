import React,{Component} from "react"
import {Table} from "reactstrap"

class Get_Enrolls_View extends Component{
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
		<h1>List of Students enrolled</h1>
                <Table>
                <thead>
                        <tr>
                            <th>#</th>
                            <th>CRN</th>
                            <th>SID</th>
                            <th>Term</th>
                            <th>Year</th>
                        </tr>
                </thead>
                <tbody>
                        {this.state.students.map(
                            (student,index)=>
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td >{student.crn}</td>
                                <td>{student.sid}</td>
                                <td >{student.term}</td>
                                <td>{student.year}</td>
                            </tr>
                            )}
                </tbody>
                </Table>
		</div>
	)
}
}

export default Get_Enrolls_View;