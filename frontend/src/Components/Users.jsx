import { useEffect, useState } from "react";
import User from "./User";
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]); 
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`https://paytm-u5jl.onrender.com/api/v1/user/bulk`, {
                    params: { filter }, 
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                console.log(response.data)
                setUsers(response.data.users || []); 
            } catch (error) {
                console.error("Error fetching users:", error);
                setUsers([]); 
            }
        };

        fetchUsers();
    }, [filter]); 

    const handleChange = (e) => {
        setFilter(e.target.value); 
    };

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {users && users.length > 0 ? (
                    users.map(user => (
                        <User key={user.id} user={user} />
                    ))
                ) : (
                    <p>No users found.</p> 
                )}
            </div>
            <style jsx>{`
                @media (max-width: 768px) {
                    .font-bold {
                        font-size: 1.5rem;
                    }
                    input {
                        padding: 0.5rem;
                    }
                }
            `}</style>
        </>
    );
};

export default Users;
