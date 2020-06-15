import * as constants from "./Constants";
const initialState={
    authenticated:false,
    user:{},
    error:''
}

export const userReducer=(state=initialState,action)=>{
    switch (action.type) {
        case constants.SIGN_IN: 
            return{...state,authenticated:true, user:action.payload}
        case constants.SIGN_UP:
            return{...state,authenticated:true, user:action.payload}
        case constants.SIGN_OUT:            
            return {...state,authenticated:false, user:action.payload};
        case constants.ERROR:
            return{...state, error:action.payload}
        default:
            return state;
    }
}