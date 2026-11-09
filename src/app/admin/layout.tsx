import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  MessageSquare,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row bg-neutral-100/70 dark:bg-neutral-950">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-extrabold text-sm text-neutral-900 dark:text-white">
              NEXUS CRM
            </span>
          </div>
          <p className="text-[11px] text-neutral-500">Merchant Operations & Analytics</p>
        </div>

        <nav className="space-y-1 text-sm font-medium">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <LayoutDashboard className="h-4 w-4 text-blue-600" />
            <span>Dashboard Overview</span>
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <ShoppingBag className="h-4 w-4 text-emerald-600" />
            <span>Orders & Delivery</span>
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <Package className="h-4 w-4 text-indigo-600" />
            <span>Product Inventory</span>
          </Link>

          <Link
            href="/admin/customers"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <Users className="h-4 w-4 text-purple-600" />
            <span>Customer Directory</span>
          </Link>

          <Link
            href="/admin/inquiries"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <MessageSquare className="h-4 w-4 text-amber-600" />
            <span>Support Inquiries</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-blue-600 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Exit to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
