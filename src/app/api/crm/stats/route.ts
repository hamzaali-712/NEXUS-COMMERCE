import { NextResponse } from "next/server";
import { getStoreData } from "@/lib/store";

export async function GET() {
  try {
    const data = getStoreData();

    const totalRevenue = data.orders.reduce((sum, o) => {
      if (o.status !== "Cancelled") return sum + o.total;
      return sum;
    }, 0);

    const pendingOrders = data.orders.filter(
      (o) => o.status === "Pending" || o.status === "Processing"
    ).length;

    const lowStockProducts = data.products.filter((p) => p.stock <= 10);
    const openInquiries = data.inquiries.filter((i) => i.status === "Open").length;

    return NextResponse.json({
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalOrders: data.orders.length,
      pendingOrders,
      lowStockCount: lowStockProducts.length,
      totalCustomers: data.customers.length,
      openInquiries,
      lowStockProducts,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to calculate CRM stats" }, { status: 500 });
  }
}
