import React, {Component} from 'react';
import LoginForm from "./LoginForm"
import SendMailForm from "./SendMailForm"
class LoginPage extends Component{
    render(){
        return(
            <div>
                <h1>LoginPage</h1>
                <div>
                    <SendMailForm/>
                    <LoginForm/>
                </div>
            </div>
            
        );
    }
}



export default LoginPage;