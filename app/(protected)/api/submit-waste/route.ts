import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { description, file_url, classification } = body;

  // 💾 TODO: Save this to PostgreSQL (next step)
  console.log("🧾 Saving submission:", {
    userId,
    description,
    file_url,
    ...classification,
  });

  return NextResponse.json({ status: "ok" });
}
