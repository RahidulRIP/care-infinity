import React from "react";
import Container from "../shared/Container";
import Image from "next/image";

const SuccessMetrics = () => {
  const stats = [
    { label: "Happy Families", value: "12,000+" },
    { label: "Verified Caregivers", value: "1,500+" },
    { label: "Success Rate", value: "99.9%" },
    { label: "Cities Covered", value: "15+" },
  ];

  const testimonials = [
    {
      name: "Rahat Chowdhury",
      role: "Parent",
      text: "Care.xyz made finding a nanny so easy. The background check gave me the peace of mind I needed.",
      avatar: "https://i.pravatar.cc/150?u=rahat",
    },
    {
      name: "Sadia Islam",
      role: "Daughter",
      text: "The elderly care service for my father has been exceptional. Highly professional and compassionate.",
      avatar: "https://i.pravatar.cc/150?u=sadia",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition"
            >
              <p className="md:text-4xl font-black text-blue-600 mb-2">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Real stories from families who found the perfect care through our
            platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 relative"
            >
              <div className="absolute -top-4 -left-4 bg-blue-600 text-white p-3 rounded-2xl shadow-lg">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56929 13 4.017 13H2.017V21H5.017Z" />
                </svg>
              </div>
              <p className="text-slate-600 italic mb-8 leading-relaxed">
                {item.text}
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  height={200}
                  width={200}
                />
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-blue-600 font-semibold uppercase">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default SuccessMetrics;
