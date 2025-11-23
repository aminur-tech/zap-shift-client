import React from 'react';
import { Outlet } from 'react-router';
import AuthImg from '../assets/ex/authImage.png'
import Logo from '../Component/Logo';

const AuthLayout = () => {
    return (
        <div className='w-full md:w-8/12 mx-auto p-1'>
            <Logo></Logo>
           <div className='flex flex-col-reverse md:flex-row justify-center items-center h-screen'>
            <div className='flex-1'>
                 <Outlet></Outlet>
            </div>
            <div className='flex-1'>
                <img src={AuthImg} alt="" />
            </div>
           </div>
            
        </div>
    );
};

export default AuthLayout;