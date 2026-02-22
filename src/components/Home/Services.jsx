import React from "react";
import Link from "next/link";
import Container from "../shared/Container";
import { services } from "@/data/services";
import Image from "next/image";

const Services = () => {
  return (
    <section className="py-24 bg-slate-50">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Our Care Services
          </h2>
          <p className="text-slate-600 text-lg">
            Choose from our specialized care categories designed to provide
            comfort and safety to your family members.
          </p>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="w-full group-hover:scale-110 transition-transform duration-500"
                  width={200}
                  height={200}
                />

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                  <p className="text-blue-600 font-bold text-sm">
                    ৳{service.pricePerHour}/hr
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-8 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>

                <Link
                  href={`/service/${service.id}`}
                  className="flex items-center justify-center w-full py-4 bg-slate-900 text-white font-bold rounded-2xl group-hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
                >
                  View Details
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;
