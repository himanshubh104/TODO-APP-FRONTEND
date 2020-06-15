import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";

function Login(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({})
    const history=useHistory();

    const handleClicke=(e) => {      
        history.push('/signup');
        /* console.log('Called Logout');
        axios.get("http://localhost:8080/todo-app/users/logout",{withCredentials:true
        })
        .then(resp=>{
            console.log(resp.data);
        }).catch(err=>console.log(err)) */
     }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        setUser({...user,userName:name,userPassword:password}); 
    }

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            axios.post("http://localhost:8080/todo-app/users/",user,{withCredentials:true
            })
            .then(resp=>{
                console.log(resp.data);
                setLoading(false);
                history.replace("/todo");
            }).catch(err=>{
                console.log(err);
                setLoading(false);
            })
        }
    }, [user,history])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group row justify-content-center">
                    <div className="col-sm-10">
                        <input type="text" className="form-control" required name="userName" placeholder="User Name"
                        onChange={e=>setName(e.target.value)}
                        value={name}/>
                    </div>
                </div>
                <div className="form-group row justify-content-center">
                    <div className="col-sm-10">
                        <input type="password" className="form-control" required name="userPassword" placeholder="Password"
                        onChange={e=>setPassword(e.target.value)}
                        value={password}/>
                    </div>
                </div>
                <div className="form-group row justify-content-center">
                    <div className="col-sm-10">
                        <button type="submit" style={{width:"100%"}} className="btn btn-success" disabled={loading}>
                        {loading&& <span className="spinner-grow spinner-grow-sm mr-1"> </span>}Sign In
                        </button>
                    </div>
                </div>
                <div className="form-group row justify-content-center">
                    <div className="col-sm-10">
                        <input type="button" style={{width:"100%"}} className="btn btn-primary"
                        value="Sign Up" onClick={handleClicke}/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
