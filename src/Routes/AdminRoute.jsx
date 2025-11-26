import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loading from '../Component/Loading';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth()
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <p>Only access admin</p>
    }
    return children
}

export default AdminRoute;