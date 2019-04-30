export function rightMenu(){
    return(dispatch)=>{
        dispatch({
            type:'RIGHT_ACTION',
            payload:'result right menu action'
        })
    }
}

export function leftMenu(){
    return(dispatch)=>{
        dispatch({
            type:'LEFT_ACTION',
            payload:'result left menu action'
        })
    }
}