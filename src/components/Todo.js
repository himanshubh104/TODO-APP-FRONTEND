import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/Action';
import { toast } from "react-toastify";
import { URL } from './AppConstants';

function Todo() {
    const[todo, setTodo] = useState(
        {
            todoId:-1,
            todoBody:'',
            todoDate:'',
            done:false,
        }
        );
    const [flag,setFlag]=useState(0);
    const [todos, setTodos] = useState([]);
    const history=useHistory();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.authenticated)
    //Add a new Todo
    const handleSubmit=(e)=>{
        e.preventDefault();
        // setLoading(true)
        axios.post(`${URL}/todos/`,todo,{withCredentials:true
        }).then(resp=>{
            console.log(resp.data);  
            setFlag(oldf=>oldf+1);
            }).catch(err=>{
                console.log(err)
                toast.error(err.message)
                // setLoading(false)
            })
    }

    //Fetching list Of Todos
    useEffect(() => {
        axios.get(`${URL}/todos/`,{withCredentials:true
            }).then(resp=>{      
                setTodos(resp.data);
                // setLoading(false)
                }).catch(err=>{
                    // setLoading(false)
                    // console.log(err.response)
                    toast.error(err.message)
                     if (err.response!==undefined && err.response.data.code===500) {
                        history.replace('/login') 
                    }                                
                })  
    }, [flag,history])

    const setTodoData=(e)=>{
        setTodo({...todo,[e.target.name]:e.target.value});
    }

    //Updating a Todo
    const setCheck=(e)=>{
        // setLoading(true)
        for (const obj of todos) {
            if (e.target.name===obj.todoId+'') {
                obj.done=obj.done?false:true;                
                axios.put(`${URL}/todos/`,obj,{withCredentials:true
                }).then(resp=>{
                    setFlag(flag=>flag+1);
                    return;
                    }).catch(err=>{
                        toast.error(err.message)
                        console.log(err)
                        // setLoading(false)   

                    })   
            }
        }
    }

    //Deleting Done Todos
    const deleteTodos=(e)=>{
        // setLoading(true)
        axios.delete(`${URL}/todos/`,{withCredentials:true
                }).then(resp=>{
                    setFlag(flag=>flag+1);
                    }).catch(err=>{
                        setLoading(false)
                        toast.error(err.message)
                        console.log(err)
                    }) 
    }

    //Signing Out
    const signout=(e)=>{
        setLoading(true)
        dispatch(signOut())
    } 

    useEffect(()=>{
        if (!auth) {
            setLoading(false)
            history.replace('/login')
        }
    },[auth,history])
    
    return (
            <React.Fragment>
            <form onSubmit={handleSubmit}>
                <div className="form-group row justify-content-center">
                    <div className="col-sm-10">
                        <input type="text" className="form-control" required name="todoBody" placeholder="Wahat is in your mind"
                        onChange={setTodoData}
                        value={todo.todoBody}/>
                    </div>
                </div>
                <div className="form-group row justify-content-center">
                    <div className="col-sm-10">
                        <input type="date" className="form-control" required name="todoDate" placeholder="Wahat is in your mind"
                        onChange={setTodoData}
                        value={todo.todoDate}/>
                    </div>
                </div>
                <div className="form-group row justify-content-center">
                    <div className="col-sm-10">
                        <input type="submit" style={{width:"100%"}} className="btn btn-primary"
                        value="Add TODO"/>
                    </div>
                </div>
                <div className="form-group row justify-content-center">
                    <div className="col-sm-10">
                        <input type="button" style={{width:"100%"}} 
                        onClick={deleteTodos}
                        className="btn btn-danger" value="Remove done todos"/>
                    </div>
                </div>                
            </form>
            <div className="row justify-content-center">
            <div className="col-sm-10">
                <button className="btn btn-success" style={{width:'100%'}} onClick={signout}>
                {loading&& <span className="spinner-grow spinner-grow-sm mr-1"> </span>} Signout</button>
            </div>
    </div>
            <br/><br/>
            <div className="row justify-content-center">
                <ul className="list-group col-md-11">
                    {
                        todos.map((todo,index)=>{
                        return (
                            <li className="list-group-item m-1" key={todo.todoId}>
                            <input id="check" name={`${todo.todoId}`} type="checkbox"
                            onChange={setCheck}
                            checked={todo.done}/>  <label>{todo.todoBody}</label>       
                            </li>)
                        })
                    }
                </ul>
            </div>
            </React.Fragment>
    )
}
export default Todo
