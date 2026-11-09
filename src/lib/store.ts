import fs from "fs";
import path from "path";
import { StoreData, Product, Order, Customer, Inquiry } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "nexus-store.json");
const INITIAL_DATA_FILE = path.join(DATA_DIR, "initial-data.json");

export function getStoreData(): StoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(STORE_FILE)) {
      if (fs.existsSync(INITIAL_DATA_FILE)) {
        const rawInitial = fs.readFileSync(INITIAL_DATA_FILE, "utf-8");
        fs.writeFileSync(STORE_FILE, rawInitial, "utf-8");
        return JSON.parse(rawInitial);
      }
      const emptyState: StoreData = { products: [], orders: [], customers: [], inquiries: [] };
      fs.writeFileSync(STORE_FILE, JSON.stringify(emptyState, null, 2), "utf-8");
      return emptyState;
    }

    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to read store data:", error);
    return { products: [], orders: [], customers: [], inquiries: [] };
  }
}

export function saveStoreData(data: StoreData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save store data:", error);
    throw new Error("Failed to persist data");
  }
}

// Helper methods
export function getProducts(): Product[] {
  return getStoreData().products;
}

export function getProductById(id: string): Product | undefined {
  return getStoreData().products.find((p) => p.id === id || p.slug === id);
}

export function getOrders(): Order[] {
  return getStoreData().orders;
}

export function getCustomers(): Customer[] {
  return getStoreData().customers;
}

export function getInquiries(): Inquiry[] {
  return getStoreData().inquiries;
}

export function createOrder(orderData: Omit<Order, "id" | "createdAt">): Order {
  const store = getStoreData();
  const newOrder: Order = {
    ...orderData,
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
  };

  // 1. Decrement inventory stock
  store.products = store.products.map((product) => {
    const itemInOrder = newOrder.items.find((item) => item.productId === product.id);
    if (itemInOrder) {
      return {
        ...product,
        stock: Math.max(0, product.stock - itemInOrder.quantity),
      };
    }
    return product;
  });

  // 2. Add or update customer
  const existingCustIndex = store.customers.findIndex(
    (c) => c.email.toLowerCase() === newOrder.customer.email.toLowerCase()
  );
  if (existingCustIndex >= 0) {
    store.customers[existingCustIndex].totalOrders += 1;
    store.customers[existingCustIndex].totalSpent += newOrder.total;
  } else {
    store.customers.push({
      id: `cust_${Date.now()}`,
      name: newOrder.customer.name,
      email: newOrder.customer.email,
      phone: newOrder.customer.phone,
      totalOrders: 1,
      totalSpent: newOrder.total,
      joinedAt: new Date().toISOString().split("T")[0],
    });
  }

  // 3. Save Order
  store.orders.unshift(newOrder);
  saveStoreData(store);
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: Order["status"]): Order | null {
  const store = getStoreData();
  const order = store.orders.find((o) => o.id === orderId);
  if (!order) return null;

  order.status = status;
  saveStoreData(store);
  return order;
}

export function saveProduct(product: Product): Product {
  const store = getStoreData();
  const index = store.products.findIndex((p) => p.id === product.id);

  if (index >= 0) {
    store.products[index] = product;
  } else {
    store.products.push(product);
  }

  saveStoreData(store);
  return product;
}

export function deleteProduct(productId: string): boolean {
  const store = getStoreData();
  const initialLength = store.products.length;
  store.products = store.products.filter((p) => p.id !== productId);

  if (store.products.length !== initialLength) {
    saveStoreData(store);
    return true;
  }
  return false;
}
