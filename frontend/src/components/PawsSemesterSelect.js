import React,{Component} from "react";
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button
  } from 'reactstrap';

class SemesterSelect extends Component{
    constructor(props){
        super(props)
        this.state={
            term:"",
            sid:""
		}
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(event){
		const {name, value} = event.target
		this.setState({[name]: value})
	}

	handleSubmit(event){
		console.log(this.state.term);
		var self = this;
		self.props.history.push
           (
             {
            pathname: '/paws/adddropcourses',
            state: {term: this.state.term,sid:this.state.sid}
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
            <Container className="Login">
          <h2>Select Semester</h2>
          <Form className="form" onSubmit={this.handleSubmit}>
            <Col>
              <FormGroup>
                <select value={this.state.term} onChange={this.handleChange} name="term">
                    <option value="">---Select Semester---</option>
                    <option value="FA">FALL</option>
                    <option value="SU">SUMMER</option>
                    <option value="SP">SPRING</option>
                    </select>
              </FormGroup>
            </Col>
            <Button size="block">Submit</Button>
          </Form>
        </Container>

        )
    }
}
export default SemesterSelect;
