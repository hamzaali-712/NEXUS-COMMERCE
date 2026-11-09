"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Truck,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { Order } from "@/types";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "Hamza Ali",
    email: "hamza.ali@example.com",
    phone: "+92 300 9876543",
    address: "House 14-B, University Town",
    city: "Wah Cantt",
    notes: "Leave package at main door.",
  });

  const [paymentMethod, setPaymentMethod] = useState("Simulated Credit Card");
  const [submitting, setSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (cart.length === 0) {
      setError("Your cart is empty. Please add items before checking out.");
      return;
    }

    if (!formData.name || !formData.email || !formData.address || !formData.city) {
      setError("Please complete all required shipping fields.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: formData,
          items: cart.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image,
          })),
          subtotal: totalPrice,
          shipping: 0.0,
          total: totalPrice,
          paymentMethod,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to place simulated order.");
      }

      const orderData: Order = await res.json();
      setConfirmedOrder(orderData);
      clearCart();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during checkout.");
    } finally {
      setSubmitting(false);
    }
  };

  // Order Confirmation State
  if (confirmedOrder) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 sm:p-12 shadow-xl space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Simulated Order Confirmed
            </span>
            <h1 className="text-3xl font-black text-neutral-900 dark:text-white">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-neutral-500">
              Your order <strong className="text-blue-600">{confirmedOrder.id}</strong> has been registered and is now visible in the merchant CRM.
            </p>
          </div>

          {/* Order Summary Box */}
          <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 p-6 text-left space-y-4 border border-neutral-100 dark:border-neutral-800">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-neutral-700 text-xs font-semibold">
              <span className="text-neutral-500">Order Reference</span>
              <span className="font-mono text-neutral-900 dark:text-white">{confirmedOrder.id}</span>
            </div>

            <div className="space-y-3">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white line-clamp-1">{item.name}</p>
                      <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-500">
                <span>Customer</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{confirmedOrder.customer.name}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Shipping Destination</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.city}
                </span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Payment Mode</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-700">
                <span>Total Charged</span>
                <span className="text-blue-600">${confirmedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/catalog"
              className="w-full sm:w-auto rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>

            <Link
              href="/admin/orders"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-6 py-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:border-blue-500 hover:text-blue-600 transition"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Track in Merchant CRM</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart fallback
  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center space-y-4">
        <div className="rounded-full bg-neutral-100 dark:bg-neutral-800 p-6 inline-block text-neutral-400">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Your Cart is Empty</h2>
        <p className="text-sm text-neutral-500">Add products to your cart before proceeding to checkout.</p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Browse Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-blue-600 mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Catalog</span>
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Simulated Checkout
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Demo Mode: No real financial transaction will occur. Orders are recorded directly in the local store.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 p-4 text-xs font-semibold text-red-600 dark:text-red-400">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid: Form on left, Summary on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Shipping & Payment Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          {/* Shipping Information Card */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <Truck className="h-4 w-4 text-blue-600" />
              <span>1. Shipping Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3.5 py-2 text-sm text-neutral-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3.5 py-2 text-sm text-neutral-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3.5 py-2 text-sm text-neutral-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3.5 py-2 text-sm text-neutral-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3.5 py-2 text-sm text-neutral-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Delivery Notes (Optional)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3.5 py-2 text-sm text-neutral-900 dark:text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <CreditCard className="h-4 w-4 text-blue-600" />
              <span>2. Payment Simulation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                  paymentMethod === "Simulated Credit Card"
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100"
                    : "border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "Simulated Credit Card"}
                  onChange={() => setPaymentMethod("Simulated Credit Card")}
                  className="text-blue-600"
                />
                <div className="text-xs">
                  <span className="font-bold block">Simulated Card</span>
                  <span className="text-neutral-500">Instant test confirmation</span>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                  paymentMethod === "Simulated Cash on Delivery"
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100"
                    : "border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "Simulated Cash on Delivery"}
                  onChange={() => setPaymentMethod("Simulated Cash on Delivery")}
                  className="text-blue-600"
                />
                <div className="text-xs">
                  <span className="font-bold block">Simulated COD</span>
                  <span className="text-neutral-500">Pay upon delivery test</span>
                </div>
              </label>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-500 bg-neutral-100 dark:bg-neutral-800/60 p-3 rounded-lg">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Safe Environment: Real payment gateways are strictly disabled.</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/25 hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {submitting ? "Processing Simulated Order..." : `Confirm & Place Order ($${totalPrice.toFixed(2)})`}
          </button>
        </form>

        {/* Order Summary Column */}
        <div className="lg:col-span-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-3">
            Cart Summary ({cart.length} items)
          </h3>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white line-clamp-1">
                      {item.product.name}
                    </h4>
                    <span className="text-xs text-neutral-500">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-neutral-900 dark:text-white">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-500">
              <span>Subtotal</span>
              <span className="text-neutral-900 dark:text-white font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Shipping</span>
              <span className="text-emerald-600 font-semibold">Free (Demo)</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <span>Total</span>
              <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
