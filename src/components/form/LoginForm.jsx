"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Email Or Password");
      } else {
        router.push(callbackUrl);
        router.refresh();
        toast.success("Login Successful");
        e.target.reset();
      }
    } catch (error) {
      setError("Something went wrong.Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"} 
          placeholder="Password"
          required
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
        <p className="text-red-500 text-sm font-medium ml-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-70"
      >
        {loading ? "Authenticating..." : "Login"}
      </button>

      <p className="text-center text-sm text-slate-500">
        Do not have an account?{" "}
        <Link href="/register" className="text-blue-600 font-bold">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

