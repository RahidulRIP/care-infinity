"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  CreditCard,
  Calendar,
  User,
  ShieldCheck,
  Mail,
} from "lucide-react";
import Container from "@/components/shared/Container";

const BookingDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const res = await fetch(`/api/my-bookings/${id}`);
      const data = await res.json();
      setBooking(data);
    };
    if (id) fetchBooking();
  }, [id]);

  if (!booking)
    return (
      <div className="h-screen flex items-center justify-center space-x-2">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
      </div>
    );

  return (
    <Container>
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div>
              <button
                onClick={() => router.back()}
                className="group flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all font-bold text-xs uppercase tracking-widest mb-4"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Back to history
              </button>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                Booking <span className="text-blue-600">Details</span>
              </h1>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 text-sm hover:bg-slate-50 transition-all">
                Print Receipt
              </button>
              <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 text-sm hover:bg-slate-50 transition-all">
                Contact Support
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service Main Card */}
              <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className={`h-2.5 w-2.5 rounded-full animate-pulse ${booking.status === "Pending" ? "bg-amber-500" : "bg-emerald-500"}`}
                  ></div>
                  <span className="text-[10px] font-black uppercase tracking-[3px] text-slate-400">
                    Status: {booking.status}
                  </span>
                </div>

                <h2 className="text-5xl font-black text-slate-900 mb-8 leading-none">
                  {booking.serviceTitle}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-50 pt-10">
                  <InfoBox
                    label="Duration"
                    value={`${booking.duration} Hours`}
                  />
                  <InfoBox label="Date" value={booking.date} />
                  <InfoBox label="Service Type" value={booking.serviceId} />
                  <InfoBox
                    label="Booking ID"
                    value={`#${booking._id.slice(-6).toUpperCase()}`}
                    isBlue
                  />
                </div>
              </div>

              {/* User & Location Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* User Section */}
                <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <User size={20} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">
                      Customer Info
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Registered Email
                    </p>
                    <p className="text-slate-700 font-bold flex items-center gap-2">
                      <Mail size={14} className="text-slate-300" />{" "}
                      {booking.userEmail}
                    </p>
                  </div>
                </div>

                {/* Location Section */}
                <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                      <MapPin size={20} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">
                      Service Location
                    </h3>
                  </div>
                  <p className="text-slate-700 font-bold mb-2">
                    {booking.location.upazila}, {booking.location.district}
                  </p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">
                    {booking.location.division}
                  </p>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-sm text-slate-500 font-medium">
                      {booking.location.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}

            <div className="lg:col-span-1">
              <div className="bg-slate-900 rounded-[40px] p-10 text-white sticky top-10 shadow-2xl shadow-blue-900/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                <div className="flex items-center justify-between mb-10 relative z-10">
                  <h3 className="text-xl font-bold tracking-tight">
                    Payment History
                  </h3>
                  <ShieldCheck className="text-blue-400" size={24} />
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between text-slate-400 text-sm font-medium">
                    <span>Service Amount</span>
                    <span className="text-white font-bold">
                      ৳{booking.totalCost}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-sm font-medium">
                    <span>Online Processing Fee</span>
                    <span className="text-emerald-400 font-bold">Free</span>
                  </div>

                  <div className="h-px bg-slate-800 my-4"></div>

                  <div className="flex justify-between items-end mb-10">
                    <div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-1">
                        Total Payment
                      </span>
                      <span className="text-4xl font-black text-white tracking-tighter">
                        ৳{booking.totalCost}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-8 p-6 bg-white/5 rounded-3xl border border-white/10 relative z-10">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-4 text-center">
                    Supported Payment Methods
                  </p>
                  <div className="flex justify-center gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                    <span className="text-[10px] font-black border border-white/20 px-2 py-1 rounded">
                      VISA
                    </span>
                    <span className="text-[10px] font-black border border-white/20 px-2 py-1 rounded">
                      MASTERCARD
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="h-1 w-1 bg-emerald-500 rounded-full"></div>
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">
                    Encrypted by SSL Wireless
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

// Helper Component
const InfoBox = ({ label, value, isBlue }) => (
  <div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
      {label}
    </p>
    <p
      className={`text-lg font-bold ${isBlue ? "text-blue-600" : "text-slate-800"}`}
    >
      {value}
    </p>
  </div>
);

export default BookingDetails;
