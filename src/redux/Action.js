import * as constants from "./Constants";
import axios from "axios";
import { URL } from "../components/AppConstants";
// import Cookies from 'js-cookie'
import {authHeader} from '../components/AuthHeader';

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
export const checkAlreadySignin=()=>{
    return dispatch=>{
        if (localStorage.getItem('auth-user')!==undefined) {
            dispatch({
                type:constants.CHECK_SIGN_IN,
                payload:true
            })
        }
    }
}

export const userSignOut=()=>{  
    // Object.keys(Cookies.get()).forEach(cookieName=> {
    //     var neededAttributes = {
    //         path:'/'
    //     };
    //     Cookies.remove(cookieName, neededAttributes);
    //   });
      localStorage.clear();
    return{
        type:constants.SIGN_OUT,
        payload:{}
    }
}
export const signIn=(credentials)=>{
    // const token = Buffer.from(`${credentials.userName}:${credentials.userPassword}`, 'utf8').toString('base64')
    //axios.get(`${URL}/users/login`,{headers: {'Authorization': `Basic ${token}`}})
    return dispatch=>{
        axios.post(`${URL}/users/login`,credentials)
            .then(resp=>{
                if (resp.data.authenticated) {
                    // Cookies.set('auth-token',true);
                    // Cookies.set('Authorization',true);
                    localStorage.setItem('auth-user',JSON.stringify(resp.data));
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
        axios.post(`${URL}/users/create`)
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

export const signOut=()=>{
    return dispatch=>{
        axios.get(`${URL}/users/logout/`,{ headers: authHeader() })
        .then(resp=>{
            console.log(resp.data);
            dispatch(userSignOut());
        }).catch(err=>
            {console.log(err)
            dispatch(userError(err.message))
        })
    }
}