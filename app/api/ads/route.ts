import { NextRequest, NextResponse } from "next/server";
import { getAds, addAd } from "@/lib/ads-store";

export async function GET() {
  const ads = getAds();
  return NextResponse.json(ads);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, titleSr, url, price, year, brand, imageUrl, featured, adminKey } = body;

  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!title || !titleSr || !url) {
    return NextResponse.json({ error: "title, titleSr and url are required" }, { status: 400 });
  }

  const ad = addAd({ title, titleSr, url, price, year, brand, imageUrl, featured: !!featured });
  return NextResponse.json(ad, { status: 201 });
}
