import { withAuth } from "../../../../lib/withAuth";

async function handler(req, res) {
  res.status(200).json({ message: "Admin action performed" });
}

export default withAuth(handler, ["admin"]);
