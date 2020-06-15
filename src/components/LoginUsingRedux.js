import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { signIn } from '../redux/Action';
import { toast } from 'react-toastify';

function Login(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({userName:'',userPassword:''});
    const response = useSelector(state=>state)
    const dispatcher=useDispatch();
    const history=useHistory();

    const handleClicke=(e) => {      
        history.push('/signup');
     }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        setCredentials({...credentials,userName:name,userPassword:password}); 
    }

    useEffect(() => {
        if (credentials.userName !== '') {
            dispatcher(signIn(credentials))
        }
    }, [credentials,dispatcher])

    useEffect(()=>{
        if (response.authenticated===true) {
            console.log(response.user);
            setLoading(false);
            history.replace("/todo");
        }
        else if (response.error!=='') {
            // console.log(response.error);
            toast.error(response.error)
            setLoading(false);
        }
    },[response,history])

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
