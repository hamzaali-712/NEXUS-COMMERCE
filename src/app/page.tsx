import React from "react";
import Link from "next/link";
import { getProducts } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import ChatBot from "@/components/ChatBot";
import GuideSection from "@/components/GuideSection";
import { ArrowRight, ShieldCheck, ShoppingBag, Layers, Zap } from "lucide-react";

export default function HomePage() {
  const allProducts = getProducts();
  const featuredProducts = allProducts.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-neutral-50/50 dark:from-neutral-900/80 dark:via-neutral-950 dark:to-neutral-950 pt-16 pb-20 border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
                Modern Commerce <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Powered by Intelligence.
                </span>
              </h1>

              <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto lg:mx-0">
                Experience a complete end-to-end e-commerce journey. Browse premium gear, test simulated checkout without real money, and manage orders live inside the integrated merchant CRM.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/catalog"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:shadow-blue-500/35 active:scale-95 transition-all"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Explore Product Catalog</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/admin"
                  className="flex items-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-all"
                >
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  <span>Open Merchant CRM</span>
                </Link>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white">8+</p>
                  <p className="text-xs text-neutral-500">Curated Products</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">Real-time</p>
                  <p className="text-xs text-neutral-500">CRM Order Sync</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900 dark:text-white">100%</p>
                  <p className="text-xs text-neutral-500">Simulated Checkout</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 shadow-2xl shadow-blue-500/20">
                <div className="rounded-[22px] bg-white dark:bg-neutral-900 p-6 space-y-4">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                      alt="Nexus Pro ANC Headphones"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-3 right-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                      Featured
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600">Audio • Noise Cancelling</span>
                      <span className="text-xs font-bold text-neutral-400">In Stock: 18</span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
                      Nexus Pro ANC Headphones
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                      Spatial audio, 40-hour playback, and ultra-comfortable memory foam ear cushions.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <span className="text-xl font-extrabold text-neutral-900 dark:text-white">$149.99</span>
                    <Link
                      href="/catalog"
                      className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <Zap className="h-3.5 w-3.5" />
              <span>Handpicked Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Featured Innovations
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Top trending devices with high customer satisfaction and instant stock availability.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 group"
          >
            <span>View All Products</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Interactive Guide Bot Section */}
      <GuideSection />

      {/* Architecture / Capstone Feature Callout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 text-white p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-lg bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/30">
                <Layers className="h-3.5 w-3.5" />
                <span>Unified Storefront & CRM Pipeline</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Experience Real-Time Order Lifecycle Tracking
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                When you place a simulated order through our storefront, the stock immediately updates, a customer record is created, and the order is instantly pushed to the Merchant CRM where you can advance its status from <em>Pending</em> to <em>Delivered</em>.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/catalog"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 transition shadow-lg shadow-blue-500/30"
              >
                <span>Test Storefront Cart</span>
              </Link>
              <Link
                href="/admin"
                className="flex items-center justify-center gap-2 rounded-xl bg-neutral-800 border border-neutral-700 px-6 py-3.5 text-sm font-semibold text-neutral-200 hover:bg-neutral-700 transition"
              >
                <span>Inspect Merchant CRM</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Floating Chatbot Assistant */}
      <ChatBot />
    </div>
  );
}
