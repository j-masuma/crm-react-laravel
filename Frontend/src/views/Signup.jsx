
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload ={
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if(response.status === 422){
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    }
  return (
    <div className='login-signup-form animated fadeInDown'>
        <div className='form'>
            <h1 className='title'>Signup for free</h1>
            {errors && <div className='alert'>
                {Object.values(errors).map((error, index) => (
                    <p key={index}>{error}</p>
                ))}
            </div>}
            <form onSubmit={onSubmit}>
                <input ref={nameRef} type="text" placeholder='Full Name'/>
                <input ref={emailRef} type="email" placeholder='Email Address'/>
                <input ref={passwordRef} type="password" placeholder='Password'/>
                <input ref={passwordConfirmationRef} type="password" placeholder='Confirm Password'/>
                <button type='submit' className='btn btn-block'>Signup</button>
                <p className='message'>Already registered? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Signup