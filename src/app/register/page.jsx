import RegistrationForm from "@/components/form/RegistrationForm";
import Container from "@/components/shared/Container";
import React from "react";

// SEO Metadata
export const metadata = {
  title: "Join Care Infinity | Registration",
  description: "Create your account to book professional care services.",
};

const RegisterPage = () => {
  return (
    <div className="py-20 bg-slate-50 min-h-screen flex items-center">
      <Container>
        <div className="max-w-md mx-auto bg-white p-10 rounded-[40px] shadow-xl shadow-blue-100/50 border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 leading-tight">
              Create Account
            </h1>
            <p className="text-slate-500 mt-2">
              Join our community of caregivers
            </p>
          </div>

          {/* Client component rendering here */}
          <RegistrationForm />
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
