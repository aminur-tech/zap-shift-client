import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    });

    const updateStatus = (rider, status) => {
        const userinfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, userinfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    refetch(); // refresh table
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <title>Approve Riders</title>
            <h2 className="text-2xl mb-4">Approve Riders ({riders.length})</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Division</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.senderDivision}</td>
                                <td>{rider.senderDistrict}</td>
                                <td>{rider.status}</td>
                                <td className="flex gap-2">
                                    {rider.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => updateStatus(rider, "Approved")}
                                                className="btn btn-success btn-sm"
                                            >
                                                <FaUserCheck />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(rider, "Rejected")}
                                                className="btn btn-warning btn-sm"
                                            >
                                                <IoPersonRemoveSharp />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => {
                                            axiosSecure.delete(`/riders/${rider._id}`)
                                                .then(() => refetch())
                                                .catch(err => console.log(err))
                                        }}
                                        className="btn btn-error btn-sm"
                                    >
                                        <FaTrashAlt />
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;
