import React, { Component } from 'react';

class ServerError extends Component {
    constructor(props) {
        super(props);
        setTimeout(()=>{
          this.props.history.push('/')
      },4000)
    }
    

   render() {
   
        return (
         <div>
            <h1>Server Error Occurred.Please try again later!</h1> 
            <h3>You will be redirected to Home Page...</h3> 
         </div>
        
          
        );
    }
}
export default ServerError;