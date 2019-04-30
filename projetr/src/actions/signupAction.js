import axios from "axios";


export function userSignupRequest(user){
    return(dispatch)=>{
        console.log(user)
        return axios.put("http://localhost:5000/user/signup/"+user.id,user);
        /*return axios.get("http://localhost:5000/user").then((response)=>{
            console.log(response)
            dispatch({type:'SIMPLE_ACTION',payload:response.data.users})
        }).catch((err)=>console.log('signup action failed' + err))*/
    }
}

export function userSignupUnivRequest(user){
    return(dispatch)=>{
        return axios.post("http://localhost:5000/user/signup",user);
    }
}
