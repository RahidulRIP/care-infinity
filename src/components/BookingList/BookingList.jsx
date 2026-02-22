"use client";
import { Edit3, Heading2, Trash2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const BookingList = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/my-bookings");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      // console.error("Error fetching booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      loadBookings();
    }
  }, [session]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to cancel this booking? ")) {
      const res = await fetch(`/api/my-bookings/${id}`, {
        method: "DELETE",
      });
      if (res?.ok) {
        setBookings(bookings.filter((b) => b._id !== id));
        toast.success("Booking Cancelled");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedDuration = Number(formData.get("duration"));
    const hourlyRate = editingBooking?.totalCost / editingBooking?.duration;

    const updatedInfo = {
      duration: updatedDuration,
      city: formData.get("city"),
      district: formData.get("district"),
      totalCost: updatedDuration * hourlyRate,
    };

    const res = await fetch(`/api/my-bookings/${editingBooking?._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInfo),
    });

    if (res.ok) {
      await loadBookings();
      setEditingBooking(null);
      toast.success("Updated Successfully!");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading history...</p>;

  if (bookings.length === 0) {
    return (
      <div className="bg-white p-20 rounded-[40px] text-center border border-slate-200">
        <p className="text-slate-400">No bookings found in your history.</p>
      </div>
    );
  }

  return (
    <div>
      {editingBooking ? (
        <div className="flex items-center justify-center bg-slate-900/60 backdrop-blur-sm  z-50 p-4 relative">
          <div className="bg-white rounded-4xl p-8 w-full max-w-md shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black mb-6 text-slate-900">
                Edit Booking
              </h2>
              <button
                onClick={() => setEditingBooking(null)}
                className="right-12 text-slate-400 hover:text-slate-900"
              >
                <X size={40} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                  Hours
                </label>
                <input
                  name="duration"
                  type="number"
                  defaultValue={editingBooking.duration}
                  className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                  City
                </label>
                <input
                  name="city"
                  type="text"
                  defaultValue={editingBooking.location.city}
                  className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                  District
                </label>
                <input
                  name="district"
                  type="text"
                  defaultValue={editingBooking.location.district}
                  className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-24"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          {bookings.length === 0 ? (
            <div className="bg-white p-20 rounded-[40px] text-center border border-slate-200">
              <p className="text-slate-400">
                No bookings found in your history.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookings.map((booking, index) => (
                <div
                  key={index}
                  className="bg-white rounded-4xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {booking.date}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm
        ${
          booking.status === "pending"
            ? "bg-amber-100 text-amber-600"
            : booking.status === "confirmed"
              ? "bg-emerald-100 text-emerald-600"
              : "bg-slate-100 text-slate-600"
        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {booking.serviceTitle}
                    </h3>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-medium">
                          Duration
                        </span>
                        <span className="font-bold text-slate-900">
                          {booking.duration} Hours
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-medium">City</span>
                        <span className="font-bold text-slate-900">
                          {booking.location.city}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400 font-medium">
                          District
                        </span>
                        <span className="font-bold text-slate-900">
                          {booking.location.district}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-50 md:flex justify-between items-end ">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                        Total Bill
                      </p>
                      <p className="text-3xl font-black text-blue-600">
                        ৳{booking.totalCost}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-6 md:pt-0">
                      <Link
                        href={`/my-bookings/${booking._id}`}
                        className="p-3 bg-blue-50 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() => setEditingBooking(booking)}
                        className="p-3 bg-blue-50 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="Edit Booking"
                      >
                        <Edit3 size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(booking?._id)}
                        className="p-3 bg-red-50 rounded-2xl text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="Cancel Booking"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingList;
