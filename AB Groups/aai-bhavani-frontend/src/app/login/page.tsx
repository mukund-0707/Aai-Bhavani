"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui";
import { authApi } from "@/lib/api/services";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await authApi.login(data);
      const { access, refresh } = response.data;

      // Fetch user details
      const userRes = await authApi.me();
      const user = userRes.data;

      setAuth(user, access, refresh);
      toast.success(`Welcome back, ${user.first_name}!`);

      // Redirect based on role
      if (user.role === "owner") {
        router.push("/dashboard/admin");
      } else if (user.role === "employee") {
        router.push("/dashboard/employee");
      } else {
        router.push("/dashboard/client");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      toast.error(
        error.response?.data?.detail || "Invalid email or password. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-hero flex-col justify-between p-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gold-400 rounded-xl flex items-center justify-center">
            <Building2 size={22} className="text-navy-900" />
          </div>
          <div>
            <div className="font-heading font-bold text-white">AAI BHAVANI</div>
            <div className="text-gold-400 text-sm font-semibold">GROUP</div>
          </div>
        </div>

        {/* Tagline */}
        <div>
          <h2 className="font-heading text-4xl font-bold text-white leading-tight mb-4">
            Building Trust.
            <br />
            <span className="text-gold-400">Creating Value.</span>
          </h2>
          <p className="text-white/60 text-lg">
            Access your personalized dashboard to manage properties, loans, and
            interior projects — all in one place.
          </p>

          {/* Feature list */}
          <div className="mt-8 space-y-4">
            {[
              "Track all your property deals in real-time",
              "Monitor loan application status",
              "View interior project progress",
              "Access all documents securely",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/70">
                <div className="w-5 h-5 bg-gold-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-gold-400 rounded-full" />
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="text-white/30 text-sm">
          © {new Date().getFullYear()} AAI BHAVANI GROUP. All rights reserved.
        </p>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 lg:p-16">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-navy-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-gold-400 rounded-xl flex items-center justify-center">
              <Building2 size={20} className="text-navy-900" />
            </div>
            <div>
              <div className="font-heading font-bold text-navy-900 text-sm">AAI BHAVANI GROUP</div>
              <div className="text-xs text-gold-500">Building Trust. Creating Value.</div>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-navy-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to your account to continue.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              required
              error={errors.email?.message}
              {...register("email")}
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                error={errors.password?.message}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-navy-900 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
                {...register("password")}
              />
              <div className="flex justify-end mt-1.5">
                <Link
                  href="/forgot-password"
                  className="text-sm text-navy-900 font-medium hover:text-gold-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-navy-900 text-white font-bold rounded-2xl hover:bg-navy-800 transition-all text-base active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 p-4 bg-gold-400/10 rounded-xl border border-gold-400/20">
            <p className="text-sm text-gray-600 text-center">
              <span className="font-semibold text-navy-900">Don&apos;t have an account?</span>
              <br />
              Contact us to register as a client.{" "}
              <Link href="/contact" className="text-navy-900 font-semibold underline hover:text-gold-500">
                Get in Touch
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
