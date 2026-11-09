"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";

export default function ProductDetailView({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 8;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-blue-600 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Product Catalog</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Product Media */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
          <span className="absolute top-4 left-4 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 shadow">
            {product.category}
          </span>
        </div>

        {/* Product Details & Actions */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-amber-500 text-sm">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 font-bold">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-neutral-400 text-xs">({product.reviewsCount} customer reviews)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-4">
              <span className="text-3xl font-black text-neutral-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                USD • Tax Included
              </span>
            </div>
          </div>

          {/* Stock Indicator */}
          <div className="flex items-center gap-2 text-sm">
            {isOutOfStock ? (
              <div className="flex items-center gap-1.5 text-red-600 font-semibold">
                <AlertCircle className="h-4 w-4" />
                <span>Currently Out of Stock</span>
              </div>
            ) : isLowStock ? (
              <div className="flex items-center gap-1.5 text-amber-600 font-semibold">
                <AlertCircle className="h-4 w-4" />
                <span>Limited Supply: Only {product.stock} units remaining</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>In Stock ({product.stock} available) • Ready to ship</span>
              </div>
            )}
          </div>

          <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed border-t border-neutral-200 dark:border-neutral-800 pt-4">
            {product.description}
          </p>

          {/* Quantity Selector & Add to Cart */}
          {!isOutOfStock && (
            <div className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-neutral-500 uppercase">Quantity</span>
                <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:text-blue-600 transition"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-neutral-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:text-blue-600 transition"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/25 hover:bg-blue-700 active:scale-[0.99] transition"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add to Shopping Cart</span>
                </button>
              </div>
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 rounded-2xl bg-neutral-100/70 dark:bg-neutral-800/50 p-4 text-center mt-4">
            <div className="flex flex-col items-center gap-1">
              <Truck className="h-5 w-5 text-blue-600" />
              <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">1-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="h-5 w-5 text-purple-600" />
              <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
