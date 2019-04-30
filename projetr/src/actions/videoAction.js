export function videoTimeAction(time){
    return(dispatch)=>{
        dispatch({
            type:'VIDEO_TIME_ACTION',
            payload:time
        })
    }
}