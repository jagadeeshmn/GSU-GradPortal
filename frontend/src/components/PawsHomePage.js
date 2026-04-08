import React,{Component} from "react";
import {Button} from  "reactstrap";

class HomePage extends Component{
    constructor(props){
        super(props)
        this.state={
            sid:""
		}
        this.handleEnroll = this.handleEnroll.bind(this);
        this.handleFinances = this.handleFinances.bind(this);
    }
    handleEnroll(event){

		var self = this;
		self.props.history.push
           (
             {
            pathname: '/paws/semesterselect',
            state: {sid:this.state.sid}
            }
           );
    }
    handleFinances(event){

		var self = this;
		self.props.history.push
           (
             {
            pathname: '/paws/viewfees',
            state: {sid:this.state.sid}
            }
           );
	}
    
    componentDidMount(){
        this.setState({
            sid: this.props.location.state.sid
          });   
    }
    render(){
        return(
            <div>
                <h1>Welcome</h1>
                <div>
                    <Button onClick={this.handleEnroll}>Enrollment</Button>
                    <br /><br /><br />
                    <Button onClick={this.handleFinances}>Finances</Button>
                </div>
            </div>
        )
    }
}
export default HomePage;
