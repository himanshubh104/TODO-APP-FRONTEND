import React,{useState, useEffect} from 'react'
import { useSelector,useDispatch } from "react-redux";
import { signUp } from '../redux/Action';
import { toast } from "react-toastify";



function Signup() {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPass] = useState('');
    const [credentials, setCredentials] = useState({userName:'',userPassword:''});
    const response = useSelector(state=>state)
    const dispatcher=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (confPass!==password) {
            toast.info('Password Missmatch!')
            return
        }
        setLoading(true);
        setCredentials({...credentials,userName:name,userPassword:password});
    }

    useEffect(()=>{
        if (credentials.userName !== '') {
            dispatcher(signUp(credentials));
        }
    },[credentials,dispatcher])

    useEffect(()=>{
        if (Object.keys(response.user).length!==0){
            setLoading(false);
        }
        else if (response.error!=='') {
            console.log(response.error);
            toast.error(response.error)
            setLoading(false);
        }
    },[response])
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
                        <input type="password" className="form-control" required name="confirmPassword" placeholder="Confirm Password"
                        onChange={e=>setConfPass(e.target.value)}
                        value={confPass}/>
                    </div>
                </div>
                <div className="form-group row justify-content-center">
                    <div className="col-sm-10">
                        <button type="submit" style={{width:"100%"}} className="btn btn-success" disabled={loading}>
                        {loading&& <span className="spinner-grow spinner-grow-sm mr-1"> </span>}Sign Up
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup
