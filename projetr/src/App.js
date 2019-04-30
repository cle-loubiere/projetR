import React, { Component } from 'react';
import {connect} from 'react-redux';
import {simpleAction} from './actions/simpleAction'
import {loadFromApi} from './actions/simpleAction'
import logo from './logo.svg';
import './App.css';
import {rightMenu,leftMenu} from './actions/menuAction';
//import 'bootstrap/dist/css/bootstrap.css';
import Lesson from './component/Lesson';
import {videoTimeAction} from './actions/videoAction'
import NavigationBar from './component/NavigationBar'
import {BrowserRouter, Route} from "react-router-dom";
import SignupPage from './component/SignupPage';
import LoginPage from './component/LoginPage'
import VideoLesson from './component/VideoLesson'

import * as jwt from 'jwt-decode'
import {loginAction} from './actions/loginAction'

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(loadFromApi()),
  leftMenu : () =>dispatch(leftMenu()),
  rightMenu : () =>dispatch(rightMenu()),
  videoTimeAction:(time)=>dispatch(videoTimeAction(time)),
  loginAction:(user)=>dispatch(loginAction(user))
})

class App extends Component {
  componentDidMount(){
    this.props.loginAction(jwt(localStorage.jwtToken))
  }
  renderLesson = (lesson)=>{
    return(<Lesson title={lesson.title}></Lesson>)
  }

  renderSubtitle = (subtitle)=>{
    if(this.props.videoReducer.time > subtitle.start && this.props.videoReducer.time < subtitle.end){
      return(<p Style="background-color:red">{subtitle.subtitle}</p>)
    }
    return(<p>{subtitle.subtitle}</p>)
  }

  leftMenu = (event)=>{
    this.props.leftMenu();
  }

  rightMenu = (event)=>{
    this.props.rightMenu();
  }

  simpleAction = (event)=>{
    this.props.simpleAction();
  }

  videoTimeAction = (event)=>{
    this.props.videoTimeAction(this.refs.Player.currentTime);
  }

  

  render() {
    let col;
    if(this.props.menuReducer.leftMenu === true){
      col = <div className="col-md-4"><button onClick={this.leftMenu} className="btn btn-primary"> Gauche</button> </div>;
    }

    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" component={NavigationBar}/>
          <Route path= "/signup/:id" component={SignupPage}/>
          <Route exact path= "/" component={LoginPage}/>
          <Route path= "/lesson/:id" component={VideoLesson}/>

        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (App);
