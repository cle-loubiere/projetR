import React,{Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    auth:state.authReducer.isAuthenticated
  })
  
  const mapDispatchToProps = dispatch => ({

  });

    
    

class NavigationBar extends Component{
    
    render(){
        const guestLink = (<ul className="nav navbar-nav navbar-right">
                        <li><Link to="/signup">Signup </Link></li>
                        </ul>)
    const LogLink = (<ul className="nav navbar-nav navbar-right">
                        <li><Link  to="/">Logout </Link></li>
                    </ul>)
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Projet Rattrapage</Link>
                        
                    </div>
                    <div className=" navbar-collaspe">
                        {this.props.auth?LogLink:guestLink}   
                    </div>
                </div>

            </nav>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavigationBar);