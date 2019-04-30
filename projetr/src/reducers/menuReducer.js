export default (state = {leftMenu:true,rightMenu:true},action)=> {
    switch (action.type){
        case 'LEFT_ACTION' : return {...state,leftMenu:!state.leftMenu}
        case 'RIGHT_ACTION':return {...state,rightMenu:!state.rightMenu}
        default : return state
    }
}