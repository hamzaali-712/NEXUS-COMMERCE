import React from "react";
import Link from "next/link";
import { getProductById, getProducts } from "@/lib/store";
import ProductDetailView from "@/components/ProductDetailView";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Product Not Found</h2>
        <p className="text-neutral-500 text-sm">The requested item could not be retrieved from the catalog.</p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  return <ProductDetailView product={product} />;
}
