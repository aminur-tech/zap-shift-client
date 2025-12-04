import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { LuShieldOff } from "react-icons/lu";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const UserManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState("");

    const { refetch, data: users = [] } = useQuery({
        queryKey: ["users", searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;
        },
    });

    const handleMakeUser = (user) => {
        const roleInfo = { role: "admin" };
        axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.displayName} is now an Admin`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    const handleRemoveUser = (user) => {
        const roleInfo = { role: "user" };
        axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.displayName} removed from Admin`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <div className="p-6 space-y-6">
            {/* Page Title */}
            <div>
                <h2 className="text-2xl font-bold text-primary">Manage Users</h2>
                <p className="text-sm text-gray-500">
                    Total Users: {users.length}
                </p>
            </div>

            {/* Search Field */}
            <div className="flex justify-start">
                <label className="input input-bordered flex items-center gap-2 w-full max-w-sm shadow-sm rounded-xl">
                    <svg
                        className="h-5 w-5 opacity-60"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="7"></circle>
                            <path d="m20 20-3.5-3.5"></path>
                        </g>
                    </svg>
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        type="search"
                        placeholder="Search users…"
                        className="grow"
                    />
                </label>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto bg-base-100 shadow-lg rounded-xl p-4 border border-base-200">
                <table className="table">
                    <thead className="bg-base-200 rounded-lg text-base">
                        <tr>
                            <th>#</th>
                            <th>User Info</th>
                            <th>Role</th>
                            <th className="text-center">Admin Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={index}
                                className="hover:bg-base-200 transition-all"
                            >
                                <td className="font-semibold">{index + 1}</td>

                                {/* User Info */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.photoUrl} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-base">
                                                {user.displayName}
                                            </div>
                                            <div className="text-sm opacity-60">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="capitalize">{user.role}</td>

                                {/* Buttons */}
                                <td className="text-center">
                                    {user.role === "admin" ? (
                                        <button
                                            onClick={() => handleRemoveUser(user)}
                                            className="btn btn-sm bg-red-500 text-white hover:bg-red-600 rounded-lg shadow-md"
                                        >
                                            <LuShieldOff />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeUser(user)}
                                            className="btn btn-sm bg-green-600 text-white hover:bg-green-700 rounded-lg shadow-md"
                                        >
                                            <FaUserShield />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
