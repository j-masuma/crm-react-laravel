import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

function UserForm() {
    const {id} = useParams();
    const [loading,setLoading]=useState(false);
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext();
    const navigate = useNavigate();
    const [user, setUser]=useState({
        id:null,
        name:'',
        email:'',
        password:'',
        password_confirmation:'',

    });
    if(id){
        
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(()=>{
            setLoading(true);
            axiosClient.get(`/users/${id}`)
            .then(({data}) => {
                setUser(data.data);
                console.log(data.data);
            })
            .catch((err) => {
                
                console.log(err);
            })
            .finally(()=>{
                setLoading(false);
            });
        },[])
         

    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        if(user.id){
            axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
                // show notification
                setNotification('User updated successfully');
                navigate('/users')
            })
            .catch(err => {
                const response = err.response;
                if(response.status === 422){
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
        }else{
        axiosClient.post('/users', user)
            .then(() => {
                 // show notification
                 setNotification('User created successfully');
                navigate('/users')
            })
            .catch(err => {
                const response = err.response;
                if(response.status === 422){
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
        }
    }
    return (
        <>
            {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
            {errors && <div className='alert'>
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
            </div>}
            {
                loading ? <div>Loading...</div>: <form onSubmit={onSubmit} className='card'>
                    <input type="text" value={user.name} onChange={ev=>setUser({...user,name:ev.target.value})} placeholder='Name'/>
                    <input type="email" value={user.email} onChange={ev=>setUser({...user,email:ev.target.value})} placeholder='Email'/>
                    <input type="password" onChange={ev=>setUser({...user,password:ev.target.value})} placeholder='Password'/>
                    <input type="password" onChange={ev=>setUser({...user,password_confirmation:ev.target.value})} placeholder='Confirm Password'/>
                    <button type='submit' className='btn btn-block'>Save</button>
                </form>
            }
        </>
    )
}

export default UserForm