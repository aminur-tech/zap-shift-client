import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const AddParcel = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Load service area data
  const serviceArea = useLoaderData();

  const navigate = useNavigate()

  // Extract unique divisions
  const divisions = [...new Set(serviceArea.map(area => area.region))];


  // Watch division selections
  const senderDivision = watch("senderDivision");
  const receiverDivision = watch("receiverDivision");

  // Compute districts dynamically
  const senderDistricts = serviceArea
    .filter(area => area.region === senderDivision)
    .map(area => area.district);

  const receiverDistricts = serviceArea
    .filter(area => area.region === receiverDivision)
    .map(area => area.district);


  const handleSendParcel = (data) => {
    console.log("Submitted:", data);

    const isDocument = data.parcelType === "document";
    const isSameDistricts = data.senderDistrict === data.receiverDistrict;
    const weight = parseFloat(data.weight);

    let cost = 0;

    if (isDocument) {
      // DOCUMENT PRICE
      cost = isSameDistricts ? 60 : 80;
    } else {
      // NON-DOCUMENT PRICE
      if (weight <= 3) {
        // Up to 3 KG
        cost = isSameDistricts ? 110 : 150;
      } else {
        // More than 3 KG
        const base = isSameDistricts ? 110 : 150;
        const extraWeight = weight - 3;

        const extraCharge = isSameDistricts
          ? extraWeight * 40
          : extraWeight * 40 + 40; // +40 only once

        cost = base + extraCharge;
      }
    }
    console.log("Cost:", cost);
    data.cost = cost
    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charge ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "conform and continue payment"
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to the database
        axiosSecure.post('/parcels', data)
          .then(res => {
            console.log('add db', res.data)
            if (res.data.insertedId) {
              navigate('/dashboard/my-parcels')
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "parcel has created. please pay",
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
      }
    });
  };


  return (
    <div className="p-8 max-w-7xl mx-auto shadow-2xl mt-10 mb-10 rounded-2xl">
      <title>Add Parcel</title>
      <h1 className="text-4xl font-bold mb-10">Add Parcel</h1>

      <form onSubmit={handleSubmit(handleSendParcel)} className="space-y-10">
        {/* Parcel Type */}
        <div>
          <label className="font-semibold block mb-2">Parcel Type</label>
          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="document"
                defaultChecked
                className="radio radio-success"
                {...register("parcelType")}
              />
              <span>Document</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="non-document"
                className="radio radio-success"
                {...register("parcelType")}
              />
              <span>Non-Document</span>
            </label>
          </div>
        </div>

        {/* Parcel Name / Weight */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="label-text mb-1">Parcel Name</label>
            <input
              type="text"
              placeholder="Enter parcel name"
              className="input input-bordered w-full"
              {...register("parcelName", { required: "Parcel name required" })}
            />
            {errors.parcelName && (
              <p className="text-red-500 text-sm mt-1">{errors.parcelName.message}</p>
            )}
          </div>

          <div>
            <label className="label-text mb-1">Parcel Weight (KG)</label>
            <input
              type="number"
              placeholder="Enter weight in KG"
              className="input input-bordered w-full"
              {...register("weight", { required: "Weight required" })}
            />
            {errors.weight && (
              <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
            )}
          </div>
        </div>

        {/* Sender & Receiver */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Sender */}
          <div>
            <h2 className="text-2xl font-bold mb-5">Sender Details</h2>
            <div className="space-y-5">
              <div>
                <label className="label-text mb-1">Sender Name</label>
                <input
                  type="text"
                  placeholder="Enter sender name"
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full"
                  {...register("senderName", { required: "Sender name required" })}
                />
                {errors.senderName && (
                  <p className="text-red-500 text-sm mt-1">{errors.senderName.message}</p>
                )}
              </div>

              {/* Added Sender Email */}
              <div>
                <label className="label-text mb-1">Sender Email</label>
                <input
                  type="email"
                  placeholder="Enter sender email"
                  className="input input-bordered w-full"
                  defaultValue={user?.email}
                  {...register("senderEmail", { required: "Sender email required" })}
                />
                {errors.senderEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.senderEmail.message}</p>
                )}
              </div>

              {/* Added Sender phone */}
              <div>
                <label className="label-text mb-1">Sender Phone No:</label>
                <input
                  type="number"
                  placeholder="Enter sender phone number"
                  className="input input-bordered w-full"

                  {...register("senderPhone", { required: "Sender phone number required" })}
                />
                {errors.senderPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.senderPhone.message}</p>
                )}
              </div>

              <div>
                <label className="label-text mb-1">Sender Division</label>
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
                  <p className="text-red-500 text-sm mt-1">{errors.senderDivision.message}</p>
                )}
              </div>

              <div>
                <label className="label-text mb-1">Sender District</label>
                <select
                  className="select select-bordered w-full"
                  placeholder='sender district'
                  {...register("senderDistrict", { required: "District required" })}
                  disabled={!senderDivision}
                >
                  <option value="">select district</option>
                  {senderDistricts.map((district, idx) => (
                    <option key={idx} value={district}>{district}</option>
                  ))}
                </select>
                {errors.senderDistrict && (
                  <p className="text-red-500 text-sm mt-1">{errors.senderDistrict.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div>
            <h2 className="text-2xl font-bold mb-5">Receiver Details</h2>
            <div className="space-y-5">
              <div>
                <label className="label-text mb-1">Receiver Name</label>
                <input
                  type="text"
                  placeholder="Enter receiver name"
                  className="input input-bordered w-full"
                  {...register("receiverName", { required: "Receiver name required" })}
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-sm mt-1">{errors.receiverName.message}</p>
                )}
              </div>

              {/* Added Receiver Email */}
              <div>
                <label className="label-text mb-1">Receiver Email</label>
                <input
                  type="email"
                  placeholder="Enter receiver email"
                  className="input input-bordered w-full"
                  {...register("receiverEmail", { required: "Receiver email required" })}
                />
                {errors.receiverEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.receiverEmail.message}</p>
                )}
              </div>
              {/* receiver phone */}
              <div>
                <label className="label-text mb-1">Receiver Phone</label>
                <input
                  type="number"
                  placeholder="Enter receiver phone number"
                  className="input input-bordered w-full"
                  {...register("receiverPhone", {
                    required: "Receiver phone number required",
                  })}
                />
                {errors.receiverPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverPhone.message}
                  </p>
                )}
              </div>


              <div>
                <label className="label-text mb-1">Receiver Division</label>
                <select
                  className="select select-bordered w-full"
                  {...register("receiverDivision", { required: "Division required" })}
                >
                  <option value="">Select Division</option>
                  {divisions.map((division, idx) => (
                    <option key={idx} value={division}>{division}</option>
                  ))}
                </select>
                {errors.receiverDivision && (
                  <p className="text-red-500 text-sm mt-1">{errors.receiverDivision.message}</p>
                )}
              </div>

              <div>
                <label className="label-text mb-1">Receiver District</label>
                <select
                  className="select select-bordered w-full"
                  {...register("receiverDistrict", { required: "District required" })}
                  disabled={!receiverDistricts}
                >
                  <option value="">select district</option>
                  {receiverDistricts.map((district, idx) => (
                    <option key={idx} value={district}>{district}</option>
                  ))}
                </select>
                {errors.receiverDistrict && (
                  <p className="text-red-500 text-sm mt-1">{errors.receiverDistrict.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-success px-10">Proceed to Confirm Booking</button>
      </form>
    </div>
  );
};

export default AddParcel;
