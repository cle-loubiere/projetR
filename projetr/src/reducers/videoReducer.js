export default (state = {},action)=> {
    switch (action.type){
        case 'VIDEO_TIME_ACTION' : return {
            time:action.payload
        }
        default : return state
    }
}