# Prompt Log 02 — Shopping Cart & Simulated Checkout

**Feature:** Slide-Over Shopping Cart & Simulated Checkout Flow  
**Source files:**  
- `src/context/CartContext.tsx`
- `src/components/CartDrawer.tsx`
- `src/app/checkout/page.tsx`
- `src/app/api/orders/route.ts`  
**AI tool/model used:** Google Antigravity / Gemini 2.5 Flash / High Thinking (Bootcamp Capstone)

---

## 1. Problem and Acceptance Criteria
- **Problem:** Buyers need to add products to a shopping cart, adjust quantities, inspect live totals, and place orders through a simulated checkout without entering real credit cards or financial credentials.
- **Acceptance Criteria:**
  - Global `CartContext` supporting `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`.
  - Slide-over drawer accessible from any page via the Navbar cart badge.
  - Quantity controls constrained by current product stock (cannot exceed available units).
  - Checkout form capturing Customer Name, Email, Phone, Address, City, and payment method simulation.
  - `POST /api/orders` records the order, decrements catalog inventory, creates customer record, and generates confirmation receipt.

---

## 2. Original Prompt (Exact Text)
```text
Simulated checkout without charging real money.
Order confirmation and order status functionality.
Shopping cart with quantity controls.
Product availability and inventory information.
```

---

## 3. Context Supplied
- Zero live payment processors allowed by bootcamp assignment rules.
- Inventory must be updated in `data/nexus-store.json` when order is submitted.
- Order ID format: `ORD-XXXX`.

---

## 4. Iteration and Improved Prompt
- **Iteration 1:** Added localStorage synchronization to `CartContext` so items remain in cart across page reloads.
- **Iteration 2:** Added an interactive Order Confirmation Screen in `/checkout` that immediately displays order reference, items, customer address, and a direct button to track the new order inside the Merchant CRM (`/admin/orders`).

---

## 5. Implementation Trace
- Created `src/context/CartContext.tsx` with React state and localStorage persistence.
- Created `src/components/CartDrawer.tsx` with slide-over animation and responsive layout.
- Created `src/app/checkout/page.tsx` with validation, simulated credit card / COD selector, and confirmation receipt.
- Created `src/app/api/orders/route.ts` to process orders and decrement inventory in real time.

---

## 6. Validation and Outcome

| Test | Expected | Observed | Pass/Fail |
| :--- | :--- | :--- | :--- |
| Add to Cart | Product adds to cart and drawer opens automatically | Drawer slides in with thumbnail, price, and count | **Pass** |
| Quantity Limit | Quantity cannot exceed product stock | Increase button disables when reaching max stock | **Pass** |
| Cart Subtotal | Live recalculation when quantity changes | Subtotal accurately reflects item prices × quantities | **Pass** |
| Simulated Order Submit | Submits form without real payment; clears cart | Order `ORD-XXXX` confirmed, receipt shown, cart cleared | **Pass** |
| Stock Decrement | Inventory decreases by ordered amount | Product stock in database is reduced by quantity ordered | **Pass** |

**Remaining Limitations:** Live payment gateway integrations (Stripe/PayPal) are intentionally omitted per security guidelines.
