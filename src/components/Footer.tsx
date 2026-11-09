import React from "react";
import { Shield, Truck, RefreshCw } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400">
      {/* Trust Badges */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/50 p-3 text-blue-600 dark:text-blue-400">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Free Domestic Shipping</h4>
              <p className="text-xs text-neutral-500">Complimentary expedited shipping on all demo orders.</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="rounded-lg bg-green-50 dark:bg-green-950/50 p-3 text-green-600 dark:text-green-400">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Simulated Safe Checkout</h4>
              <p className="text-xs text-neutral-500">Test transactions freely without real credit card charges.</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="rounded-lg bg-purple-50 dark:bg-purple-950/50 p-3 text-purple-600 dark:text-purple-400">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Merchant CRM Sync</h4>
              <p className="text-xs text-neutral-500">Live order tracking and stock updates synced to Admin.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="NEXUS-COMMERCE Logo"
              className="h-8 w-8 object-contain rounded-lg shadow-sm"
            />
            <span className="font-bold text-neutral-900 dark:text-white">NEXUS-COMMERCE</span>
          </div>

          <p className="text-xs text-neutral-500 text-center md:text-right">
            © 2026 NEXUS-COMMERCE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
