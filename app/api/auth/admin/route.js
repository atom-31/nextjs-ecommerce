// pages/api/adminOnlyRoute.js
import { withAuth } from "../../lib/withAuth";

async function handler(req, res) {
  // Admin-only functionality here
  res.status(200).json({ message: "Admin action performed" });
}

export default withAuth(handler, ["admin"]);
