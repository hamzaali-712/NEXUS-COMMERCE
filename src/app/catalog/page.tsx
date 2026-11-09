"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal, PackageX, Sparkles } from "lucide-react";

const CATEGORIES = ["All", "Audio", "Wearables", "Accessories", "Electronics"];

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Filter and sort
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Curated Tech Catalog</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Product Discovery
        </h1>
        <p className="text-sm text-neutral-500 max-w-xl">
          Browse our high-performance collection. Filter by department, search specs, or sort by pricing and ratings.
        </p>
      </div>

      {/* Search, Category Filter, and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between border-y border-neutral-200 dark:border-neutral-800 py-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name, tag, or description..."
            className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 pl-10 pr-4 py-2.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-neutral-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 focus:border-blue-500 focus:outline-none"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>
          Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "product" : "products"}
        </span>
        {(searchQuery || selectedCategory !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-blue-600 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-96 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 animate-pulse"
            />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        /* Empty Results State */
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-800 p-12 text-center bg-white dark:bg-neutral-900">
          <div className="rounded-full bg-neutral-100 dark:bg-neutral-800 p-4 text-neutral-400 mb-4">
            <PackageX className="h-10 w-10" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            No products match your criteria
          </h3>
          <p className="mt-1 text-sm text-neutral-500 max-w-sm">
            We couldn&apos;t find any items matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}. Try broadening your search or selecting &ldquo;All&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            Clear Search & Filters
          </button>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
