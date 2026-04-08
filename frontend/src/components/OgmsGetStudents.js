import React,{Component} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom"
import {Button} from "reactstrap"


class Get_Students extends Component{
	constructor(props){
		super(props);
		this.state={
			majorDept:"",
			students:[],
			errors:{}
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event){
		const {name, value} = event.target
		this.setState({[name]:value})
	}
		
	validateForm() {

    let fields = this.state.majorDept;
    let errors = {};
    let formIsValid = true;
    if (!fields) {
      formIsValid = false;
      errors["department"] = "*Please select a department.";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;

  	}

	handleSubmit(event){
		var self = this;
			
		var apiBaseUrl = "/paws/get_students";
		var payload = {
        "majorDept":this.state.majorDept 		
    	};
    	console.log(payload)
    	var config = {
    	header: {'Access-Control-Allow-Origin': '*'}
    	};
     	if (this.validateForm()) {
     	axios.post(apiBaseUrl, payload, config).then(function (response) 
    	{
      	console.log(response);
      	//alert(response.data.status);
        if (response.data.status === 200 ) 
       {
          self.props.history.push(
        {
          pathname: '/ogms/getstudentsview',
          state: {data : response.data}
        });
        
       }

        else
        {
          alert("Internal Server Error");  
        }
    }
    )
    
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
    }
}
     	//self.props.history.push
           	//(
            // 	{
           // 	pathname: '/ClickMe',
           // 	state: {term: res}
           // 	}
           //	);
	     //})
	    // }
//     		console.log(res.data.data)
//            this.setState({
//                students:res.data.data
//              });
//    	})
//    	.catch(function (error) {
//      	console.log(error);
 //   	});
//    	event.preventDefault();

	render(){
		console.log(this.state.students)
		return(
			<div>
			<form>
				<br />Choose Department : <select value={this.state.majorDept} onChange={this.handleChange} name="majorDept">
				<option value="">---Select Department---</option>
				<option value="CSC">CSC</option>
				<option value="MATH">MATH</option>
				<option value="POLS">POLS</option>
				<option value="HIST">HIST</option>
				</select>
				<div style={{color:"red"}}>{this.state.errors.department}</div><br />
				<Button color="success" onClick={this.handleSubmit}>Submit</Button>
			</form>
			</div>
		)
	}
}

export default Get_Students;