import React, { Component } from 'react';
import axios from 'axios';

class ViewFees extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sid:'',
        showSuccess:false,
        showFailure:false,
        amount:''
      }
  
 }
componentDidMount(){
  var self = this;
  this.setState({
    sid:this.props.location.state.sid
  })
  var config = {
    header: {'Access-Control-Allow-Origin': '*'}
  };
  var apiBaseUrl = "/ogms/view_fees";
  var payload={
    sid:this.props.location.state.sid
  };
  axios.post(apiBaseUrl, payload, config).then(function (response) 
    {
      console.log(response);
      
        //alert(response.data.status);
        if (response.data.status === 200 ) 
       {
          self.setState({
            showSuccess :true,
            amount:response.data.amount
          })
       }
        else if(response.data.status === 404)
        {
          self.setState({
            showFailure :true
          })
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

}

    render() {
      const displaySuccessStyle=this.state.showSuccess?{}:{display:'none'}
      const displayFailureStyle=this.state.showFailure?{}:{display:'none'}
    return (
      <div>
        <div style={displaySuccessStyle}>
          <h1 >Waiver Amount is: ${this.state.amount}</h1>
          <h1 >Total Fee : $4,000</h1>
        </div>
        <div style={displayFailureStyle}>
          <h1 >Total Fee : $14,000</h1>
        </div>

      </div>
    )
  }
}

export default ViewFees;