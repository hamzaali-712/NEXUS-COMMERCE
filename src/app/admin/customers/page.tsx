import React from "react";
import { getCustomers } from "@/lib/store";
import { Users, Mail, Phone, Calendar } from "lucide-react";

export default function AdminCustomersPage() {
  const customers = getCustomers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
          Customer Directory & Purchasing History
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Profiles automatically maintained from storefront simulated checkouts.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 font-semibold">
              <tr>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Total Orders</th>
                <th className="px-6 py-4">Lifetime Spent</th>
                <th className="px-6 py-4">Customer Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold text-neutral-900 dark:text-white">{c.name}</p>
                    <span className="text-[10px] text-neutral-400 font-mono">ID: {c.id}</span>
                  </td>

                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-300">
                      <Mail className="h-3 w-3 text-neutral-400" />
                      <span>{c.email}</span>
                    </div>
                    {c.phone && (
                      <div className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
                        <Phone className="h-3 w-3 text-neutral-400" />
                        <span>{c.phone}</span>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 font-semibold text-neutral-800 dark:text-neutral-200">
                    {c.totalOrders} {c.totalOrders === 1 ? "order" : "orders"}
                  </td>

                  <td className="px-6 py-4 font-black text-blue-600">
                    ${c.totalSpent.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-neutral-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-neutral-400" />
                      <span>{c.joinedAt}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
