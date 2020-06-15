import * as constants from "./Constants";
import axios from "axios";
import { URL } from "../components/AppConstants";

const userSignIn=(user)=>{
    return{
        type:constants.SIGN_IN,
        payload:user
    }
}

const userSignUp=(user)=>{
    return{
        type:constants.SIGN_UP,
        payload:user
    }
}


const userError=(error)=>{
    return{
        type:constants.ERROR,
        payload:error
    }
}

export const signOut=()=>{
    return{
        type:constants.SIGN_OUT,
        payload:{}
    }
}
export const signIn=(credentials)=>{
    return dispatch=>{
        axios.post(`${URL}/users/`,credentials,{withCredentials:true
            })
            .then(resp=>{
                if (resp.data.authenticated) {
                    dispatch(userSignIn(resp.data));
                }
                else
                    dispatch(userError(resp.data.message))      
            }).catch(err=>{
                if (err.response!==undefined) {
                    console.log(err.response);
                    dispatch(userError(err.response.data.message));
                }
                else
                    dispatch(userError(err.message));
            })
    }
}

export const signUp=(credentials)=>{
    return dispatch=>{
        axios.post(`${URL}/users/create`,credentials,{withCredentials:true
            })
            .then(resp=>{
                if (resp.data.authenticated) {
                    dispatch(userSignUp(resp.data));
                }
                else
                    dispatch(userError(resp.data.message))
            }).catch(err=>{
                if (err.response!==undefined) {
                    console.log(err.response);
                    dispatch(userError(err.response.data.message));
                }
                else
                    dispatch(userError(err.message));
            })
    }
}