import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { paths } = await request.json();

  if (!paths || !Array.isArray(paths)) {
    return NextResponse.json({ error: "Invalid paths" }, { status: 400 });
  }

  paths.forEach((path: string) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, paths });
}