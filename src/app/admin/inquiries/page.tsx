import React from "react";
import { getInquiries } from "@/lib/store";
import { MessageSquare, Mail, Clock, CheckCircle } from "lucide-react";

export default function AdminInquiriesPage() {
  const inquiries = getInquiries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
          Customer Inquiry & Support Management
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Review incoming queries regarding products, pricing, and warranties.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {inquiries.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-12 text-center text-xs text-neutral-500">
            No support inquiries logged.
          </div>
        ) : (
          inquiries.map((inq) => (
            <div
              key={inq.id}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {inq.subject}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                      {inq.customerName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {inq.customerEmail}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      inq.status === "Open"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                        : inq.status === "In Progress"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                    }`}
                  >
                    {inq.status}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-neutral-800/40 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800">
                &ldquo;{inq.message}&rdquo;
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
