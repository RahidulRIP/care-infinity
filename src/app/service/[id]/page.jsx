import Container from "@/components/shared/Container";
import { services } from "@/data/services";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  return {
    title: service ? `${service.title} | Care.xyz` : "Service Not Found",
  };
};

const ServiceDetail = async ({ params }) => {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <Image
              src={service.image}
              alt={service.title}
              className="w-full object-cover rounded-3xl shadow-lg"
              width={500}
              height={500}
            />

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <h4 className="font-bold text-blue-700">Expert Care</h4>
                  <p className="text-sm text-blue-600">
                    Certified professionals only
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                  <h4 className="font-bold text-green-700">Safety First</h4>
                  <p className="text-sm text-green-600">Background checked</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl sticky top-28">
              <p className="text-slate-500 text-sm font-bold uppercase mb-2">
                Service Charge
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-slate-900">
                  ৳{service.pricePerHour}
                </span>
                <span className="text-slate-400 font-medium">/ hour</span>
              </div>

              <ul className="space-y-3 mb-8 text-slate-600">
                <li className="flex items-center gap-2">
                  ✅ Professional Support
                </li>
                <li className="flex items-center gap-2">
                  ✅ Flexible Scheduling
                </li>
                <li className="flex items-center gap-2">✅ Secure Platform</li>
              </ul>

              {/* Book Service Button */}
              <Link
                href={`/booking/${service.id}`}
                className="block w-full text-center py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-100"
              >
                Book Service Now
              </Link>

              <p className="mt-4 text-center text-xs text-slate-400">
                You will be redirected to the booking form
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ServiceDetail;
