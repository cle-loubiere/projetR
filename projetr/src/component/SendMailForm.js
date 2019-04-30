import React, {Component} from 'react';
import {connect} from "react-redux"
import { userSignupUnivRequest } from '../actions/signupAction';
import {Redirect} from 'react-router-dom'

const mapStateToProps = state => ({
    ...state
  })
  
  const mapDispatchToProps = dispatch => ({
    userSignupRequest:  (state)=>dispatch(userSignupUnivRequest(state)),

  })

class SendMailForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            emailUniv:'',
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
                    <label className="control-label">Email Universitaire</label>
                        <input value = {this.state.emailUniv} onChange={this.onChange} type="text" name="emailUniv" className="form-control"/>

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



export default (connect(mapStateToProps,mapDispatchToProps)(SendMailForm));