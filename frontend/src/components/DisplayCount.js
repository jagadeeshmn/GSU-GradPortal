import React,{Component} from "react";


class DisplayCount extends Component{
    constructor(props){
        super(props);
        this.state={
            showAccept:false,
            showReject:false,
            showPending:false,
            acceptCount:0,
            rejectCount:0,
            pendingCount:0,
            showMsCount:false,
            msCount:0,
            showPhdCount:false,
            phdCount:0
        }
    }
    componentDidMount(){
        console.log(this.props.item);
        const program = this.props.item;
        if(typeof program === 'object'){
            if('ACCEPT' in program){
                // alert("ACCEPT");
                this.setState({
                    showAccept : true,
                    acceptCount:program.ACCEPT
                })
            }
            if('REJECT' in program){
                this.setState({
                    showReject : true,
                    rejectCount:program.REJECT
                })
            }
            if('PENDING' in program){
                this.setState({
                    showPending : true,
                    pendingCount:program.PENDING
                })
            }
            if('total_MS' in program){
                this.setState({
                    showMsCount : true,
                    msCount:program.total_MS
                })
            }
            if('total_PHD' in program){
                this.setState({
                    showPhdCount : true,
                    phdCount:program.total_PHD
                })
            }
        }
        
    }
    render(){
        const acceptDisplayStyle=this.state.showAccept?{}:{display:'none'}
        const rejectDisplayStyle=this.state.showReject?{}:{display:'none'}
        const pendingDisplayStyle=this.state.showPending?{}:{display:'none'}
        const msDisplayStyle=this.state.showReject?{}:{display:'none'}
        const phdDisplayStyle=this.state.showPending?{}:{display:'none'}

        console.log(this.state);
        const program = this.props.item
        console.log(program);
        // alert(this.state.msCount);
        return(
            <div>
                <p style={acceptDisplayStyle}>ACCEPTED: {this.state.acceptCount}</p>
                <p style={rejectDisplayStyle}>REJECTED: {this.state.rejectCount}</p>
                <p style={pendingDisplayStyle}>PENDING: {this.state.pendingCount}</p>
                {/* <p style={msDisplayStyle}>MS Total Count: {this.state.msCount}</p>
                <p style={phdDisplayStyle}>Phd Total Count: {this.state.phdCount}</p> */}
            </div>
            
            
        )
    }
}

export default DisplayCount
