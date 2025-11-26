import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import Swal from 'sweetalert2';


const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    
    });

    const handleDeleteBtn = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    const handlePay = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        };

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
    };

    return (
        <div>
            <title>My Parcel</title>
            <h1>All Parcel data {parcels.length}</h1>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Tracking Id</th>
                            <th>Transaction Id</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, index) => (
                            
                            <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>

                                <td>
                                    {parcel.payment_status === 'paid'
                                        ? <span className='bg-green-400 p-1 rounded'>Paid</span>
                                        : <button onClick={() => handlePay(parcel)} className='btn btn-primary text-black'>Pay</button>
                                    }
                                </td>
                               <td>{parcel.trackingId}</td>
                               <td>{parcel.transactionId ? parcel.transactionId : '-'}</td>
                                <td className='text-yellow-500'>{parcel.delivery_status}</td>

                                <td>
                                    <button className="btn btn-square"><FaRegEdit /></button>
                                    <button className="btn btn-square mx-2"><CiSearch /></button>
                                    <button onClick={() => handleDeleteBtn(parcel._id)} className="btn btn-square"><FaRegTrashAlt /></button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyParcels;
