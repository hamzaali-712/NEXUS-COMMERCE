import { NextResponse } from "next/server";
import { getOrders, createOrder } from "@/lib/store";

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, subtotal, shipping, total, paymentMethod } = body;

    if (!customer || !customer.name || !customer.email || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data. Customer details and cart items are required." },
        { status: 400 }
      );
    }

    const order = createOrder({
      customer,
      items,
      subtotal: parseFloat(subtotal),
      shipping: parseFloat(shipping ?? 0),
      total: parseFloat(total),
      status: "Pending",
      paymentMethod: paymentMethod || "Simulated Checkout",
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}
