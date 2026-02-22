"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CreditCard,
  Phone,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const RegistrationForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const { password } = data;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    if (password.length < 6 || !hasUpperCase || !hasLowerCase) {
      setError("Password needs 6+ chars, 1 uppercase & 1 lowercase letter.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        router.push("/login");
        toast.success("Registration Successful");
        e.target.reset();
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch (error) {
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md mx-auto">
      {/* Input Group Helper Function */}
      {[
        {
          name: "name",
          placeholder: "Full Name",
          type: "text",
          icon: <User size={18} />,
        },
        {
          name: "nid",
          placeholder: "NID Number",
          type: "number",
          icon: <CreditCard size={18} />,
        },
        {
          name: "email",
          placeholder: "Email Address",
          type: "email",
          icon: <Mail size={18} />,
        },
        {
          name: "contact",
          placeholder: "Contact Number",
          type: "number",
          icon: <Phone size={18} />,
        },
      ].map((field) => (
        <div key={field.name} className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {field.icon}
          </span>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required
            className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
          />
        </div>
      ))}

      {/* Password Input with Toggle */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Lock size={18} />
        </span>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          required
          className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium border border-red-100 animate-pulse">
          ⚠️ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Processing...
          </>
        ) : (
          "Create Account"
        )}
      </button>

      <p className="text-center mt-6 text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 font-bold hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegistrationForm;
