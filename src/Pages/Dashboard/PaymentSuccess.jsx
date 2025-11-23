import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    // console.log(sessionId)
    const axiosSecure = useAxiosSecure()
    const [paymentInfo, setPaymentInfo] = useState()

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                    setPaymentInfo({
                        trackingId: res.data.trackingId,
                        transactionId: res.data.transactionId
                    })
                }
    )}
}, [sessionId, axiosSecure])



    return (
        <div>
            <title>payment successful</title>
            <p>payment successful</p>
            <p>Your transactionId : {paymentInfo?.transactionId}</p>
            <p>Your trackingId : {paymentInfo?.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;