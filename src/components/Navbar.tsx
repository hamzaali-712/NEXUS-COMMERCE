"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ShieldCheck, Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              NEXUS<span className="text-blue-600">.</span>
            </span>
            <span className="text-[10px] tracking-widest text-neutral-500 uppercase -mt-1 font-semibold">
              COMMERCE
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link href="/catalog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Catalog
          </Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Support & Inquiry
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Admin CRM Shortcut */}
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span>Merchant CRM</span>
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 p-2.5 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-neutral-900 animate-in zoom-in duration-200">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center rounded-lg p-2 text-neutral-700 dark:text-neutral-200"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-neutral-700 dark:text-neutral-200 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-neutral-700 dark:text-neutral-200 hover:text-blue-600"
          >
            Product Catalog
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-neutral-700 dark:text-neutral-200 hover:text-blue-600"
          >
            Support & Inquiry
          </Link>
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 py-1"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Merchant CRM & Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
