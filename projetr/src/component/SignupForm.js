import React, {Component} from 'react';
import {connect} from "react-redux"
import { userSignupRequest } from '../actions/signupAction';
import {withRouter,Redirect} from 'react-router-dom'

const mapStateToProps = state => ({
    ...state
  })
  
  const mapDispatchToProps = dispatch => ({
    userSignupRequest:  (state)=>dispatch(userSignupRequest(state)),

  })

class SignupForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            nom:'',
            prenom:'',
            section:'',
            email : '',
            password: '',
            passwordConfirmation:'',
            errors:'',
            isloading:false,
            redirect:false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        
    }
    onSubmit(event){
        event.preventDefault();
        this.setState({errors:'',isloading:true})
        this.props.userSignupRequest(this.state).then(
            (message) => {console.log(message);this.setState({redirect:true})}
            
        ).catch((err)=>{
            console.log(err.response.data.message)
            this.setState({errors:err.response.data.message,isloading:false})
        });

    }

    onChange(event){
        this.setState({[event.target.name] : event.target.value});
    }
    render(match){
        if(this.state.redirect){
            return <Redirect to="/" />
        }

        return(
            <form onSubmit={this.onSubmit} className="col-4 offset-4">
                {this.state.errors && <span className="help-block">{this.state.errors}</span>}
                <div className="form-group row">
                    <label className="control-label">Section</label>
                        <input value = {this.state.section} onChange={this.onChange} type="text" name="section" className="form-control"/>

                </div>

                <div className="form-group row">
                    <label className="control-label">Prenom</label>
                        <input value = {this.state.prenom} onChange={this.onChange} type="text" name="prenom" className="form-control"/>

                </div>

                <div className="form-group row">
                    <label className="control-label">Nom</label>
                        <input value = {this.state.nom} onChange={this.onChange} type="text" name="nom" className="form-control"/>

                </div>
                

                <div className="form-group row">
                    <label className="control-label">Email</label>
                        <input value = {this.state.email} onChange={this.onChange} type="text" name="email" className="form-control"/>

                </div>

                <div className="form-group row">
                    <label className="control-label">Password</label>
                    <input value = {this.state.password} onChange={this.onChange} type="password" name="password" className="form-control"/>
                </div>

                <div className="form-group row">
                    <label className="control-label">Password Confirmation</label>
                    <input value = {this.state.passwordConfirmation} onChange={this.onChange} type="password" name="passwordConfirmation" className="form-control"/>
                </div>

                <div className="form-group">
                    <button disabled={this.state.isloading} className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>

            
        );
    }
}



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignupForm));