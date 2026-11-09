"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  ShoppingBag,
  CreditCard,
  Package,
  ShieldCheck,
  RefreshCw,
  Mail,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface FAQTopic {
  id: string;
  label: string;
  icon: React.ReactNode;
  answer: string;
  actionLink?: {
    label: string;
    href: string;
  };
  keywords: string[];
}

const FAQ_TOPICS: FAQTopic[] = [
  {
    id: "browse",
    label: "How do I browse & buy products?",
    icon: <ShoppingBag className="h-4 w-4 text-blue-500" />,
    answer:
      "Shopping on NEXUS-COMMERCE is simple:\n\n1. **Explore the Catalog**: Navigate to the Catalog page to filter items by category (Audio, Wearables, Computing, Lifestyle) or search by keyword.\n2. **Check Details**: Click on any product to see specifications, in-stock count, and reviews.\n3. **Add to Cart**: Select your quantity and click 'Add to Cart'. You can manage items in your slide-out Cart Drawer anytime.",
    actionLink: {
      label: "Explore Product Catalog",
      href: "/catalog",
    },
    keywords: ["browse", "buy", "shop", "catalog", "products", "item", "purchase", "cart"],
  },
  {
    id: "checkout",
    label: "How does simulated checkout work?",
    icon: <CreditCard className="h-4 w-4 text-emerald-500" />,
    answer:
      "Checkout on NEXUS-COMMERCE is 100% simulated and risk-free:\n\n1. Open your Cart Drawer and click **Proceed to Checkout**.\n2. Enter your shipping address and contact details.\n3. Choose from demo payment methods (Demo Card, Cash on Delivery, or Crypto).\n4. Click **Place Simulated Order**.\n\n✨ No real money or card is ever charged, and you get an immediate simulated Order ID!",
    actionLink: {
      label: "View Products & Checkout",
      href: "/catalog",
    },
    keywords: ["checkout", "payment", "pay", "card", "money", "cod", "credit", "crypto"],
  },
  {
    id: "track",
    label: "How do I track my orders?",
    icon: <Package className="h-4 w-4 text-purple-500" />,
    answer:
      "Every order placed generates a unique Order ID (e.g., #ORD-7819).\n\nBecause NEXUS-COMMERCE has an integrated Merchant CRM, all orders sync immediately in real time! You can track the status as it updates from **Pending** to **Processing**, **Shipped**, and **Delivered**.",
    actionLink: {
      label: "View Orders in CRM",
      href: "/admin/orders",
    },
    keywords: ["track", "order", "status", "delivery", "shipping", "ord-", "tracking"],
  },
  {
    id: "crm",
    label: "How do I use the Merchant CRM (Admin)?",
    icon: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
    answer:
      "The Merchant CRM provides complete control over your store:\n\n• **Dashboard**: Live metrics on total revenue, orders, active customers, and stock.\n• **Orders Management**: Review incoming orders and update delivery stages.\n• **Inventory**: Adjust stock quantities and view inventory health in real-time.\n• **Customer Inquiries**: Read messages sent through the Contact page.",
    actionLink: {
      label: "Open Merchant CRM",
      href: "/admin",
    },
    keywords: ["admin", "crm", "merchant", "dashboard", "manage", "seller", "inventory", "stock"],
  },
  {
    id: "reset",
    label: "Can I reset the demo store data?",
    icon: <RefreshCw className="h-4 w-4 text-amber-500" />,
    answer:
      "Yes! You can reset all demo data at any time:\n\n1. Go to the **Merchant CRM** dashboard (`/admin`).\n2. Scroll down to the store management actions.\n3. Click **Reset Store Data** to restore all default seed products, orders, and metrics instantly.",
    actionLink: {
      label: "Go to Admin Reset",
      href: "/admin",
    },
    keywords: ["reset", "restore", "clear", "seed", "restart", "wipe"],
  },
  {
    id: "contact",
    label: "How do I contact support or send feedback?",
    icon: <Mail className="h-4 w-4 text-rose-500" />,
    answer:
      "You can submit feedback or get help right through the platform:\n\n1. Visit the **Contact** page (`/contact`).\n2. Fill in your name, email, and message.\n3. Submissions sync directly into the Merchant CRM under the **Inquiries** tab for live review!",
    actionLink: {
      label: "Go to Contact Page",
      href: "/contact",
    },
    keywords: ["contact", "support", "help", "email", "feedback", "inquiry", "message"],
  },
  {
    id: "features",
    label: "What makes NEXUS-COMMERCE special?",
    icon: <Sparkles className="h-4 w-4 text-blue-500" />,
    answer:
      "NEXUS-COMMERCE is an end-to-end commerce experience featuring:\n\n⚡ **Fast Client Cart**: Live slide-out drawer with free shipping tracker.\n💳 **Safe Simulated Checkout**: Test the full purchasing funnel without real money.\n📊 **Unified Merchant CRM**: Live inventory, customer CRM, and order fulfillment tracking.\n🤖 **Zero External Dependencies**: Pure client and API architecture that works seamlessly anywhere.",
    actionLink: {
      label: "Browse Storefront",
      href: "/catalog",
    },
    keywords: ["features", "about", "nexus", "special", "what is", "overview", "why"],
  },
];

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actionLink?: {
    label: string;
    href: string;
  };
  showOptions?: boolean;
}

const WELCOME_TEXT =
  "👋 Hi there! Welcome to **NEXUS-COMMERCE**!\n\nI'm your interactive platform guide. I can help you learn how to browse products, test simulated checkout, track orders, or navigate the Merchant CRM.\n\nSelect an option below to get instant answers:";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: WELCOME_TEXT,
      timestamp: "Just now",
      showOptions: true,
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages, isTyping]);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      setIsOpen(true);
      const customEvent = e as CustomEvent<{ topicId?: string }>;
      if (customEvent.detail?.topicId) {
        const topic = FAQ_TOPICS.find((t) => t.id === customEvent.detail.topicId);
        if (topic) {
          handleSelectOption(topic);
        }
      }
    };

    window.addEventListener("open-nexus-chatbot", handleOpen);
    return () => window.removeEventListener("open-nexus-chatbot", handleOpen);
  }, []);

  const handleSelectOption = (topic: FAQTopic) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: topic.label,
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: topic.answer,
        timestamp: getFormattedTime(),
        actionLink: topic.actionLink,
        showOptions: true,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      const queryLower = query.toLowerCase();
      const matched = FAQ_TOPICS.find((topic) =>
        topic.keywords.some((kw) => queryLower.includes(kw))
      );

      let botMsg: ChatMessage;

      if (matched) {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: matched.answer,
          timestamp: getFormattedTime(),
          actionLink: matched.actionLink,
          showOptions: true,
        };
      } else {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `I'm here to help you get the most out of NEXUS-COMMERCE! While I didn't recognize that exact phrasing, here are the main topics I can help you with:`,
          timestamp: getFormattedTime(),
          showOptions: true,
        };
      }

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: WELCOME_TEXT,
        timestamp: getFormattedTime(),
        showOptions: true,
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[92vw] sm:w-[420px] h-[550px] max-h-[82vh] rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-white/20 backdrop-blur-sm">
                <Bot className="h-5 w-5 text-white" />
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5 leading-tight">
                  Nexus Guide Bot
                </h3>
                <p className="text-[11px] text-blue-100 flex items-center gap-1">
                  <span>Interactive Assistant</span>
                  <span>•</span>
                  <span className="text-emerald-200 font-medium">Ready</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
                aria-label="Restart conversation"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="bg-blue-50/70 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/40 px-3.5 py-1.5 text-[11px] text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span>Select any topic below or type your question for instant answers!</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-neutral-50/50 dark:bg-neutral-950/50">
            {messages.map((msg, index) => {
              const isLastBotMsg =
                msg.sender === "bot" &&
                index === messages.findLastIndex((m) => m.sender === "bot");

              return (
                <div key={msg.id} className="space-y-2">
                  <div
                    className={`flex items-start gap-2.5 ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm mt-0.5">
                        <Bot className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 shadow-sm mt-0.5">
                        <User className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-sm text-xs sm:text-sm ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-xs"
                          : "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700/80 rounded-bl-xs"
                      }`}
                    >
                      <div className="whitespace-pre-line leading-relaxed">
                        {msg.text}
                      </div>

                      {msg.actionLink && (
                        <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-neutral-700">
                          <Link
                            href={msg.actionLink.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition shadow-sm"
                          >
                            <span>{msg.actionLink.label}</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      )}

                      <div
                        className={`text-[10px] mt-1.5 flex justify-end ${
                          msg.sender === "user"
                            ? "text-blue-100"
                            : "text-neutral-400 dark:text-neutral-500"
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>

                  {/* Options Chips (shown under the bot's latest message or if requested) */}
                  {msg.showOptions && isLastBotMsg && !isTyping && (
                    <div className="pl-9 pt-1 space-y-1.5">
                      <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                        Frequently Asked Questions:
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {FAQ_TOPICS.map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => handleSelectOption(topic)}
                            className="group flex items-center justify-between text-left rounded-xl bg-white dark:bg-neutral-850 hover:bg-blue-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80 px-3 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-700 transition shadow-xs"
                          >
                            <span className="flex items-center gap-2">
                              {topic.icon}
                              <span className="font-medium">{topic.label}</span>
                            </span>
                            <span className="text-neutral-400 group-hover:text-blue-500 text-[10px] transition">
                              Select →
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 pl-9 text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex space-x-1 py-2 px-3 bg-white dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700 shadow-xs">
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                </div>
                <span className="text-[11px]">NexusBot is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything or click options above..."
              className="flex-1 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3.5 py-2 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed p-2.5 text-white shadow-sm transition"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div className="flex items-center gap-3">
        {!isOpen && hasUnread && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hidden sm:flex items-center gap-2 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3.5 py-2 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-xl hover:shadow-2xl hover:scale-105 transition"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Need help? Ask NexusBot 👋</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all"
          aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageSquare className="h-6 w-6" />
              {hasUnread && (
                <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border-2 border-white dark:border-neutral-900"></span>
                </span>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
