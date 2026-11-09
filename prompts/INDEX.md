# NEXUS-COMMERCE — Prompt Engineering Documentation Index

This directory provides evidence of the prompt engineering, context engineering, and AI-assisted full-stack development process conducted for the **Beyond Prompting Bootcamp 2026 (GDGoC CUI Wah)** capstone assignment.

---

## 📑 Feature Prompt Mapping

| Feature / Module | Prompt Log File | Implementation Files & Routes |
| :--- | :--- | :--- |
| **1. Storefront & Product Discovery** | [`01-storefront-and-catalog.md`](01-storefront-and-catalog.md) | `src/app/page.tsx`<br>`src/app/catalog/page.tsx`<br>`src/app/product/[id]/page.tsx`<br>`src/components/ProductCard.tsx` |
| **2. Shopping Cart & Simulated Checkout** | [`02-cart-and-simulated-checkout.md`](02-cart-and-simulated-checkout.md) | `src/context/CartContext.tsx`<br>`src/components/CartDrawer.tsx`<br>`src/app/checkout/page.tsx`<br>`src/app/api/orders/route.ts` |
| **3. Merchant CRM & Order Tracking** | [`03-merchant-crm-and-order-management.md`](03-merchant-crm-and-order-management.md) | `src/app/admin/layout.tsx`<br>`src/app/admin/page.tsx`<br>`src/app/admin/orders/page.tsx`<br>`src/app/admin/products/page.tsx`<br>`src/app/admin/customers/page.tsx`<br>`src/app/admin/inquiries/page.tsx` |
| **4. Build Optimization & Debugging** | [`04-nextjs-build-debugging-and-persistence.md`](04-nextjs-build-debugging-and-persistence.md) | `src/lib/store.ts`<br>`src/components/ProductDetailView.tsx`<br>`data/initial-data.json` |

---

## 🛠️ Context Engineering Principles Applied
1. **Explicit Data Grounding:** Grounded all product discovery and inventory counts in a typed, deterministic local store (`data/initial-data.json`).
2. **Business Rule Enforcement:** Enforced strict non-payment simulated checkout rules (no real credit cards, safe demo transactions only).
3. **Task Decomposition:** Broke the monolithic enterprise specification down into four manageable, production-ready modules with clear acceptance criteria.
4. **Architectural Verification:** Validated all code with automated TypeScript typechecking (`tsc --noEmit`) and Turbopack production builds (`next build`).
