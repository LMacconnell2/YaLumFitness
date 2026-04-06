import { auth } from "../services/auth.service.mts";

export default async function requireAuth(req, res, next) {
  try {
    const sessionData = await auth.api.getSession({
      headers: req.headers
    });

    if (!sessionData?.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 🔥 THIS is the missing link
    req.user = {
      id: sessionData.user.id,
      email: sessionData.user.email,
      name: sessionData.user.name
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ error: "Auth failed" });
  }
}