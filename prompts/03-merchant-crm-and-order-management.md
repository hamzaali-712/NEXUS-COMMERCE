# Prompt Log 03 — Merchant CRM & Order Management

**Feature:** Merchant CRM Dashboard, Order Status Updates, Customer Records & Inventory CRUD  
**Source files:**  
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/orders/page.tsx`
- `src/app/admin/products/page.tsx`
- `src/app/admin/customers/page.tsx`
- `src/app/admin/inquiries/page.tsx`
- `src/app/api/orders/[id]/route.ts`
- `src/app/api/crm/stats/route.ts`  
**AI tool/model used:** Google Antigravity / Gemini 2.5 Flash / High Thinking (Bootcamp Capstone)

---

## 1. Problem and Acceptance Criteria
- **Problem:** Store merchants need a unified back-office interface to monitor gross revenue, review order statuses, update fulfillment stages (e.g., Pending to Shipped to Delivered), view customer profiles, and manage product inventory.
- **Acceptance Criteria:**
  - Executive CRM Dashboard with 6 real-time metrics: Gross Revenue, Total Orders, Pending Orders, Low Stock Alerts, Total Customers, Open Inquiries.
  - Interactive Order Fulfillment table where the merchant can select a new status from a dropdown (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`) with live persistence.
  - Product Inventory manager supporting: adding new items with initial stock, editing stock numbers inline, and deleting products.
  - Customer directory tracking purchasing history and lifetime spend.
  - Support inquiry list for tracking customer queries.

---

## 2. Original Prompt (Exact Text)
```text
B. Mini CRM and Administration
- Admin dashboard with relevant business statistics.
- Product management: add, view, update, and delete.
- Customer management and customer records.
- Order management and status updates.
- Inventory management.
- Sales and order analytics using available application data.
```

---

## 3. Context Supplied
- Both Storefront and CRM share the same persistent data store (`data/nexus-store.json`).
- Immediate reactivity: Orders created on the storefront must appear in CRM without needing a server reboot.

---

## 4. Iteration and Improved Prompt
- Added an inline quick-edit feature for stock levels on the Products page (`AdminProductsPage`) so merchants can restock low inventory without leaving the page.
- Added color-coded badges for order fulfillment stages (`Delivered` = emerald, `Shipped` = blue, `Processing` = amber, `Cancelled` = red).

---

## 5. Implementation Trace
- Created `src/app/admin/layout.tsx` with dedicated sidebar navigation.
- Created `src/app/admin/page.tsx` showing aggregated KPI cards and recent orders table.
- Created `src/app/admin/orders/page.tsx` with search filtering and instant `PATCH /api/orders/[id]` status updates.
- Created `src/app/admin/products/page.tsx` with product modal and inline stock editing.
- Created `src/app/admin/customers/page.tsx` and `src/app/admin/inquiries/page.tsx`.

---

## 6. Validation and Outcome

| Test | Expected | Observed | Pass/Fail |
| :--- | :--- | :--- | :--- |
| KPI Calculations | Metric cards display accurate sums from store | Total revenue, order count, and customer counts match raw data | **Pass** |
| Order Status Change | Changing status to "Shipped" persists via API | Status badge updates to blue and persists upon refresh | **Pass** |
| Add New Product | Form submission adds product to catalog and CRM | Product appears immediately on storefront and inventory table | **Pass** |
| Inline Stock Update | Editing stock number updates product stock | Quantity saved via `PUT /api/products/[id]` successfully | **Pass** |
| Customer Record Sync | Placing simulated order creates/updates customer | Customer list shows new buyer with lifetime total spend | **Pass** |

**Remaining Limitations:** Role-based JWT authentication middleware can be attached for production enterprise setups; basic administrative access is fully implemented.
