import React from "react";
import './App.css';
import Login from './components/Login';
import Todo from './components/Todo';
import {Switch,Route, Redirect} from 'react-router-dom';
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";

const App=({auth})=>{
    return(
        <React.Fragment>
            <ToastContainer autoClose={false} position='bottom-right'/> 
            <div className='App container-fluid row justify-content-center' >           
                <div className="hero col-sm-3">
                    <div className="card-body">
                        <br/>
                        <div className="card-title h1 text-center">TODO APP</div>
                        <br/>
                        <Switch>
                            <Route path="/login"><Login/></Route>
                            <Route path="/signup"><Signup/></Route>                            
                            {auth?(<Route path="/todo"><Todo/></Route>):(<Redirect to='/login'/>)}
                            <Route path="/"><Todo/></Route>
                        </Switch>
                    </div>     
                </div>          
            </div> 
        </React.Fragment>       
    );
}
const mapStateToProps=state=>({
    auth:state.authenticated
});
export default connect(mapStateToProps,null)(App);