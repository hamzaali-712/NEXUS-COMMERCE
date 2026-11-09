"use client";

import React, { useState, useEffect } from "react";
import { Order, OrderStatus } from "@/types";
import { ShoppingBag, Search, CheckCircle2, RefreshCw } from "lucide-react";

const STATUSES: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      setUpdatingId(orderId);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
            Order Fulfillment & Tracking
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Update order lifecycle states. Changes persist immediately in the local store.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:border-blue-500 transition"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by Order ID, customer name, or email..."
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 pl-10 pr-4 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-neutral-500">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <ShoppingBag className="h-8 w-8 text-neutral-400 mx-auto" />
            <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">No orders found</h3>
            <p className="text-xs text-neutral-500">
              Go to the storefront and complete a simulated checkout to see new orders populate here!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 font-semibold">
                <tr>
                  <th className="px-6 py-4">Order Ref</th>
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Items Summary</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Status & Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/30 transition">
                    <td className="px-6 py-4 align-top">
                      <span className="font-mono font-bold text-blue-600 block">{order.id}</span>
                      <span className="text-[10px] text-neutral-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <p className="font-semibold text-neutral-900 dark:text-white">{order.customer.name}</p>
                      <p className="text-[11px] text-neutral-500">{order.customer.email}</p>
                      <p className="text-[10px] text-neutral-400">{order.customer.city}</p>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <div className="space-y-1">
                        {order.items.map((it, idx) => (
                          <p key={idx} className="text-[11px] text-neutral-600 dark:text-neutral-300">
                            <strong>{it.quantity}x</strong> {it.name}
                          </p>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <span className="font-extrabold text-neutral-900 dark:text-white block">
                        ${order.total.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-neutral-400">{order.paymentMethod}</span>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          className={`rounded-lg border px-2.5 py-1 text-xs font-bold focus:outline-none transition ${
                            order.status === "Delivered"
                              ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : order.status === "Shipped"
                              ? "border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                              : order.status === "Processing"
                              ? "border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                              : order.status === "Cancelled"
                              ? "border-red-300 bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                              : "border-neutral-300 bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                          }`}
                        >
                          {STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        {updatingId === order.id && (
                          <span className="text-[10px] text-neutral-400 animate-spin">⏳</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
