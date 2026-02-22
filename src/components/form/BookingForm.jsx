"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { districts } from "@/data/districts";
import { upazilas } from "@/data/upazilas";
import { divisions } from "@/data/devision";

const BookingForm = ({ service }) => {
  const router = useRouter();

  const [duration, setDuration] = useState(1);
  const [location, setLocation] = useState({
    division: "",
    district: "",
    upazila: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const filteredDistricts = useMemo(() => {
    if (!location.division) return [];

    const selectedDiv = divisions.find((d) => d.name === location.division);

    return selectedDiv
      ? districts.filter((dist) => dist.division_id === selectedDiv.id)
      : [];
  }, [location.division]);

  const filteredUpazilas = useMemo(() => {
    if (!location.district) return [];

    const selectedDistrictObj = districts.find(
      (d) => d.name === location.district,
    );

    return selectedDistrictObj
      ? upazilas.filter((u) => u.district_id === selectedDistrictObj.id)
      : [];
  }, [location.district]);

  const handleDivisionChange = (e) => {
    setLocation({
      ...location,
      division: e.target.value,
      district: "",
      upazila: "",
    });
  };

  const handleDistrictChange = (e) => {
    setLocation({
      ...location,
      district: e.target.value,
      upazila: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const hourlyRate = service?.pricePerHour || 0;
  const totalCost = (Number(duration) || 0) * hourlyRate;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      serviceId: service?.id,
      serviceTitle: service?.title,
      duration: Number(duration),
      location,
      totalCost,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (res.ok) {
        toast.success(`Booking Successful!`);
        router.push("/my-bookings");
      }
    } catch (error) {
      toast.error("Failed to book.");
    } finally {
      setLoading(false);
    }
  };

  if (!service)
    return (
      <p className="text-red-500 text-center py-10">Loading Service Data...</p>
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* 1. Duration Selection */}
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h3 className="text-lg font-bold text-blue-800 mb-4">
          1. Select Duration (Hours)
        </h3>
        <input
          type="number"
          min="1"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 font-bold"
          required
        />
      </div>

      {/* 2. Location & Address Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
            2
          </span>
          Location & Address
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Division Select */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Division
            </label>
            <select
              name="division"
              required
              value={location.division}
              onChange={handleDivisionChange}
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer transition-all"
            >
              <option value="">Select Division</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* District Select */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              District
            </label>
            <select
              name="district"
              required
              disabled={!location.division}
              value={location.district}
              onChange={handleDistrictChange}
              className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <option value="">
                {location.division
                  ? "Choose District"
                  : "Select Division First"}
              </option>
              {filteredDistricts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Upazila Select */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Upazila
          </label>
          <select
            name="upazila"
            required
            disabled={!location.district}
            value={location.upazila}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <option value="">
              {location.district ? "Select Upazila" : "Select District First"}
            </option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address Textarea */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            House Address
          </label>
          <textarea
            name="address"
            placeholder="Flat no, House, Road, Area etc."
            required
            rows="3"
            value={location.address}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-slate-50 font-medium"
          />
        </div>
      </div>

      {/* 3. Cost Display & Submit */}
      <div className="border-t border-slate-100 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-slate-900 text-white rounded-3xl shadow-xl gap-6">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">
              Total Payable Amount
            </p>
            <p className="text-4xl font-black text-blue-400">
              ৳{totalCost.toLocaleString()}
            </p>
          </div>
         <div className="w-full">
           <button
            type="submit"
            disabled={loading}
            className="w-full p md:w-auto bg-blue-600 hover:bg-blue-500 px-12 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 disabled:bg-slate-700 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
         </div>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;

// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// const BookingForm = ({ service }) => {
//   const router = useRouter();

//   //  State Declaration
//   const [duration, setDuration] = useState(1); // Default 1 hour
//   const [location, setLocation] = useState({
//     division: "",
//     district: "",
//     city: "",
//     address: "",
//   });
//   const [loading, setLoading] = useState(false);

//   //  Total Cost Calculation (NaN Solution included)

//   const hourlyRate = service?.pricePerHour || 0;
//   const totalCost = (Number(duration) || 0) * hourlyRate;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // console.log(name, value);
//     setLocation((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Booking Data Object
//     const bookingData = {
//       serviceId: service?.id,
//       serviceTitle: service?.title,
//       duration: Number(duration),
//       location,
//       totalCost,
//       status: "Pending",
//       date: new Date().toLocaleDateString(),
//     };

//     try {
//       const res = await fetch("/api/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingData),
//       });
//       const data = await res.json();
//       if (res.ok && data?.result?.insertedId) {
//         toast.success(`Booking Successful for ${service?.title}!`);
//         router.push("/my-bookings");
//       }
//     } catch (error) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   // If service data is not available
//   if (!service)
//     return <p className="text-red-500">Service data is loading...</p>;

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8">
//       {/*  Duration */}
//       <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
//         <h3 className="text-lg font-bold text-blue-800 mb-4">
//           1. Select Duration (Hours)
//         </h3>
//         <input
//           type="number"
//           min="1"
//           name="duration"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//           placeholder="How many hours do you need?"
//           className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
//           required
//         />
//       </div>

//       {/*  Location */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-bold text-slate-800">
//           2. Location & Address
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             name="division"
//             placeholder="Division"
//             required
//             onChange={handleChange}
//             className="px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             name="district"
//             placeholder="District"
//             required
//             onChange={handleChange}
//             className="px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             name="city"
//             placeholder="City / Area"
//             required
//             onChange={handleChange}
//             className="px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             name="address"
//             placeholder="Full Address (House, Road etc.)"
//             required
//             onChange={handleChange}
//             className="px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       {/* Dynamic Cost Display */}
//       <div className="border-t pt-6">
//         <div className="flex justify-between items-center p-5 bg-slate-900 text-white rounded-2xl">
//           <div>
//             <p className="text-slate-400 text-xs uppercase tracking-wider">
//               Total Payable
//             </p>
//             <p className="text-3xl font-black">
//               ৳{isNaN(totalCost) ? 0 : totalCost}
//             </p>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
//           >
//             Confirm Booking
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default BookingForm;
