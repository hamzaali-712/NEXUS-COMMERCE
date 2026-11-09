"use client";

import React from "react";
import {
  Bot,
  ShoppingBag,
  CreditCard,
  Package,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function GuideSection() {
  const openChatWithTopic = (topicId?: string) => {
    window.dispatchEvent(
      new CustomEvent("open-nexus-chatbot", { detail: { topicId } })
    );
  };

  const guides = [
    {
      topicId: "browse",
      title: "Browsing & Shopping",
      description: "Learn how to filter categories, search items, and add products to your cart.",
      icon: <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      actionText: "Ask about shopping",
    },
    {
      topicId: "checkout",
      title: "Simulated Checkout",
      description: "Experience risk-free ordering with simulated credit card, COD, or crypto payment.",
      icon: <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
      actionText: "Ask about checkout",
    },
    {
      topicId: "track",
      title: "Live Order Tracking",
      description: "See how every order updates from Pending to Delivered across the system.",
      icon: <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
      actionText: "Ask about tracking",
    },
    {
      topicId: "crm",
      title: "Merchant CRM",
      description: "Explore the live admin portal for stock management, analytics, and CRM records.",
      icon: <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
      actionText: "Ask about CRM",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-white to-blue-50/30 dark:from-neutral-900 dark:to-neutral-950 p-8 sm:p-12 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-950/80 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-3">
              <Bot className="h-3.5 w-3.5" />
              <span>Interactive Guide Bot & FAQs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Need Help Getting Started?
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
              NEXUS-COMMERCE is equipped with an automated guide bot to walk you through each feature step-by-step. Click any question below to get instant answers.
            </p>
          </div>

          <button
            onClick={() => openChatWithTopic()}
            className="inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 active:scale-95 transition"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Open Guide Chatbot</span>
            <Sparkles className="h-4 w-4 text-amber-300" />
          </button>
        </div>

        {/* 4 Interactive Guide Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guides.map((item) => (
            <div
              key={item.topicId}
              onClick={() => openChatWithTopic(item.topicId)}
              className="cursor-pointer group flex flex-col justify-between rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/80 p-5 hover:border-blue-500/50 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>{item.actionText}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
