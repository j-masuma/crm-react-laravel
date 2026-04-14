import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";


function Users() {
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(false);

    const getUsers=()=>{
        setLoading(true);
        axiosClient.get('/users')
        .then(({data}) => {
            setUsers(data.data);
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const onDelete =(u)=>{
        if(!window.confirm("Are you sure you want to delete this user?")){
            return;
        }
        axiosClient.delete(`/users/${u.id}`)
            .then(()=>{
                getUsers();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    useEffect(()=>{
        getUsers();
    }, []);
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">Users</h1>
                <Link to="/users/new" className="btn-add">Add new user</Link>
            </div>
            <div className="card anitmated fade-in">

                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                        {/* <th>Created At</th>
                        <th>Updated At</th> */}
                    </tr>
                    </thead>
                    {
                        loading ?
                        <tbody>
                            <tr>
                                <td colSpan={4} className="text-center">Loading...</td>
                            </tr>
                        </tbody> :
                    
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        {/* <td>{user.created_at}</td>
                        <td>{user.updated_at}</td> */}
                        <td>
                            <Link to={'/users/'+user.id} className="btn-edit">Edit</Link>
                            &nbsp;
                            <button
                            onClick={()=>onDelete(user)}
                            className="btn-delete">
                                Delete
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
}
                </table>
            </div>
        </div>
  )
}

export default Users;