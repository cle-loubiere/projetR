import React, {Component} from 'react';
import {connect} from "react-redux"
import {userLoginRequest,loginAction} from "../actions/loginAction"
import {Redirect} from 'react-router-dom'
import setAuthorizationToken from "../utils/setAuthorizationToken"
import * as jwt from 'jwt-decode'

const mapStateToProps = state => ({
    ...state
  })
  
  const mapDispatchToProps = dispatch => ({
    userLoginRequest : (state) => dispatch(userLoginRequest(state)),
    loginAction : (user)=>dispatch(loginAction(user))
  })

class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
            errors:'',
            isloading:false,
            redirect:false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(event){
        event.preventDefault();
        this.setState({errors:'',isloading:true})
        this.props.userLoginRequest(this.state).then(
            (message) => {console.log(message.data.token);
                localStorage.setItem('jwtToken', message.data.token);
                setAuthorizationToken(message.data.token);
                console.log(jwt(message.data.token));
                this.props.loginAction(jwt(message.data.token));
                this.setState({redirect:false})
            }
            
        ).catch((err)=>{
            console.log(err.response.data.message)
            this.setState({errors:err.response.data.message,isloading:false})
        });

    }

    onChange(event){
        this.setState({[event.target.name] : event.target.value});
    }
    render(){
        if(this.state.redirect){
            return <Redirect to="/lesson/36" />
        }

        return(
            <form onSubmit={this.onSubmit} className="col-4 offset-4">
                {this.state.errors && <span className="help-block">{this.state.errors}</span>}
                
                <div className="form-group row">
                    <label className="control-label">Email</label>
                        <input value = {this.state.email} onChange={this.onChange} type="text" name="email" className="form-control"/>

                </div>

                <div className="form-group row">
                    <label className="control-label">Password</label>
                    <input value = {this.state.password} onChange={this.onChange} type="password" name="password" className="form-control"/>
                </div>

                <div className="form-group">
                    <button disabled={this.state.isloading} className="btn btn-primary btn-lg">
                        Login
                    </button>
                </div>
            </form>

            
        );
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);