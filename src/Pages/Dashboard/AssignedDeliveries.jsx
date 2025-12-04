import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'delivery-assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&delivery_status=delivery-assigned`)
            return res.data
        }
    })

    const handleAcceptDelivery = (parcel, status) => {
        const statusInfo = {
            delivery_status: status,
            riderId : parcel.riderId,
            trackingId:parcel.trackingId
        }

        let message = `parcel status is updated with ${status}`
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })

    }
    return (
        <div>
            <title>Assigned Deliveries</title>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Actions</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.senderDistrict}</td>
                                    <td>
                                        {
                                            parcel.delivery_status === 'delivery-assigned' ? (
                                                <>
                                                    <button
                                                        onClick={() => handleAcceptDelivery(parcel, 'rider_arriving')}
                                                        className='btn btn-primary text-black mr-4'
                                                    >
                                                        Accept
                                                    </button>

                                                    <button className='btn btn-warning text-black'>
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <span>Accepted</span>
                                            )
                                        }
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => handleAcceptDelivery(parcel, 'parcel pickup')}
                                            className='btn btn-primary text-black mr-4'
                                        >
                                            Mark as Pickup
                                        </button>
                                        <button
                                            onClick={() => handleAcceptDelivery(parcel)}
                                            className='btn btn-primary text-black mr-4'
                                        >
                                            Mark as Delivery
                                        </button>

                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AssignedDeliveries;