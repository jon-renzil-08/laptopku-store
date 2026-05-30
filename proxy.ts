import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // ✅ Pakai try-catch — kalau token invalid, anggap tidak login
  let user = null;
  try {
    const { data, error } = await supabase.auth.getUser();
    if (!error) user = data.user;
  } catch {
    // Token corrupt/expired — clear session dan redirect ke login
  }

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !user) {
    const redirectResponse = NextResponse.redirect(
      new URL("/login", request.url)
    );

    // ✅ Hapus cookie Supabase yang corrupt
    request.cookies.getAll().forEach((cookie) => {
      if (cookie.name.startsWith("sb-")) {
        redirectResponse.cookies.delete(cookie.name);
      }
    });

    return redirectResponse;
  }

  if (user && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}