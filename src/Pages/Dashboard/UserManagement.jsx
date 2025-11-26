import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { LuShieldOff } from "react-icons/lu";
import { FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UserManagement = () => {
    const axiosSecure = useAxiosSecure()
    const [searchText, setSearchText]= useState('')

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`)
            return res.data
        }
    })

    const handleMakeUser = user => {
        const roleInfo = { role: 'admin' }
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} marked as admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })
    }
    const handleRemoveUser = user => {
        const roleInfo = { role: 'user' }
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} remove from admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })
    }


    return (
        <div>
            <title>Manage users</title>
            <h2>Manage users {users.length}</h2>
            {/* search {searchText} */}

            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input onChange={(e)=>setSearchText(e.target.value)} type="search" className="grow" placeholder="Search" />
               
            </label>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>users</th>
                            <th>role</th>
                            <th>Admin actions</th>
                            <th>Others actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoUrl} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                            <div className="text-sm opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.role}</td>
                                <td>
                                    {user.role === 'admin' ?
                                        <button onClick={() => handleRemoveUser(user)} className='btn bg-red-500'>
                                            <LuShieldOff />
                                        </button> :
                                        <button onClick={() => handleMakeUser(user)} className='btn bg-green-500'>
                                            <FaUserShield />
                                        </button>}
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">Action</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default UserManagement;