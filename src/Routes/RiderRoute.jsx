import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loading from '../Component/Loading';

const RiderRoute = ({children}) => {
    const { loading } = useAuth()
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'rider') {
        return <p>Only access rider</p>
    }
    return children
}

export default RiderRoute;