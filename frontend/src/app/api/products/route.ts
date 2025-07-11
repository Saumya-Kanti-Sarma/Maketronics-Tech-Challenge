export const runtime = 'edge';

import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await axios.get("https://maketronics-tech-challenge.onrender.com/api");
    const data = await res.data;
    return NextResponse.json(data);
  } catch (err) {
    console.error("API Fetch Failed:", err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
