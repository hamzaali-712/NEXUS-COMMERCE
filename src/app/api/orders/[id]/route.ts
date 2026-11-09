import { NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/store";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    const updated = updateOrderStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }
}
