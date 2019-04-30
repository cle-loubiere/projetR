import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state
  })
  
  const mapDispatchToProps = dispatch => ({

  })

class VideoLesson extends Component{
    constructor(props){
        super(props);
        this.state = {
            left:true,
            right:true
        }
        this.activateLeft = this.activateLeft.bind(this);
        this.activateRight = this.activateRight.bind(this);
        this.disableLeft = this.disableLeft.bind(this);
        this.disableRight = this.disableRight.bind(this);
        this.videoTimeAction = this.videoTimeAction.bind(this);
        
    }
    activateLeft(){
        console.log(this.state.left)
        this.setState({left:true})
    }
    activateRight(){
        this.setState({right:true})
    }
    disableLeft(){
        console.log(this.state.left)
        this.setState({left:false})
    }
    disableRight(){
        this.setState({right:false})
    }
    videoTimeAction(event){
        this.setState({videoTime:this.refs.Player.currentTime})
    }

    renderSubtitle = (subtitle)=>{
        if(this.state.videoTime > subtitle.start && this.state.videoTime < subtitle.end){
          return(<p Style="background-color:red">{subtitle.subtitle}</p>)
        }
        return(<p>{subtitle.subtitle}</p>)
      }

    render(){
        const left=(<div className="col-md-4">
                        <button onClick={this.disableLeft} className="btn btn-primary"> Reduire</button>
                    </div>)
        const right=(<div className="col-md-4">
                        <button onClick={this.disableRight} className="btn btn-primary"> Reduire</button>
                        {this.props.subtitleReducer.map(this.renderSubtitle)}
                     </div>)
                     
        const expandLeft=(<button onClick={this.activateLeft} className="btn btn-primary"> Menu Video</button>)
        const expandRight=(<button onClick={this.activateRight} className="btn btn-primary"> Menu Sous-titre</button>)
            return(
                <div className="row h-200">
                    {this.state.left?left:null}
                    <div className="flex-fill">
                        {this.state.left?null:expandLeft}
                        <video ref="Player" controls width="300" onTimeUpdate={this.videoTimeAction}>
                            <source src="../video.mp4" type="video/mp4"/>
                            No video pal ;(
                        </video>
                        {this.state.right?null:expandRight} 
                    </div>
                    {this.state.right?right:null}
                    
                </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (VideoLesson);