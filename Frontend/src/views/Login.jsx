import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                    if(response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message]
                        });
                    }
                }
            });
    }
  return (
    <div className='login-signup-form animated fadeInDown'>
        <div className='form'>
            <h1 className='title'>Login to your account</h1>
            <form onSubmit={onSubmit}>
                {errors && <div className='alert'>
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>}
                <input ref={emailRef} type="email" placeholder='Email'/>
                <input ref={passwordRef} type="password" placeholder='Password'/>
                <button type='submit' className='btn btn-block'>Login</button>
                <p className='message'>Not registered? <Link to='/signup'>Create an account</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login