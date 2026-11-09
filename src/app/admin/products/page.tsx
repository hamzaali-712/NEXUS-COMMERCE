"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types";
import { Package, Plus, Trash2, Edit3, X, Check, AlertCircle } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [newStockValue, setNewStockValue] = useState<number>(0);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Audio",
    price: "",
    stock: "15",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    description: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setNewProduct({
          name: "",
          category: "Audio",
          price: "",
          stock: "15",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
          description: "",
        });
        fetchProducts();
      }
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to remove this product from the catalog?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  const handleUpdateStock = async (product: Product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStockValue }),
      });

      if (res.ok) {
        const updated = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
        setEditingStockId(null);
      }
    } catch (err) {
      console.error("Failed to update stock", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
            Product Inventory Management
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Create, update stock counts, and remove items from the live storefront.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-neutral-500">Loading products...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 font-semibold">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock Level</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-neutral-900 dark:text-white">{p.name}</p>
                          <p className="text-[10px] text-neutral-400 font-mono">ID: {p.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-md bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300">
                        {p.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-bold text-neutral-900 dark:text-white">
                      ${p.price.toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      {editingStockId === p.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={newStockValue}
                            onChange={(e) => setNewStockValue(parseInt(e.target.value || "0", 10))}
                            className="w-16 rounded border border-blue-500 px-1.5 py-0.5 text-xs font-bold"
                          />
                          <button
                            onClick={() => handleUpdateStock(p)}
                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingStockId(null)}
                            className="p-1 text-neutral-400 hover:bg-neutral-100 rounded"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold ${
                              p.stock <= 5 ? "text-red-600" : p.stock <= 10 ? "text-amber-600" : "text-neutral-700 dark:text-neutral-300"
                            }`}
                          >
                            {p.stock} units
                          </span>
                          <button
                            onClick={() => {
                              setEditingStockId(p.id);
                              setNewStockValue(p.stock);
                            }}
                            className="text-neutral-400 hover:text-blue-600"
                            title="Edit Stock"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="rounded-lg p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 transition"
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Add New Product</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Nexus Spatial Earbuds"
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-2 py-2 text-xs focus:outline-none"
                  >
                    <option value="Audio">Audio</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="99.99"
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Key features and specifications..."
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
