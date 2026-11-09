import { NextResponse } from "next/server";
import { getInquiries, getStoreData, saveStoreData } from "@/lib/store";
import { Inquiry } from "@/types";

export async function GET() {
  try {
    const inquiries = getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.customerName || !body.customerEmail || !body.message) {
      return NextResponse.json({ error: "Missing required inquiry fields" }, { status: 400 });
    }

    const newInquiry: Inquiry = {
      id: `inq_${Date.now()}`,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      subject: body.subject || "General Inquiry",
      message: body.message,
      status: "Open",
      createdAt: new Date().toISOString(),
    };

    const store = getStoreData();
    store.inquiries.unshift(newInquiry);
    saveStoreData(store);

    return NextResponse.json(newInquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
