import React, {Component} from 'react';
import SignupForm from "./SignupForm"
class SignupPage extends Component{
    render(){
        return(
            <div>
                <h1>SignupPage</h1>
                <div>
                    <SignupForm/>
                </div>
            </div>
            
        );
    }
}



export default SignupPage;