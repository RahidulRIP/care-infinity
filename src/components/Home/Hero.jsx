import React from "react";
import Container from "../shared/Container";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full bg-slate-100">
      <Container>
        <section className="relative px-6 lg:px-8 py-16 md:py-24 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-100 mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Trusted Care Nationwide
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Expert Care for <br />
                <span className="text-blue-600">Your Family is</span> Peace of
                Mind.
              </h1>

              <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Find reliable, background-checked caregivers for your children,
                elderly parents, or medical needs. Secure, simple, and trusted
                by thousands of families.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                  Book a Caregiver
                </button>
                <button className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                  Learn More
                </button>
              </div>

              {/* Stats Section */}
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 border-t border-slate-200 pt-8">
                <div>
                  <p className="text-2xl font-bold text-slate-900">12k+</p>
                  <p className="text-sm text-slate-500 uppercase tracking-tight font-medium">
                    Bookings
                  </p>
                </div>
                <div className="w-px h-10 bg-slate-300"></div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">4.8/5</p>
                  <p className="text-sm text-slate-500 uppercase tracking-tight font-medium">
                    Rating
                  </p>
                </div>
              </div>
            </div>

            {/* Image with matching "Smart" frame */}
            <div className="relative group">
              {/* The "Glow" behind the image */}
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-500 rounded-2xl blur opacity-15"></div>

              <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                <div className="relative w-full h-[450px] overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=800&auto=format&fit=crop"
                    alt="Professional Caregiver"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Floating Verification Badge */}
                <div className="absolute bottom-8 -left-6 bg-white p-4 rounded-xl shadow-2xl border border-slate-100 hidden md:flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Verified Profiles
                    </p>
                    <p className="text-xs text-slate-500">
                      NID & Background Checked
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Hero;
