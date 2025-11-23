import React from 'react';
import logo from '../assets/ex/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
       
        <Link to='/' className='flex items-end font-bold p-1'>
            <img src={logo} alt="" className='w-7'/>
            <span className='-ms-4'>ZapShift</span>
        </Link>
    );
};

export default Logo;