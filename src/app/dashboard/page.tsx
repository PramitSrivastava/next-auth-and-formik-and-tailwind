import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return <div>Dashboard</div>;
};

export default Dashboard;

// now this is a server component so we can not use useSession()
