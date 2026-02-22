"use client";
import Link from "next/link";
import { ArrowLeft, Home, ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-8">
          <h1 className="text-5xl font-black text-slate-100">404</h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-blue-100 border border-slate-100 animate-bounce duration-2000">
              <span className="text-6xl md:text-8xl">🕵️‍♂️</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-10">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Oops! Page <span className="text-blue-600">Not Found</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg mb-12 max-w-md mx-auto leading-relaxed">
            The page you are looking for does not exist or has been moved to
            another universe.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div>
              <Link
                href="/"
                className="group px-8 py-4 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-[3px] hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 transition-all duration-300 flex items-center gap-3 w-full md:w-auto justify-center"
              >
                <Home size={18} /> Back to Home
              </Link>
            </div>

            <div>
              <button
                onClick={() => window.history.back()}
                className="px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-3xl font-black text-xs uppercase tracking-[3px] hover:bg-slate-50 transition-all w-full md:w-auto"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>

        {/* নিচের ছোট নোট */}
        <p className="mt-16 text-[10px] text-slate-300 font-bold uppercase tracking-[4px]">
          Care.Infinity — Premium Healthcare Support
        </p>
      </div>
    </div>
  );
}
