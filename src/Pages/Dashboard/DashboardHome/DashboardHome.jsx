import React from 'react';
import useRole from '../../../Hooks/useRole';
import Loading from '../../../Component/Loading';
import AdminHomeDashboard from './AdminHomeDashboard';
import RiderDashboardHome from './RiderDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {
    const {role, roleLoading} =useRole()
    if(roleLoading){
        return <Loading></Loading>
    }

    if(role === "admin"){
        return <AdminHomeDashboard></AdminHomeDashboard>
    }
    else if (role === "rider"){
        return <RiderDashboardHome></RiderDashboardHome>
    }
    else{
        return <UserDashboardHome></UserDashboardHome>
    }
};

export default DashboardHome;