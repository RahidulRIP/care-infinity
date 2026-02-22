// "use client";
import React from "react";
import { services } from "@/data/services";

// import { use } from "react";
import Container from "@/components/shared/Container";
import BookingForm from "@/components/form/BookingForm";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  return {
    title: `Book ${service?.title || "Care"} | Care Infinity`,
    description: `Professional ${service?.title} service booking page.`,
  };
}

const BookingPage = async ({ params }) => {
  // const resolvedParams = use(params);
  const resolvedParams = await params;
  // console.log(resolvedParams);
  const id = resolvedParams.id;

  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Service Not Found!</h1>
      </div>
    );
  }

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Booking for: {service.title}
          </h1>
          <p className="text-blue-600 font-bold text-xl">
            Rate: ৳{service.pricePerHour}/hr
          </p>

          <section>
            <BookingForm service={service} />
          </section>
        </div>
      </Container>
    </section>
  );
};

export default BookingPage;
