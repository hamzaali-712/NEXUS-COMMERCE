"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative z-50 flex h-full w-full max-w-md flex-col bg-white dark:bg-neutral-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
              Shopping Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="rounded-full bg-neutral-100 dark:bg-neutral-800 p-6 mb-4 text-neutral-400">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                Your cart is empty
              </h3>
              <p className="mt-1 text-sm text-neutral-500 max-w-xs">
                Explore our catalog to find premium electronics, audio gear, and accessories.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 rounded-xl border border-neutral-100 dark:border-neutral-800 p-3 bg-neutral-50/50 dark:bg-neutral-800/40"
              >
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white line-clamp-1">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-neutral-500 capitalize">{item.product.category}</p>
                  <p className="text-sm font-bold text-blue-600 mt-1">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:text-blue-600 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:text-blue-600 transition"
                        disabled={item.quantity >= item.product.stock}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-neutral-400 hover:text-red-500 transition p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-neutral-200 dark:border-neutral-800 px-6 py-5 space-y-4 bg-neutral-50/50 dark:bg-neutral-900">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">Subtotal</span>
              <span className="text-base font-bold text-neutral-900 dark:text-white">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">Free (Demo)</span>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-[0.99] transition"
            >
              <span>Proceed to Simulated Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
