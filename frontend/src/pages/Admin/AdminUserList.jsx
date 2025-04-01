import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../services/userService";



const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);


    // const loadBatches = async () => {
    //     const data = await fetchUsers();
    //     console.log("batch data is:" + JSON.stringify(data));
    //     setUsers(data);
    // };


    const loadUsers = async () => {
        try {
            const data = await fetchUsers();
            console.log("batch data is:" + JSON.stringify(data));
            setUsers(data);
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false); // ✅ this will hide the loading message
        }
    };


    return (
        <div className="container py-4">
            <h3 className="mb-4">👥 All Users</h3>

            {loading ? (
                <div className="alert alert-info">Loading users...</div>
            ) : users.length === 0 ? (
                <div className="alert alert-warning">No users found.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Institution</th>
                                <th>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={user._id}>
                                    <td>{i + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="text-capitalize">{user.role}</td>
                                    <td>{user.institutionId?.name || "—"}</td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminUserList;
