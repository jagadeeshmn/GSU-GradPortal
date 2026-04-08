import React,{Component} from "react";
import DisplayCount from "./DisplayCount";


class ProgramCount extends Component{
    constructor(props){
        super(props);
        this.state={
            showAccept:false,
            showReject:false,
            showPending:false,
            acceptCount:0,
            rejectCount:0,
            pendingCount:0,
        }
    }
    componentDidMount(){
        
    }
    render(){
       
        console.log(this.state);
        const program = this.props.item
        console.log(program);
        // delete program['total_department']
        return(
            <div>
                
                {
                    Object.keys(program).map(
                        (p,key)=>(
                            <div>
                            <h3>PROGRAM: {p}</h3>
                            <DisplayCount item={program[p]} />
                            </div>
                        )
                        
                    )
                }
            </div>
            
            
        )
    }
}

export default ProgramCount
