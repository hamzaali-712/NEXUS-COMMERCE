"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Send, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerEmail || !formData.message) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Failed to submit inquiry:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 sm:p-12 shadow-xl">
        {submitted ? (
          <div className="text-center space-y-4 py-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Inquiry Received</h2>
            <p className="text-sm text-neutral-500 max-w-md mx-auto">
              Your inquiry has been logged into the Merchant CRM. Our support team can review and respond to it directly from the dashboard.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/catalog"
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition"
              >
                Back to Shopping
              </Link>
              <Link
                href="/admin"
                className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-6 py-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-blue-600 transition"
              >
                Inspect in CRM
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                <MessageSquare className="h-4 w-4" />
                <span>Customer Assistance</span>
              </div>
              <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                Submit an Inquiry
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Have a question regarding warranty, bulk discounts, or product compatibility? Send us a ticket.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Inquiry regarding Nexus Pro Headphones"
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your question or request here..."
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white hover:bg-blue-700 transition"
            >
              <Send className="h-4 w-4" />
              <span>{submitting ? "Sending..." : "Submit Inquiry"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
