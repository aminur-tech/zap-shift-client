import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: parcels = []} = useQuery({
        queryKey: ['parcels', user.email, 'delivery-assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&delivery_status=parcel-delivered`)
            return res.data
        }
    })

    const calculatedPayout = parcel => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost * 0.8
        }
        else {
            return parcel.cost * 0.6
        }
    }

    return (
        <div>
            <title>completed deliveries</title>
            <h2>completed deliveries {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Pickup District</th>
                            <th>Date</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>{parcel.createAt}</td>
                                <td>{parcel.cost}</td>
                                <td>{calculatedPayout(parcel)}</td>
                                <td>
                                    <button className='btn btn-primary text-black'>
                                       Cash Out
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default CompletedDeliveries;