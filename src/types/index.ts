export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  description: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerOrderInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  customer: CustomerOrderInfo;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
}

export interface Inquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
}

export interface StoreData {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  inquiries: Inquiry[];
}
