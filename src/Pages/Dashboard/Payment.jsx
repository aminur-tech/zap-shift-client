import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Component/Loading';

const Payment = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`)
            return res.data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    const handlePay = async() => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail:parcel.senderEmail,
            parcelName: parcel.parcelName,
            trackingId: parcel.trackingId 
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data)
        window.location.href = res.data.url
    }

    return (
        <div>
            <title>Payment</title>
            <p>payment ${parcel.cost} of {parcel.parcelName}</p>
            <button onClick={handlePay} className='btn btn-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;