import { NextResponse } from "next/server";
import { getProducts, saveProduct } from "@/lib/store";
import { Product } from "@/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const category = searchParams.get("category");

    let products = getProducts();

    if (category && category !== "All") {
      products = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search)
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newProduct: Product = {
      id: body.id || `prod_${Date.now()}`,
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: body.category,
      price: parseFloat(body.price),
      rating: parseFloat(body.rating || "5.0"),
      reviewsCount: parseInt(body.reviewsCount || "0", 10),
      stock: parseInt(body.stock || "10", 10),
      image: body.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      description: body.description || "",
      featured: Boolean(body.featured),
    };

    const saved = saveProduct(newProduct);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
