import { auth } from "../services/auth.service.mts";

export default async function requireAuth(req, res, next) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach user to request
    req.user = {
      id: session.user.id,
      email: session.user.email
    };

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid session" });
  }
}