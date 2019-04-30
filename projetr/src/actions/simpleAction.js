import axios from "axios";


export function loadFromApi(){
    return(dispatch)=>{
        /*return axios.get("http://www.colr.org/json/color/random").then((response)=>{
            dispatch({type:'SIMPLE_ACTION',payload:response.data.new_color})
        }).catch((err)=>console.log('ckc'))*/
        return axios.get("http://localhost:5000/user").then((response)=>{
            console.log(response)
            dispatch({type:'SIMPLE_ACTION',payload:response.data.users})
        }).catch((err)=>console.log('ckc' + err))
    }
}

export const simpleAction = () => dispatch => {
    dispatch({
        type:'SIMPLE_ACTION',
        payload:'result_of_the_simple_action'
    })
}
