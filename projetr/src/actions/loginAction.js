import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";



export function userLoginRequest(user){
    return(dispatch)=>{
        console.log(user)
        return axios.post("http://localhost:5000/user/login",user);
    }
}



export const loginAction = (user) => dispatch => {
    console.log("login exec")
    dispatch({
        type:'SET_CURRENT_USER',
        user:user
    })
}

export const logoutAction = () => dispatch => {
    console.log("login exec")
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch({
        type:'SET_CURRENT_USER',
        
    })
}