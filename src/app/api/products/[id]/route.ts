import { NextResponse } from "next/server";
import { getProductById, saveProduct, deleteProduct } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = getProductById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve product" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const existing = getProductById(id);
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updated = saveProduct({
      ...existing,
      ...body,
      id: existing.id,
      price: parseFloat(body.price ?? existing.price),
      stock: parseInt(body.stock ?? existing.stock, 10),
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deleteProduct(id);
    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
