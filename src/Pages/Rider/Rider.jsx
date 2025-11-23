import React from 'react';
import { useForm } from 'react-hook-form';
import riderImg from '../../assets/ex/rider.png';
import { useLoaderData } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const Rider = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const serviceArea = useLoaderData();
    const axiosSecure = useAxiosSecure()
    const {user} =useAuth()


    const divisions = [...new Set(serviceArea.map(area => area.region))];
    const senderDivision = watch("senderDivision");
    const senderDistricts = serviceArea
        .filter(area => area.region === senderDivision)
        .map(area => area.district);

    const handleRiderFrom = (data) => {
        console.log('Form data:', data);
        axiosSecure.post('/riders', data)
            .then(res => {
                console.log('added rider application', res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your application has been submitted. please wait for our response",
                        showConfirmButton: false,
                        timer: 2500
                    })
                }
            })

    };

    return (
        <div className="p-8 bg-white rounded-xl shadow-lg mt-10">
            <title>Be A Rider</title>

            {/* Header */}
            <h1 className="text-3xl font-bold mb-4">Become a Rider</h1>
            <p className="mb-6 text-gray-700">
                Join our reliable delivery team and help us move packages quickly and safely.
                Provide your valid information and start your journey as a trusted rider.
            </p>

            <div className="flex flex-col-reverse md:flex-row gap-8">
                {/* Form Section */}
                <form onSubmit={handleSubmit(handleRiderFrom)} className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Section Title */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            {...register('name')}
                            className="w-full border border-gray-300 p-2 rounded"
                            defaultValue={user.displayName} readOnly
                        />
                        
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block font-medium mb-1">Age</label>
                        <input
                            type="number"
                            {...register('age', {
                                required: 'Age is required',
                                min: { value: 18, message: 'Must be 18+' },
                                max: { value: 60, message: 'Must be under 60' }
                            })}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Your age"
                        />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full border border-gray-300 p-2 rounded"
                            defaultValue={user.email} readOnly
                        />
                    </div>

                    {/* NID */} <div> <label className="block font-medium mb-1">NID Number</label> <input type="text" {...register('nid', { required: 'NID is required', pattern: { value: /^[0-9]{10,20}$/, message: 'Invalid NID number' } })} className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-lime-300" placeholder="Enter your NID" /> {errors.nid && <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>} </div>

                    {/* Contact */}
                    <div>
                        <label className="block font-medium mb-1">Contact Number</label>
                        <input
                            type="text"
                            {...register('contact', {
                                required: 'Contact number is required',
                                pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid contact number' }
                            })}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter your contact number"
                        />
                        {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
                    </div>


                    {/* Section Title */}
                    <div className="md:col-span-2 mt-4">
                        <h2 className="text-2xl font-semibold mb-2">Location Information</h2>
                    </div>

                    {/* Division */}
                    <div>
                        <label className="font-medium mb-1 block">Sender Division</label>
                        <select
                            className="select select-bordered w-full"
                            {...register("senderDivision", { required: "Division required" })}
                        >
                            <option value="">Select Division</option>
                            {divisions.map((division, idx) => (
                                <option key={idx} value={division}>{division}</option>
                            ))}
                        </select>
                        {errors.senderDivision && (
                            <p className="text-red-500 text-sm">{errors.senderDivision.message}</p>
                        )}
                    </div>

                    {/* District */}
                    <div>
                        <label className="font-medium mb-1 block">Sender District</label>
                        <select
                            className="select select-bordered w-full"
                            {...register("senderDistrict", { required: "District required" })}
                            disabled={!senderDivision}
                        >
                            <option value="">Select District</option>
                            {senderDistricts.map((district, idx) => (
                                <option key={idx} value={district}>{district}</option>
                            ))}
                        </select>
                        {errors.senderDistrict && (
                            <p className="text-red-500 text-sm">{errors.senderDistrict.message}</p>
                        )}
                    </div>

                    {/* Section Title */}
                    <div className="md:col-span-2 mt-4">
                        <h2 className="text-2xl font-semibold mb-2">License Information</h2>
                    </div>

                    {/* License Number */}
                    <div>
                        <label className="block font-medium mb-1">Driving License Number</label>
                        <input
                            type="text"
                            {...register('licenseNumber', {
                                required: 'License number is required',
                                pattern: { value: /^[A-Za-z0-9]{6,20}$/, message: 'Invalid license number' }
                            })}
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Enter license number"
                        />
                        {errors.licenseNumber && <p className="text-red-500 text-sm">{errors.licenseNumber.message}</p>}
                    </div>

                    {/* License Type */}
                    <div>
                        <label className="block font-medium mb-1">License Type</label>
                        <select
                            {...register("licenseType", { required: "License type is required" })}
                            className="w-full border border-gray-300 p-2 rounded"
                        >
                            <option value="">Select License Type</option>
                            <option value="Motorcycle">Motorcycle</option>
                            <option value="Light Vehicle">Light Vehicle</option>
                        </select>
                        {errors.licenseType && <p className="text-red-500 text-sm">{errors.licenseType.message}</p>}
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-lime-400 hover:bg-lime-500 text-white p-3 rounded-lg font-semibold"
                        >
                            Submit Application
                        </button>
                    </div>

                </form>

                {/* Image Section */}
                <div className="flex-1 flex-col-reverse md:flex-row justify-items-center">
                    <img src={riderImg} alt="Rider" className="max-w-full h-auto rounded" />
                </div>

            </div>
        </div>
    );
};

export default Rider;
