import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <title>payment cancel</title>
            <p>payment cancel. please try again</p>
            <Link to='/dashboard/my-parcels' className='btn btn-primary text-black'>Try Again</Link>
        </div>
    );
};

export default PaymentCancel;