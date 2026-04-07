import React, { Component } from 'react';

class ApplicationSuccess extends Component {
    constructor(props) {
        super(props);
    }
   render() {
   
        return (
         <div>
             <h1>Your Application has been sent successfully!</h1>
            <h3>Your application will be reviewed and you will be notified soon</h3>  
         </div>
        );
    }
}
export default ApplicationSuccess;