"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUp,
  HeartPulse,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Grid - matching your Overview/Summary layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Logo & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-100">
                <HeartPulse size={24} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
                Care.<span className="text-blue-600">Infinity</span>
              </h2>
            </div>
            <p className="text-slate-500 font-bold text-sm leading-relaxed">
              Redefining healthcare with precision and professional empathy.
              Available across Mymensingh.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-8 underline decoration-blue-600/30 underline-offset-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              <FooterLink label="Search Services" />
              <FooterLink label="Track Booking" />
              <FooterLink label="Emergency Support" />
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-8 underline decoration-blue-600/30 underline-offset-8">
              Company
            </h4>
            <ul className="space-y-4">
              <FooterLink label="About Us" />
              <FooterLink label="Join as Caregiver" />
              <FooterLink label="Terms & Conditions" />
            </ul>
          </div>

          {/* Contact - Minimalist style matching your Summary card */}
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-8 underline decoration-blue-600/30 underline-offset-8">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                <MapPin size={18} className="text-blue-600" /> Kachijhuli,
                Mymensingh
              </div>
              <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                <Phone size={18} className="text-blue-600" /> +880 1712-345678
              </div>
              <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                <Mail size={18} className="text-blue-600" />{" "}
                info@careinfinity.com
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Socials */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">
            © 2026 CARE.INFINITY — BUILT FOR HEALTHCARE
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={18} />} />
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
          </div>
        </div>
        {/* Floating Circular Scroll to Top Button */}
        <div className="">
          <button
            onClick={scrollToTop}
            className={` z-100 w-20 h-20 absolute right-0 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform ${
              showTop
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-20 opacity-0 scale-50"
            } hover:bg-blue-600 active:scale-90`}
          >
            <ArrowUp size={24} strokeWidth={3} />
            {/* Progress Circle (Optional Design Element) */}
            <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
          </button>
        </div>
      </div>
    </footer>
  );
};

// Sub-components
const FooterLink = ({ label }) => (
  <li>
    <Link
      href="#"
      className="text-slate-500 font-bold text-sm hover:text-blue-600 transition-colors"
    >
      {label}
    </Link>
  </li>
);

const SocialIcon = ({ icon }) => (
  <button className="w-10 h-10 bg-white border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1">
    {icon}
  </button>
);

export default Footer;
