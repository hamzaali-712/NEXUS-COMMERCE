import React from "react";
import Link from "next/link";
import { getStoreData } from "@/lib/store";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  AlertTriangle,
  Users,
  MessageSquare,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboardPage() {
  const data = getStoreData();

  const totalRevenue = data.orders.reduce((sum, o) => {
    return o.status !== "Cancelled" ? sum + o.total : sum;
  }, 0);

  const pendingOrders = data.orders.filter(
    (o) => o.status === "Pending" || o.status === "Processing"
  );

  const lowStockProducts = data.products.filter((p) => p.stock <= 10);
  const openInquiries = data.inquiries.filter((i) => i.status === "Open");

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            Merchant Intelligence Dashboard
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time sales, order lifecycle statuses, customer accounts, and inventory alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            + Add New Product
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Revenue */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase">Revenue</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-neutral-900 dark:text-white">
            ${totalRevenue.toFixed(2)}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Live Gross
          </span>
        </div>

        {/* Total Orders */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase">Total Orders</span>
            <ShoppingBag className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-neutral-900 dark:text-white">
            {data.orders.length}
          </p>
          <span className="text-[11px] text-neutral-500">Recorded orders</span>
        </div>

        {/* Pending Orders */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase">Pending</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">
            {pendingOrders.length}
          </p>
          <span className="text-[11px] text-neutral-500">Needs fulfillment</span>
        </div>

        {/* Low Stock Alerts */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase">Low Stock</span>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-2xl font-black text-red-600">
            {lowStockProducts.length}
          </p>
          <span className="text-[11px] text-neutral-500">Items &le; 10 units</span>
        </div>

        {/* Customers */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase">Customers</span>
            <Users className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-neutral-900 dark:text-white">
            {data.customers.length}
          </p>
          <span className="text-[11px] text-neutral-500">Registered buyers</span>
        </div>

        {/* Inquiries */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase">Inquiries</span>
            <MessageSquare className="h-4 w-4 text-cyan-500" />
          </div>
          <p className="text-2xl font-black text-cyan-600">
            {openInquiries.length}
          </p>
          <span className="text-[11px] text-neutral-500">Open tickets</span>
        </div>
      </div>

      {/* Tables Section: Recent Orders & Inventory Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Orders List */}
        <div className="lg:col-span-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              Recent Store Orders
            </h2>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
            >
              <span>View All ({data.orders.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 font-semibold">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Items</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {data.orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition">
                    <td className="px-6 py-3 font-mono font-bold text-blue-600">{order.id}</td>
                    <td className="px-6 py-3">
                      <p className="font-semibold text-neutral-800 dark:text-neutral-200">{order.customer.name}</p>
                      <p className="text-[10px] text-neutral-400">{order.customer.city}</p>
                    </td>
                    <td className="px-6 py-3 text-neutral-600 dark:text-neutral-400">
                      {order.items.reduce((s, i) => s + i.quantity, 0)} pcs
                    </td>
                    <td className="px-6 py-3 font-bold text-neutral-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          order.status === "Delivered"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400"
                            : order.status === "Processing"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400"
                            : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Watchlist */}
        <div className="lg:col-span-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-6 py-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                Low Stock Watchlist
              </h2>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Manage
            </Link>
          </div>

          <div className="p-6 space-y-4">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-neutral-500 text-center py-6">
                All catalog inventory levels are healthy!
              </p>
            ) : (
              lowStockProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-neutral-900 dark:text-white line-clamp-1">{p.name}</p>
                      <p className="text-[10px] text-neutral-400">{p.category} • ${p.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <span className="font-bold text-red-600 bg-red-50 dark:bg-red-950/50 px-2 py-1 rounded-lg">
                    {p.stock} units left
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
