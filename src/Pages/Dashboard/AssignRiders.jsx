import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignRiders = () => {
    const riderModalRef = useRef()
    const [selectedParcel, setSelectedParcel] = useState(null)
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [], refetch: parcelRefetch } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?delivery_status=pending-pickup')
            return res.data
        }
    })

    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel?.senderDistrict,
        queryFn: async () => {
            const { senderDistrict } = selectedParcel;

            const res = await axiosSecure.get(
                `/riders?status=approved&workStatus=available&district=${senderDistrict}`
            );
            return res.data;
        }
    });


    const handleOpenRiderModal = (parcel) => {
        setSelectedParcel(parcel)
        // console.log(parcel)
        riderModalRef.current.showModal()
    }

    const handleAssignRider = rider => {
        const riderAssignInfo = {
            riderId: rider._id,
            riderName: rider.name,
            riderEmail: rider.email,
            parcelId: selectedParcel._id

        }
        axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close()
                    parcelRefetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    return (
        <div>
            <title>Assign Riders</title>
            <h2 className="text-2xl">Assign Riders{parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Pickup District</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>{parcel.createAt}</td>
                                <td>
                                    <button onClick={() => handleOpenRiderModal(parcel)} className='btn btn-primary text-black'>
                                        Find Riders
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{riders.length}</h3>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Rider District</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    riders.map((rider, i) => {
                                        return (
                                            <tr key={rider._id}>
                                                <th>{i + 1}</th>
                                                <td>{rider.name}</td>
                                                <td>{rider.senderDistrict}</td>
                                                <td>
                                                    <button onClick={() => handleAssignRider(rider)} className='btn bg-primary'>Assign Riders</button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }



                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;