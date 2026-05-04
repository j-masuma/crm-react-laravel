import { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';

function DefaultLayout() {
    const {user, token, notification, setUser, setToken} = useStateContext();

    

    const onLogout = (event) => {
        event.preventDefault();
        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            });
    };

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 401) {
                    setToken(null);
                }
            });
    }, []);

    if(!token){
        return <Navigate to='/login'/>
    };

  return (
    <div id='defaultLayout'>
        <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
        </aside>
        {notification &&
            <div>
                {notification}
            </div>

        }
        <div className='content'>
            <header>
                <div>
                    Header
                </div>
                <div>
                    {user.name}
                    <Link to="/logout" onClick={onLogout} className='btn-logout'>Logout</Link>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default DefaultLayout