import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider';

function DefaultLayout() {
    const {user, token} = useStateContext();

    if(!token){
        return <Navigate to='/login'/>
    }
    const onLogout =(event)=>{
        event.preventDefault();
    }
  return (
    <div id='defaultLayout'>
        <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
        </aside>
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