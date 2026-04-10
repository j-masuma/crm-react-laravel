import { useEffect, useState } from "react";
import axiosClient from "../axios-client";


function Users() {
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);

  const getUsers=()=>{
    setLoading(true);
    axiosClient.get('/users')
      .then(({data}) => {
        setUsers(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(()=>{
    getUsers();
  }, []);
  return (
    <div>
		<h1>Users</h1>

		{/* <table>
			<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Email</th>
				<th>Created At</th>
				<th>Updated At</th>
			</tr>
			</thead>
			<tbody>
			{users.map((user) => (
				<tr key={user.id}>
				<td>{user.id}</td>
				<td>{user.name}</td>
				<td>{user.email}</td>
				<td>{user.created_at}</td>
				<td>{user.updated_at}</td>
				</tr>
			))}
			</tbody>
		</table> */}
    </div>
  )
}

export default Users;