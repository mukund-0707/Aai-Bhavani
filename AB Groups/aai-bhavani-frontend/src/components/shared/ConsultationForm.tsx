"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Select, Textarea } from "@/components/ui";
import { inquiriesApi } from "@/lib/api/services";
import toast from "react-hot-toast";
import { CheckCircle2, Send } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  category: z.string().min(1, "Please select a service"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const serviceOptions = [
  { value: "1", label: "Buy Property" },
  { value: "2", label: "Sell Property" },
  { value: "3", label: "Property Investment" },
  { value: "4", label: "Home Loan" },
  { value: "5", label: "Business Loan" },
  { value: "6", label: "Personal Loan" },
  { value: "7", label: "Interior Design" },
  { value: "8", label: "Project Management" },
  { value: "9", label: "Other" },
];

export default function ConsultationForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await inquiriesApi.submit({
        name: data.name,
        mobile: data.mobile,
        email: data.email || undefined,
        category: parseInt(data.category),
        message: data.message,
      });
      setSubmitted(true);
      reset();
      toast.success("We'll get back to you within 24 hours!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={36} className="text-green-600" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-navy-900 mb-3">
          Request Submitted!
        </h3>
        <p className="text-gray-500 mb-6">
          Thank you! Our team will call you within{" "}
          <strong className="text-navy-900">24 hours</strong> to schedule your free
          consultation.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-navy-900 text-sm font-semibold underline underline-offset-4 hover:text-gold-500 transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "max-w-2xl mx-auto"}>
      {!compact && (
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/15 text-gold-600 rounded-full text-sm font-semibold mb-4">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
            Free Consultation
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-3">
            Book Your Free Consultation
          </h2>
          <p className="text-gray-500 text-lg">
            Fill in your details and our expert will contact you within 24 hours.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Full Name"
            placeholder="Your full name"
            required
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Mobile Number"
            placeholder="10-digit mobile number"
            type="tel"
            required
            error={errors.mobile?.message}
            {...register("mobile")}
          />
        </div>

        <Input
          label="Email Address"
          placeholder="your@email.com (optional)"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Select
          label="Service Interested In"
          required
          options={serviceOptions}
          placeholder="Select a service..."
          error={errors.category?.message}
          {...register("category")}
        />

        <Textarea
          label="Your Message / Requirements (optional)"
          placeholder="Tell us about your requirements, budget, location preference, etc."
          {...register("message")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gold-400 text-navy-900 font-bold rounded-2xl hover:bg-gold-500 transition-all shadow-gold text-base active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send size={18} />
              Book Free Consultation
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          By submitting, you agree to our{" "}
          <a href="/privacy" className="underline hover:text-navy-900">
            Privacy Policy
          </a>
          . No spam, ever.
        </p>
      </form>
    </div>
  );
}
