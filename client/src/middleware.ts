export async function onRequest(context, next) {
  console.log("🔥 Middleware running");

  const cookie = context.request.headers.get("cookie") || "";
  console.log("🍪 Cookie:", cookie);

  try {
    const res = await fetch("http://localhost:3000/api/v1/users/me", {
      headers: { cookie }
    });

    console.log("📡 Response status:", res.status);

    if (res.ok) {
      const user = await res.json();
      console.log("👤 User from API:", user);

      context.locals.user = user;
    } else {
      console.log("❌ /users/me failed");
    }
  } catch (err) {
    console.error("Middleware error:", err);
  }

  return next();
}