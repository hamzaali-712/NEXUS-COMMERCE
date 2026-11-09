"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Star, ShoppingBag, Eye } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 8;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Tag */}
        <span className="absolute top-3 left-3 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold tracking-wide text-neutral-800 dark:text-neutral-200 shadow-sm">
          {product.category}
        </span>

        {/* Stock Badge */}
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide shadow-sm ${
            isOutOfStock
              ? "bg-red-500 text-white"
              : isLowStock
              ? "bg-amber-500 text-white animate-pulse"
              : "bg-emerald-500 text-white"
          }`}
        >
          {isOutOfStock ? "Out of Stock" : isLowStock ? `Only ${product.stock} Left` : "In Stock"}
        </span>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1 text-xs text-amber-500 mb-2">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-neutral-400">({product.reviewsCount})</span>
        </div>

        <Link href={`/product/${product.id}`} className="group/title">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white line-clamp-1 group-hover/title:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="text-xs text-neutral-400 block">Price</span>
            <span className="text-lg font-extrabold text-neutral-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/product/${product.id}`}
              className="p-2 rounded-xl text-neutral-500 hover:text-blue-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </Link>

            <button
              onClick={() => addToCart(product, 1)}
              disabled={isOutOfStock}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold shadow-sm transition active:scale-95 ${
                isOutOfStock
                  ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>{isOutOfStock ? "Sold Out" : "Add to Cart"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
