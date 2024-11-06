import { useSession } from "next-auth/react";

function Dashboard() {
  const { data: session } = useSession();

  if (session?.user.role === "admin") {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}
