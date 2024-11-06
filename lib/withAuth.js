import { getSession } from "next-auth/react";

export function withAuth(handler, allowedRoles = ["user", "admin"]) {
  return async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(session.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.session = session;
    return handler(req, res);
  };
}
